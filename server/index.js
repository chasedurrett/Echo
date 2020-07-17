require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const cors = require("cors");

const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const authCtrl = require("./authController");
const userCtrl = require("./userController");
const subforumCtrl = require("./subforumController");
const postCtrl = require("./postController");
const searchCtrl = require("./searchController");

app.use(express.json());
app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 14 }, //2weeks
  })
);

// Auth Endpoints
app.get("/auth/users/current", authCtrl.currentUser);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.delete("/auth/logout", authCtrl.logout);
app.delete("/auth/users/:userId", authCtrl.delete);

// User Endpoints
app.get("/api/users", userCtrl.getAllUsers);
app.get("/api/users/:userId", userCtrl.getUser);
app.get("/api/users/:userId/followers", userCtrl.getFollowers);
app.get("/api/users/:userId/following", userCtrl.getFollowing);

app.get("/api/users/:userId/profileInfo", userCtrl.getUserProfileInfo);

app.post("/api/users/:userId", userCtrl.addFollower);
app.put("/api/users/:userId", userCtrl.updateUser);
app.delete("/api/users/:userId", userCtrl.removeFollower);

// Post Endpoints
app.get("/api/subforums/:subforumId/posts", postCtrl.getAllSubforumPosts);
app.get("/api/subforums/posts/no-user", postCtrl.getAllPostsNoUser);
app.post("/api/subforums/:subforumId/post", postCtrl.createSubforumPost);
app.get("/api/subforums/:subforumId/posts/:postId", postCtrl.getSingleSubforumPost);
app.put("/api/subforums/:subforumId/posts/:postId", postCtrl.updateSubforumPost);
app.delete("/api/subforums/:subforumId/posts/:postId", postCtrl.deleteSubforumPost);
app.post("/api/subforums/:subforumId/posts/:postId/upvote", postCtrl.upvotePost);
app.post("/api/subforums/:subforumId/posts/:postId/downvote", postCtrl.downvotePost);
app.delete('/api/subforums/:subforumId/posts/:postId/remove-vote', postCtrl.removeVote)

//Comment Endpoints
app.post("/api/posts/:postId/comments/:commentId/upvote", postCtrl.upvoteComment);
app.post("/api/posts/:postId/comments/:commentId/downvote", postCtrl.downvoteComment);
app.delete('/api/posts/:postId/comments/:commentId/remove-vote', postCtrl.removeCommentVote)
app.get("/api/posts/:postId/comments", postCtrl.getComments);
app.post("/api/posts/:postId/comments", postCtrl.createComment);
app.delete("/api/posts/:postId/comments/:commentId", postCtrl.deleteComment);

// Subforum Endpoints
app.get("/api/subforums", subforumCtrl.getSubforums);
app.get('/api/subforums/users', subforumCtrl.getUserSubforums)
app.post("/api/subforums", subforumCtrl.createSubforum);
app.post("/api/subforums/:subforumId/users", subforumCtrl.addSubforumUser);
app.delete("/api/subforums/:subforumId/users/:userId", subforumCtrl.removeSubforumUser);
app.put("/api/subforums/:subforumId/users/:userId", subforumCtrl.editSubforum);
app.delete("/api/subforums/:subforumId/users/:userId", subforumCtrl.deleteSubforum);

// Search Endpoints
app.get("/api/posts/search", searchCtrl.getPosts);
app.get("/api/subforums/search", searchCtrl.getSubforums);
app.get("/api/users/search", searchCtrl.getUsers);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.listen(SERVER_PORT, console.log(`listening on ${SERVER_PORT}`));
