import React from 'react'
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../CardPost/CardPost.scss'

export default function CardPost(props) {

    const upVote = (postId) => {
        props.setButtonsDisabled(true)
        console.log(`upvoting`);
        axios.post(`/api/subforums/${props.post.subforumId}/posts/${postId}/upvote`)
          .then(res => {
            props.getPosts()
          })
          .catch(err => console.log(err))
          ;
      };
    
      const downVote = (postId) => {
        props.setButtonsDisabled(true)
        console.log(`downvoting`);
        axios.post(`/api/subforums/${props.post.subforumId}/posts/${postId}/downvote`)
          .then(res => {
            props.getPosts()
          });
      };
    
      const deleteVote = (postId) => {
        props.setButtonsDisabled(true)
        console.log(`deleting vote`);
        axios.delete(`/api/subforums/${props.post.subforumId}/posts/${postId}/remove-vote`)
        .then(res => {
          props.getPosts()
        });
      };
      
      console.log(props)
      
      return (
        <div>
          <Link to={`/subforums/${props.post.subforum_id}/posts/${props.post.post_id}`} style={{ textDecoration: 'none' }, {color: 'black'}}>
            <span id='post-title-cardpost'>
              {props.post.post_title}
            </span>
          </Link>
          
          <div className="voteTracker">
            <div>
              {props.post.upvote === true ? (
                <GoArrowUp
                alt="upvote"
                style={{ maxWidth: 50 }}
                className="vote-arrow voted"
                onClick={() => props.buttonsDisabled ? null : deleteVote(props.post.post_id)}
                />
                ) : (
                  <GoArrowUp
                  alt="upvote"
                  className="vote-arrow"
                  onClick={() => props.buttonsDisabled ? null :  upVote(props.post.post_id)}
                  />
                  )}
            </div>
            <div className="voteCount">{props.post.vote_tracker}</div>
            <div>
              {props.post.downvote === true ? (
                <GoArrowDown
                alt="upvote"
                style={{ maxWidth: 50 }}
                className="vote-arrow voted"
                onClick={() => props.buttonsDisabled ? null :  deleteVote(props.post.post_id)}
                />
                ) : (
                  <GoArrowDown
                  alt="downvote"
                  className="vote-arrow"
                  onClick={() => props.buttonsDisabled ? null :  downVote(props.post.post_id)}
                  />
                  )}
            </div>
          </div>
        </div>
      );
}