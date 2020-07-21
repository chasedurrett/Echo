import React, { useEffect, useState } from 'react';
import './ClassicPost.scss';
import {BsDot} from 'react-icons/bs';
import {FaCommentAlt} from 'react-icons/fa';
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import axios from 'axios'

function ClassicPost(props) {

    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    useEffect(() => {
 
        console.log(props)
    }, [])

    const upVote = (postId) => {
        setButtonsDisabled(true)
        console.log(`upvoting`);
        axios.post(`/api/subforums/${props.subforumId}/posts/${postId}/upvote`)
          .then(res => {
            props.getUserPosts()
          })
          .catch(err => console.log(err))
          ;
      };
    
      const downVote = (postId) => {
        setButtonsDisabled(true)
        console.log(`downvoting`);
        axios.post(`/api/subforums/${props.subforumId}/posts/${postId}/downvote`)
          .then(res => {
            props.getUserPosts()
          });
      };
    
      const deleteVote = (postId) => {
        setButtonsDisabled(true)
        console.log(`deleting vote`);
        axios.delete(`/api/subforums/${props.subforumId}/posts/${postId}/remove-vote`)
          .then(res => {
            props.getUserPosts()
          });
      };

    return (
        <div className='classic-post-container'>
            <div className='counter-container'>
              <div>
              {props.upvote === true ? (
                <GoArrowUp
                  alt="upvote"
                  className="vote-arrow voted"
                  onClick={() => buttonsDisabled ? null : deleteVote(props.post_id)}
                />
              ) : (
                  <GoArrowUp
                    alt="upvote"
                    className="vote-arrow"
                    onClick={() => buttonsDisabled ? null :  upVote(props.post_id)}
                  />
                )}
              </div>
              <div className="voteCount">{props.vote_tracker}</div>
              <div>
                {props.downvote === true ? (
                  <GoArrowDown
                    alt="downvote"
                    className="vote-arrow voted"
                    onClick={() => buttonsDisabled ? null :  deleteVote(props.post_id)}
                  />
                ) : (
                    <GoArrowDown
                      alt="downvote"
                      className="vote-arrow"
                      onClick={() => buttonsDisabled ? null :  downVote(props.post_id)}
                    />
                  )}
              </div>
            </div>
            <div className='post-info-container'>
                <div className='classic-title'>{props.title}</div>
                <div className='classic-chamber'>
                    c/{props.chamber}
                    <BsDot className='dot'/>
                    <span className='classic-author'>Posted by u/{props.username}</span>
                    <FaCommentAlt className='classic-comment'/>
                </div>
            </div>
        </div>
    )
}

export default ClassicPost;