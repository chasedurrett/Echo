require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');

const app = express();
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const authCtrl = require('./authController');
const userCtrl = require('./userController');

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
//  - app.post('/api/users/:userId/followers', body)
//  - app.put('/api/users/:userId', body)
//  - app.delete('/api/users/:userId/followers/:followerId')


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