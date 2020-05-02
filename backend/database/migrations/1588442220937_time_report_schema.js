'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeReportSchema extends Schema {
  up() {
    this.create('time_reports', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.decimal('minutes').notNullable()
      table.integer('task_id').unsigned().references('id').inTable('tasks')
    })
  }

  down() {
    this.drop('time_reports')
  }
}

module.exports = TimeReportSchema
