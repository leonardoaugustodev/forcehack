'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.string('name').notNullable()
      table.string('description')
    })
  }

  down() {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
