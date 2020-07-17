

module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        let val = req.query.input
        console.log(val)

        const data = await db.search.get_search_posts(val)

        if(data.length === 0){
            res.status(500).send(`Couldn't get posts, we're fixing that!`)
        }
        res.status(200).send(data)
    },
    
    getSubforums: async (req, res) => {
        const db = req.app.get('db')
        let val = req.query.input

        const data = await db.search.get_search_subforums(val)

        if(data.length === 0){
            res.status(500).send(`Couldn't get any Chambers, we're fixing that!`)
        }
        res.status(200).send(data)
    },

    getUsers: async (req, res) => {
        const db = req.app.get('db')
        let val = req.query.input

        const data = await db.search.get_search_users(val)

        if(data.length === 0){
            res.status(500).send(`Couldn't get any users, we're fixing that!`)
        }
        res.status(200).send(data)
    }
}