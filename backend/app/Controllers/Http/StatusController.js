'use strict'

const Status = use('App/Models/Status')

/**
 * Resourceful controller for interacting with statuses
 */
class StatusController {
  async index() {
    const statuses = await Status.all()

    const options = []
    statuses.rows.forEach(status => {
      options.push({
        'value': status.id,
        'label': status.name
      });
    })

    return options
  }

  async store({ request }) {
    const statusInserted = await Status.create(request.body)

    if (!statusInserted) {
      return response.status(500).json({ message: 'Error on inserting status' })
    }

    return statusInserted
  }

  async show({ params, response }) {
    const status = await Status.find(params.id)

    if (!status) {
      return response.status(404).json({ message: 'Status not found' })
    }

    return status;
  }

  async update({ params, request, response }) {
    const status = await Status.find(params.id)

    if (!status) {
      return response.status(404).json({ message: 'Status not found' })
    }

    status.merge(request.body)

    return await status.save()
  }

  async destroy({ params, response }) {
    const status = await Status.find(params.id)

    if (!status) {
      return response.status(404).json({ message: 'Status not found' })
    }

    await status.delete()
  }
}

module.exports = StatusController
