'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.table('tasks', (table) => {
      table.integer('priority_id').unsigned().references('id').inTable('priorities')
      table.integer('status_id').unsigned().references('id').inTable('statuses')
    })
  }

  down() {
    this.table('tasks', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TaskSchema
