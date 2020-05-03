'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Status extends Model {
    task() {
        return this.hasMany('App/Models/Task')
    }

}

module.exports = Status
