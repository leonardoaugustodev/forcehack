"use strict";

const Task = use("App/Models/Task");

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  async index() {
    return await Task.query()
      .with("status")
      .with("priority")
      .with("notes")
      .with("time_reports")
      .fetch();
  }

  async store({ request, response }) {
    const taskInserted = await Task.create(request.body);

    if (!taskInserted) {
      return response.status(500).json({ message: "Error on inserting task" });
    }

    return taskInserted;
  }

  async show({ params, response }) {
    const task = await Task.query()
      .where("id", params.id)
      .with("status")
      .with("priority")
      .with("notes")
      .with("time_reports")
      .first();

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    return task;
  }

  async update({ params, request, response }) {
    const task = await Task.find(params.id);

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    task.merge(request.body);

    return await task.save();
  }

  async destroy({ params, response }) {
    const task = await Task.find(params.id);

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    await task.delete();
  }
}

module.exports = TaskController;
