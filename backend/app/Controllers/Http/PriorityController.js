'use strict'

const Priority = use('App/Models/Priority')

/**
 * Resourceful controller for interacting with priorities
 */
class PriorityController {
  async index() {
    return await Priority.all()
  }

  async store({ request }) {
    const priorityInserted = await Priority.create(request.body)

    if (!priorityInserted) {
      return response.status(500).json({ message: 'Error on inserting priority' })
    }

    return priorityInserted
  }

  async show({ params, response }) {
    const priority = await Priority.find(params.id)

    if (!priority) {
      return response.status(404).json({ message: 'Priority not found' })
    }

    return priority;
  }

  async update({ params, request, response }) {
    const priority = await Priority.find(params.id)

    if (!priority) {
      return response.status(404).json({ message: 'Priority not found' })
    }

    priority.merge(request.body)

    return await priority.save()
  }

  async destroy({ params, response }) {
    const priority = await Priority.find(params.id)

    if (!priority) {
      return response.status(404).json({ message: 'Priority not found' })
    }

    await priority.delete()
  }
}

module.exports = PriorityController
