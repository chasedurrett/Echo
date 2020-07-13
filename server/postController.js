//includes comments
const moment = require('moment');

module.exports = {
    getAllSubforumPosts: async (req, res) => {
        const db = req.app.get('db')

        const {subforumId} = req.params

        let post = db.
    }
}
