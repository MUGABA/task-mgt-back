import "babel-polyfill";
import request from "supertest";
import db from "../database/connections/connection";
import sql from "../database/connections/tables";

let server;

describe("Comment Tests", () => {
  beforeEach(async () => {
    server = require("../app");

    await db.query(sql.roles.create);
    await db.query(sql.roles.insert);

    await db.query(sql.users.create);
    await db.query(sql.users.insert);

    await db.query(sql.tasks.create);
    await db.query(sql.comments.create);
  });

  afterEach(async () => {
    await db.query(sql.users.delete);
    await db.query(sql.comments.delete);
    await db.query(sql.tasks.delete);
    await db.query(sql.roles.delete);

    await server.close();
  });

  // describe("Test Comment creation", () => {
  //   let comment = "This comment is for testing only",
  //     res,
  //     token,
  //     taskId = 1,
  //     task = {
  //       title: "This is one is for testing",
  //       start_date: "2021-04-17 00:00:00",
  //       end_date: "2021-04-22 00:00:00",
  //       assign: 1,
  //       supervisor: 1,
  //       status: "Active",
  //     };

  //   beforeEach(async () => {
  //     const res = await request(server)
  //       .post("/auth/login")
  //       .send({ email: "hello@gmail.com", password: "Ammedi123" });
  //     token = res.body.token;

  //     await request(server)
  //       .post("/tasks")
  //       .set("x-auth-token", token)
  //       .send({ ...task });
  //   });

  //   const execute = async () => {
  //     return await request(server)
  //       .post(`/comment/${taskId}`)
  //       .set("x-auth-token", token)
  //       .send({ comment });
  //   };

  //   it("It should return 400 if comment is not given", async () => {
  //     comment = "";

  //     res = await execute();

  //     expect(res.status).toBe(400);
  //     expect(res.body).toHaveProperty("message");
  //   });

  //   it("It should return 404 if task being commented on is not available", async () => {
  //     comment = "This is a comment";
  //     taskId = 2;
  //     res = await execute();

  //     expect(res.status).toBe(404);
  //     expect(res.body).toHaveProperty("message");
  //   });

  //   it("It should return 201 if the comment and a data property", async () => {
  //     comment = "This is a comment";
  //     taskId = 1;
  //     res = await execute();

  //     expect(res.status).toBe(201);
  //     expect(res.body).toHaveProperty("message");
  //   });
  // });

  // describe("Test Get Comments on Task", () => {
  //   let comment = "This comment is for testing only",
  //     res,
  //     token,
  //     taskId = 1,
  //     task = {
  //       title: "This is one is for testing",
  //       start_date: "2021-04-17 00:00:00",
  //       end_date: "2021-04-22 00:00:00",
  //       assign: 1,
  //       supervisor: 1,
  //       status: "Active",
  //     };

  //   beforeEach(async () => {
  //     const res = await request(server)
  //       .post("/auth/login")
  //       .send({ email: "hello@gmail.com", password: "Ammedi123" });
  //     token = res.body.token;

  //     await request(server)
  //       .post("/tasks")
  //       .set("x-auth-token", token)
  //       .send({ ...task });
  //   });

  //   const execute = async () => {
  //     await request(server)
  //       .post(`/comment/${taskId}`)
  //       .set("x-auth-token", token)
  //       .send({ comment: "This comment is for testing only" });
  //   };

  //   const executeGetComments = async () => {
  //     return await request(server)
  //       .get(`/comment/${taskId}`)
  //       .set("x-auth-token", token)
  //       .send();
  //   };

  //   it("It should return 404 if task is not added", async () => {
  //     await execute();
  //     taskId = 2;

  //     res = await executeGetComments();

  //     expect(res.status).toBe(404);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toBe(
  //       "Task your commenting on is no longer available"
  //     );
  //   });

  //   it("It should return 400 if no comment is on the task yet ", async () => {
  //     taskId = 1;
  //     res = await executeGetComments();

  //     expect(res.status).toBe(400);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toBe("Task no Comments yet");
  //   });

  //   it("It should return 200 if comments are retrieved on a  task", async () => {
  //     await execute();

  //     taskId = 1;

  //     res = await executeGetComments();

  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty("data");
  //   });
  // });

  describe("Test Delete Comment", () => {
    let comment = "This comment is for testing only",
      res,
      token,
      commentId = 1,
      taskId = 1,
      task = {
        title: "This is one is for testing",
        start_date: "2021-04-17 00:00:00",
        end_date: "2021-04-22 00:00:00",
        assign: 1,
        supervisor: 1,
        status: "Active",
      };

    beforeEach(async () => {
      const res = await request(server)
        .post("/auth/login")
        .send({ email: "hello@gmail.com", password: "Ammedi123" });
      token = res.body.token;

      await request(server)
        .post("/tasks")
        .set("x-auth-token", token)
        .send({ ...task });
    });

    const execute = async () => {
      await request(server)
        .post(`/comment/${taskId}`)
        .set("x-auth-token", token)
        .send({ comment: "This comment is for testing only" });
    };

    const executeDeleteComments = async () => {
      return await request(server)
        .delete(`/comment/${commentId}`)
        .set("x-auth-token", token)
        .send();
    };

    it("It should return 404 if comment is not added", async () => {
      commentId = 2;

      res = await executeDeleteComments();

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("Comment not available");
    });

    it("It should return 200 if comment deleted successfully ", async () => {
      taskId = 1;
      await execute();
      commentId = 1;
      res = await executeDeleteComments();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("Comment Deleted successfully");
    });
  });
});
