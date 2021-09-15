import "babel-polyfill";
import request from "supertest";
import db from "../database/connections/connection";
import sql from "../database/connections/tables";

let server;

describe("Auth Tests", () => {
  beforeEach(async () => {
    server = require("../app");
    await db.query(sql.roles.create);
    await db.query(sql.roles.insert);

    await db.query(sql.users.create);
    await db.query(sql.users.insert);
  });
  afterEach(async () => {
    await server.close();
    await db.query(sql.users.delete);
    await db.query(sql.roles.delete);
  });

  describe("Test user creation", () => {
    let username = "shidieman",
      contact = "7754578987",
      email = "shidie@gmail.com",
      user_password = "Rashid123",
      user_role = 1,
      userData = {
        email,
        username,
        contact,
        user_role,
        user_password,
      },
      res,
      token;

    beforeEach(async () => {
      const res1 = await request(server)
        .post("/auth")
        .send({ ...userData });
    });

    const execute = async () => {
      return await request(server)
        .post("/auth")
        .send({ email, username, user_password, contact, user_role });
    };

    it("it must return 400 because email is already used ", async () => {
      res = await execute();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("User already exists");
    });

    it("it should return a status of 400 when the required field is not given", async () => {
      email = "";
      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(`"email\" is not allowed to be empty`);
    });

    it("it should return 400 if email is invalid", async () => {
      email = "rashidTesting";
      res = await execute();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`\"email\" must be a valid email`);
    });

    it("it should 400 when the username is already taken", async () => {
      email = "mugaba@gmail.com";
      username = "shidieman";

      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("sorry your name is taken");
    });

    it("It should return 400 when the role id given is not found", async () => {
      email = "mugaba@gmail.com";
      username = "shidieman1";
      user_role = 2;

      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Role your giving does not exist");
    });

    it("It should return 201 when the user is successfully created", async () => {
      email = "mugaba@gmail.com";
      username = "shidieman1";
      user_role = 1;

      res = await execute();

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("User created successfully");
      expect(res.body.data).not.toHaveProperty("user_password");
    });
  });

  describe("Test User Login", () => {
    let username = "shidieman",
      contact = "7754578987",
      email = "shidie@gmail.com",
      user_password = "Rashid123",
      password = user_password,
      user_role = 1,
      userData = {
        email,
        username,
        contact,
        user_role,
        user_password,
      },
      res,
      token;

    beforeEach(async () => {
      const res1 = await request(server)
        .post("/auth")
        .send({ ...userData });
    });

    const execute = async () => {
      return await request(server)
        .post("/auth/login")
        .send({ email, password });
    };

    it("it should return 400 if email or password is not provided", async () => {
      email = "";
      res = await execute();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`"email\" is not allowed to be empty`);
    });

    it("it should return 400 if email is invalid", async () => {
      email = "rashidTesting";
      res = await execute();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`\"email\" must be a valid email`);
    });

    it("It should return 400 if user Email is not registered", async () => {
      email = "someother@email.com";

      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("Please check your email");
    });

    it("It should return 400 password given does not much the users password", async () => {
      password = "somepassword";
      email = "shidie@gmail.com";

      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("Please check your password");
    });

    it("It return 200 if email and password are all correct", async () => {
      password = "Rashid123";
      email = "shidie@gmail.com";

      res = await execute();

      expect(res.status).toBe(200);
      expect(res.body).not.toHaveProperty("message");
      expect(res.body.data).not.toHaveProperty("password");
      expect(res.body).toHaveProperty("token");
    });
  });

  describe("Test User Change Password", () => {
    let username = "shidieman",
      contact = "7754578987",
      email = "shidie@gmail.com",
      user_password = "Rashid123",
      new_password = user_password,
      user_role = 1,
      userData = {
        email,
        username,
        contact,
        user_role,
        user_password,
      },
      res,
      token;

    beforeEach(async () => {
      const res1 = await request(server)
        .post("/auth")
        .send({ ...userData });
    });

    const execute = async () => {
      return await request(server).patch("/auth").send({ email, new_password });
    };

    it("it should return 400 if email is not provided", async () => {
      email = "";
      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`"email\" is not allowed to be empty`);
    });

    it("it should return 400 if email provided is not registered", async () => {
      email = "someemail@gmail.com";
      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(
        `Please check your email or you may not have an account here`
      );
    });

    it("it should return 200 if email is valid and password is given", async () => {
      (email = "shidie@gmail.com"), (res = await execute());

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`Update done successfully`);
    });
  });

  describe("Test Getting Current User Details", () => {
    let username = "shidieman",
      contact = "7754578987",
      email = "shidie@gmail.com",
      user_password = "Rashid123",
      password = user_password,
      user_role = 1,
      userData = {
        email,
        username,
        contact,
        user_role,
        user_password,
      },
      res,
      token;

    beforeEach(async () => {
      const res1 = await request(server)
        .post("/auth")
        .send({ ...userData });

      const res = await request(server)
        .post("/auth/login")
        .send({ email, password });
      token = res.body.token;
    });

    const execute = async () => {
      return await request(server)
        .get("/auth/me")
        .set("x-auth-token", token)
        .send();
    };

    it("it should return 200 if user is logged in", async () => {
      res = await execute();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`User fetched successfully`);
    });
  });

  describe("Test Updating User Details", () => {
    let username = "shidieman",
      contact = "7754578987",
      email = "shidie@gmail.com",
      user_password = "Rashid123",
      password = user_password,
      user_role = 1,
      userData = {
        email,
        username,
        contact,
        user_role,
        user_password,
      },
      res,
      token,
      token2;

    beforeEach(async () => {
      await request(server)
        .post("/auth")
        .send({ ...userData });

      const res = await request(server)
        .post("/auth/login")
        .send({ email, password });
      const res1 = await request(server)
        .post("/auth/login")
        .send({ email: "hello@gmail.com", password: "Ammedi123" });
      token = res.body.token;
      token2 = res1.body.token;
    });

    const execute = async () => {
      return await request(server)
        .put("/auth")
        .set("x-auth-token", token)
        .send({ email, username, contact });
    };

    it("it should return a status of 400 when the required field is not given", async () => {
      email = "";

      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(`"email\" is not allowed to be empty`);
    });

    it("It should return 400 if username is already taken", async () => {
      token = token2;
      username = "shidieman";
      email = "emailto@update.com";

      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Sorry That Name Is Taken");
    });

    it("it should return 400 if email is invalid", async () => {
      token = token2;

      email = "rashidTesting";
      res = await execute();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`\"email\" must be a valid email`);
    });

    it("it should return 200 if user update is successfull", async () => {
      email = "email@rashid.com";
      username = "newUserName";
      contact = "789535676875";
      token = token2;

      res = await execute();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe(`Details updated successfully`);
    });
  });
});
