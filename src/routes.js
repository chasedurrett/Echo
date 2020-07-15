import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import Subforum from './Components/Subforum/Subforum'
import Post from './Components/Post/Post'


export default (
    <Switch>
        <Route exact path = '/' component={Home} />
        <Route path = '/subforum/:subforumId' component={Subforum} />
        <Route path = '/subforum/:subforumId/posts/:postId' component={Post} />

    </Switch>
)