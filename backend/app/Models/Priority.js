'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Priority extends Model {
    tasks() {
        return this.hasMany('App/Models/Task')
    }
}

module.exports = Priority
