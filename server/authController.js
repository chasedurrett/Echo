const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db');
        const {user_email, username, password} = req.body;

        //alert not popping up if user exists
        const existingUser = await db.auth.check_user(username)
        if(existingUser[0]){
            return res.status(409).send('user already exists')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        const cake_day = moment().format('LL')

        const newUser = await db.auth.register(user_email, username, hash, cake_day)

        req.session.user = {
            user_id: newUser[0].user_id,
            user_email: newUser[0].user_email,
            username: newUser[0].username,
            user_image: newUser[0].user_image,
            user_banner: newUser[0].user_banner,
            cake_day: newUser[0].cake_day
        }

        return res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;

        //check to see if user exists
        const user = await db.auth.check_user(username)
        if(!username[0]){
            return res.status(404).send('user does not exist')
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(authenticated){
            req.session.user = {
                user_id: user[0].user_id,
                user_email: user[0].user_email,
                username: user[0].username,
                user_image: user[0].user_image,
                user_banner: user[0].user_banner,
                cake_day: user[0].cake_day
            }
            console.log(req.session.user)
            return res.status(200).send(req.session.user)
        } else {
            return res.status(403).send('username or password incorrect')
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    delete: async (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params;

        const deleteUser = await db.auth.delete_user(userId);

        res.status(200).send('successful deleted user')
    },

    currentUser: (req, res) => {
        if (req.session.user) {
          res.status(200).send(req.session.user)
        } else {
          res.sendStatus(404)
        }
    }
}
