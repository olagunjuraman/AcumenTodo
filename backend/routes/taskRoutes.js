const TodoController = require("../controllers/taskController");

const Joi = require("joi");

const schema = Joi.object().keys({
  text: Joi.string(),
  day: Joi.string(),
  reminder: Joi.boolean(),
});
module.exports = [
  {
    path: "/api/tasks",
    method: "POST",
    handler: TodoController.createTask,
    config: {
      validate: {
        payload: schema,
      },
    },
  },
  {
    path: "/api/tasks",
    method: "GET",
    handler: TodoController.getTasks,
  },
  {
    path: "/api/tasks/{id}",
    method: "GET",
    handler: TodoController.getTask,
  },
  {
    path: "/api/tasks/{id}",
    method: "DELETE",
    handler: TodoController.deleteTask,
    config: {
      validate: {
        params: Joi.object().keys({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    path: "/api/tasks/{id}",
    method: "PUT",
    handler: TodoController.updateTask,
    config: {
      validate: {
        params: Joi.object().keys({
          id: Joi.string().required(),
        }),
      },
    },
  },
];
