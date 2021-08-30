const Task = require("../models/taskModel");
const Boom = require("boom");

module.exports = {
  async createTask(req, reply) {
    const { text, day, reminder } = req.payload;
    const task = {
      text,
      day,
      reminder,
    };
    try {
      const savedTask = await Task.create(task);
      return reply.response(savedTask);
    } catch (err) {
      return err;
    }
  },

  async getTasks(req, reply) {
    console.log(new Date().getHours())
    try {
      const tasks = await Task.find({});
      return reply.response(tasks);
    } catch (err) {
      return err
    }
  },

  async getTask(req, reply) {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      return reply.response(task);
    } catch (err) {
      return Boom.notFound("Cannot find the requested id");
    }
  },

  async updateTask(req, reply) {
    const { reminder } = req.payload;
    try {
      if (!req.params.id) {
        return reply({ err: "id is required param" }).code(400);
      }
      const task = await Task.findById(req.params.id);
      task.reminder = reminder;
      await task.save();
      return reply.response(task);
    } catch (err) {
      return Boom.notFound("Cannot find the requested id");
    }
  },

  async deleteTask(req, reply) {
    try {
      if (!req.params.id) {
        return reply({ err: "id is required param" }).code(400);
      }
      await Task.findByIdAndRemove(req.params.id);

      return reply.response({
        msg: `company has deleted with id ${req.params.id}`,
      });
    } catch (error) {
      return Boom.notFound("Cannot find the requested id");
    }
  },
};
