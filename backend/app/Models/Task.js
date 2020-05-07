'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

    notes() {
        return this.hasMany('App/Models/Note')
    }

    time_reports() {
        return this.hasMany('App/Models/TimeReport')
    }

    status() {
        return this.belongsTo('App/Models/Status')
    }

    priority() {
        return this.belongsTo('App/Models/Priority')
    }

    notes() {
        return this.hasMany('App/Models/Note')
    }

}

module.exports = Task
