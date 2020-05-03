'use strict'

const TimeReport = use('App/Models/TimeReport')
/**
 * Resourceful controller for interacting with timereports
 */
class TimeReportController {
  async index() {
    return await TimeReport.all()
  }

  async store({ request }) {
    const timeReportInserted = await TimeReport.create(request.body)

    if (!timeReportInserted) {
      return response.status(500).json({ message: 'Error on inserting timeReport' })
    }

    return timeReportInserted
  }

  async show({ params, response }) {
    const timeReport = await TimeReport.find(params.id)

    if (!timeReport) {
      return response.status(404).json({ message: 'TimeReport not found' })
    }

    return timeReport;
  }

  async update({ params, request, response }) {
    const timeReport = await TimeReport.find(params.id)

    if (!timeReport) {
      return response.status(404).json({ message: 'TimeReport not found' })
    }

    timeReport.merge(request.body)

    return await timeReport.save()
  }

  async destroy({ params, response }) {
    const timeReport = await TimeReport.find(params.id)

    if (!timeReport) {
      return response.status(404).json({ message: 'TimeReport not found' })
    }

    await timeReport.delete()
  }
}

module.exports = TimeReportController
