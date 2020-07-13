module.exports = {
    getAllUsers: async (req, res) => {
        const db = req.app.get('db')

        const users = await db.all_users()

        res.status(200).send(users)
    },

    getUser: async (req, res) => {
        const db = req.app.get('db')

        const {userId} = req.params

        const user = await db.user(userId)

        res.status(200).send(user)
    }


}