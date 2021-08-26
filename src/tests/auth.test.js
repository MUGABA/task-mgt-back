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
});
