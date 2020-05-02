'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up() {
    this.create('statuses', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable()
      table.string('color', 9).notNullable()
    })
  }

  down() {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
