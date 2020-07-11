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
    },

    addFollower: async (req, res) => {
        const db = req.app.get('db')

        //we will get the logged in user off the session
        const {currentUser} = req.session.user.user_id

        //the userId we pull off params will be the user that currentUser is going to follow
        const {userId} = req.params

        const follow = await db.add_follow(currentUser, userId)

        res.status(200).send('succesful follow')
    }



}