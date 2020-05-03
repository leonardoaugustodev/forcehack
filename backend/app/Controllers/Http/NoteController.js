'use strict'

const Note = use('App/Models/Note')
/**
 * Resourceful controller for interacting with notes
 */
class NoteController {
  async index() {
    return await Note.all()
  }

  async store({ request }) {
    const noteInserted = await Note.create(request.body)

    if (!noteInserted) {
      return response.status(500).json({ message: 'Error on inserting note' })
    }

    return noteInserted
  }

  async show({ params, response }) {
    const note = await Note.find(params.id)

    if (!note) {
      return response.status(404).json({ message: 'Note not found' })
    }

    return note;
  }

  async update({ params, request, response }) {
    const note = await Note.find(params.id)

    if (!note) {
      return response.status(404).json({ message: 'Note not found' })
    }

    note.merge(request.body)

    return await note.save()
  }

  async destroy({ params, response }) {
    const note = await Note.find(params.id)

    if (!note) {
      return response.status(404).json({ message: 'Note not found' })
    }

    await note.delete()
  }
}

module.exports = NoteController
