import React from 'react'
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import axios from 'axios'
import '../CardPost/CardPost.scss'

export default function CardPost(props) {

  const {
    post_id,
    post_title,
    post_content,
    post_url,
    post_type,
    post_time,
    subforum_id,
    subforum_name,
    subforum_img,
    username,
  } = props.post;

    const upVote = (postId) => {
        props.setButtonsDisabled(true)
        console.log(`upvoting`);
        axios.post(`/api/subforums/${props.subforumId}/posts/${postId}/upvote`)
          .then(res => {
            props.getPosts()
          })
          .catch(err => console.log(err))
          ;
      };
    
      const downVote = (postId) => {
        props.setButtonsDisabled(true)
        console.log(`downvoting`);
        axios.post(`/api/subforums/${props.subforumId}/posts/${postId}/downvote`)
          .then(res => {
            props.getPosts()
          });
      };
    
      const deleteVote = (postId) => {
        props.setButtonsDisabled(true)
        console.log(`deleting vote`);
        axios.delete(`/api/subforums/${props.subforumId}/posts/${postId}/remove-vote`)
          .then(res => {
            props.getPosts()
          });
      };

      console.log(props)

      return (
        <div>
          {props.post_title}
          {/* {props.post_id} */}
          <div className="voteTracker">
            <div>
              {props.upvote === true ? (
                <GoArrowUp
                  alt="upvote"
                  style={{ maxWidth: 50 }}
                  className="vote-arrow voted"
                  onClick={() => props.buttonsDisabled ? null : deleteVote(props.post_id)}
                />
              ) : (
                  <GoArrowUp
                    alt="upvote"
                    className="vote-arrow"
                    onClick={() => props.buttonsDisabled ? null :  upVote(props.post_id)}
                  />
                )}
            </div>
            <div className="voteCount">{props.vote_tracker}</div>
            <div>
              {props.downvote === true ? (
                <GoArrowDown
                  alt="upvote"
                  style={{ maxWidth: 50 }}
                  className="vote-arrow voted"
                  onClick={() => props.buttonsDisabled ? null :  deleteVote(props.post_id)}
                />
              ) : (
                  <GoArrowDown
                    alt="downvote"
                    className="vote-arrow"
                    onClick={() => props.buttonsDisabled ? null :  downVote(props.post_id)}
                  />
                )}
            </div>
          </div>
        </div>
      );
}
