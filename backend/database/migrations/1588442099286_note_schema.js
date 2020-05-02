'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoteSchema extends Schema {
  up() {
    this.create('notes', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable()
      table.text('content')
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.integer('task_id').unsigned().references('id').inTable('tasks')
    })
  }

  down() {
    this.drop('notes')
  }
}

module.exports = NoteSchema
