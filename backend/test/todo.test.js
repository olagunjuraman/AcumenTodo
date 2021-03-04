// const request = require("supertest");
// const Todo = require("../models/todoModel");

// const mongoose = require("mongoose");

// let server = require("../server");

// describe("/api/todo", () => {
//   beforeAll((done) => {
  

//   afterAll(async (done) => {
//     server.on("stop", () => {
//       done();
//     });
//     server.stop();
//     await Todo.remove({});
//   });

//   describe("GET /", () => {
//     it("should return all todo", async (done) => {
//       const todos = [
//         { text: "Go to the market", day: "Friday 2020", reminder: true },
//         { text: "Go to the School", day: "Saturday 2020", reminder: true },
//       ];

//       await Todo.collection.insertMany(todos);

//       const res = await request(server).get("/api/todo");

//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(2);
//       expect(res.body.some((g) => g.text === "Go to the market")).toBeTruthy();
//       expect(res.body.some((g) => g.text === "Go to the School")).toBeTruthy();

//       done();
//     });
//   });

//   describe("GET /:id", () => {
//     it("should return a todo if valid id is passed", async () => {
//       const todo = new Todo({
//         text: "Go to the market",
//         day: "Friday 2020",
//         reminder: true,
//       });
//       await todo.save();

//       const res = await request(server).get("/api/todo/" + todo._id);

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty("text", todo.text);
//     });

//     it("should return 404 if invalid id is passed", async () => {
//       const res = await request(server).get("/api/todo/1");

//       expect(res.status).toBe(404);
//     });

//     it("should return 404 if no todo with the given id exists", async () => {
//       const id = mongoose.Types.ObjectId();
//       const res = await request(server).get("/api/todo/" + id);

//       expect(res.status).toBe(404);
//     });
//   });

//   describe("POST /", () => {
//     it("should retun todo if its valid", async () => {
//       const res = await request(server).post("/api/todo").send({
//         text: "Go to the market",
//         day: "Friday 2020",
//         reminder: false,
//       });

//       expect(res.body).toHaveProperty("id");
//       expect(res.body).toHaveProperty("text", "Go to the market");
//       expect(res.body).toHaveProperty("day", "Friday 2020");
//       expect(res.body).toHaveProperty("reminder", false);
//     });
//   });

//   describe("PUT /:id", () => {
//     let reminder;
//     let todo;
//     let id;

//     const exec = async () => {
//       return await request(server)
//         .put("/api/todo/" + id)

//         .send({ reminder });
//     };

//     beforeAll(async () => {
//       // Before each test we need to create a todo and
//       // put it in the database.
//       todo = new Todo({
//         text: "Go to the market",
//         day: "Friday 2020",
//         reminder: true,
//       });
//       await todo.save();

//       id = todo._id;
//       reminder = todo.reminder;
//     });

//     it("should return 404 if id is invalid", async () => {
//       id = 1;

//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it("should return 404 if todo with the given id was not found", async () => {
//       id = mongoose.Types.ObjectId();

//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it("should update the todo if input is valid", async () => {
//       await exec();

//       const updatedTodo = await Todo.findById(todo._id);

//       expect(updatedTodo.reminder).toBe(!reminder);
//     });

//     it("should return the updated todo if it is valid", async () => {
//       const res = await exec();

//       expect(res.body).toHaveProperty("_id");
//       expect(res.body).toHaveProperty("reminder", reminder);
//     });
//   });

//   describe("DELETE /:id", () => {
//     let todo;
//     let id;

//     const exec = async () => {
//       return await request(server)
//         .delete("/api/todo/" + id)
//         .send();
//     };

//     beforeAll(async () => {
//       // Before each test we need to create a todo and
//       // put it in the database.
//       todo = new Todo({ text: "Go to the market" });
//       await todo.save();
//     });

//     it("should return 404 if id is invalid", async () => {
//       id = 1;

//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it("should return 404 if no todo with the given id was found", async () => {
//       id = mongoose.Types.ObjectId();

//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it("should delete the todo if input is valid", async () => {
//       await exec();

//       const todoInDb = await Todo.findById(id);

//       expect(todoInDb).toBeNull();
//     });

//     it("should return the removed todo", async () => {
//       const res = await exec();

//       expect(res.body).toHaveProperty("_id", todo._id.toHexString());
//       expect(res.body).toHaveProperty("text", todo.text);
//       expect(res.body).toHaveProperty("day", todo.day);
//       expect(res.body).toHaveProperty("reminder", todo.reminder);
//     });
//   });
// });


