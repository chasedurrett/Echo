require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');

const app = express();
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const authCtrl = require('./authController');
const userCtrl = require('./userController');
const subforumCtrl = require('./subforumController')

app.use(express.json());
app.use(cors());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 14} //2weeks
    })
)

// Auth Endpoints
// app.get('/auth/users/:userId')
// i changed this first get to 
// app.get('/auth/users/current') 
// because i thought this was to get the current user of who is logged in... 
// if that is the case then we just pull the user off the session 
// and do not need a userId...  lmk and we can do whatever you guys want!
app.get('/auth/users/current', authCtrl.currentUser);
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.delete('/auth/logout', authCtrl.logout);
app.delete('/auth/users/:userId', authCtrl.delete);

// User Endpoints 
app.get('/api/users', userCtrl.getAllUsers);
app.get('/api/users/:userId', userCtrl.getUser);
//  - app.get('/api/users/:userId/followers/:followerId')
//  - app.get('/api/users/:userId/followers/:followerId')
// - app.post('/api/users/:userId/followers', userCtrl.addFollower);
//  - app.put('/api/users/:userId', body)
// - app.delete('/api/users/:userId/followers/:followerId')


// Subforum Endpoints 
app.get('/api/subforums', subforumCtrl.getSubforums)
app.get('/api/subforums/:subforumId')
app.post('/api/subforums/:subforumId/posts', )
app.post('/api/subforums/:subforumId/posts/:postId/comments', )
app.post('/api/subforums', subforumCtrl.createSubforum)
app.post('/api/subforums/:subforumId/users', )
app.put('/api/subforums/:subforumId', )
app.delete('/api/subforums/:subforumId')

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('db connected')
})
.catch(err => console.log(err))

app.listen(SERVER_PORT, console.log(`listening on ${SERVER_PORT}`));