import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Subforum from "./Components/Subforum/Subforum";
import Profile from "./Components/Profile/Profile";
import CreatePost from "./Components/CreatePost/CreatePost";
import PostDetailed from "./Components/Post/PostDetailed/PostDetailed";
//protected route imports
import ProtectedProfile from "./ProtectedRoutes/ProtectedProfile";
import Search from "./Components/Search/Search";
import PostImage from './Components/postImage';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/subforums/:subforumId" component={Subforum} />
    <ProtectedProfile path="/users/:userId" component={Profile} />
    <Route path="/create-post/:subforumId?" component={CreatePost} />
    <Route path="/posts/:postId" component={PostDetailed} />
    <Route path="/search" component={Search} />
  </Switch>
);
