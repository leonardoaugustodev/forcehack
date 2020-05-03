'use strict'

const User = use('App/Models/User')

class UserController {

    async login({ auth, request }) {
        const { email, password } = request.all()
        return await auth.attempt(email, password)
    }

    show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }

    async store({ request }) {
        const userInserted = await User.create(request.body)

        if (!userInserted) {
            return response.status(500).json({ message: 'Error on inserting user' })
        }

        return userInserted
    }

    async update({ params, request, response }) {
        const user = await User.find(params.id)

        if (!user) {
            return response.status(404).json({ message: 'User not found' })
        }

        user.merge(request.body)

        return await user.save()
    }

    async destroy({ params, response }) {
        const user = await User.find(params.id)

        if (!user) {
            return response.status(404).json({ message: 'User not found' })
        }

        await user.delete()
    }
}

module.exports = UserController
