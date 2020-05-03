'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskStatusSchema extends Schema {
  up() {
    this.create('task_statuses', (table) => {
      table.increments()
      table.timestamps()
      table.integer('task_id').references('id').inTable('tasks')
      table.integer('status_id').references('id').inTable('statuses')
    })
  }

  down() {
    this.drop('task_statuses')
  }
}

module.exports = TaskStatusSchema
