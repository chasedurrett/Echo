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
const postCtrl = require('./postController');

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

// Post Endpoints
app.get('/api/subforum/:subforumId/posts', postCtrl.getAllSubforumPosts)
app.post('/api/subforum/:subforumId/post', postCtrl.createSubforumPost)
app.get('/api/subforum/:subforumId/posts/:postId', postCtrl.getSingleSubforumPost)
app.put('/api/subforum/:subforumId/posts/:postId', postCtrl.updateSubforumPost)
app.delete('/api/subforum/:subforumId/posts/:postId', postCtrl.deleteSubforumPost)

//Comment Endpoints

// Subforum Endpoints 
app.get('/api/subforums', subforumCtrl.getSubforums)
app.get('/api/subforums/:subforumId')
app.post('/api/subforums/:subforumId/posts', )
app.post('/api/subforums/:subforumId/posts/:postId/comments', )
app.post('/api/subforums', subforumCtrl.createSubforum)
app.post('/api/subforums/:subforumId/users', )
app.put('/api/subforums/:subforumId/users/:userId', subforumCtrl.editSubforum)
app.delete('/api/subforums/:subforumId/users/:userId', subforumCtrl.deleteSubforum)

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