import React from "react";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import axios from "axios";
import "../CardPost/CardPost.css";

export default function CardPost(props) {
  const {
    post_id,
    post_title,
    post_content,
    post_url,
    post_type_id,
    post_time,
    subforum_id,
    subforum_name,
    subforum_img,
    comment_count,
    author_username,
    vote_tracker,
    upvote,
    downvote,
  } = props.post;

  const upVote = (post_id) => {
    props.setButtonsDisabled(true);
    console.log(`upvoting`);
    axios
      .post(`/api/subforums/${subforum_id}/posts/${post_id}/upvote`)
      .then((res) => {
        props.getPosts();
      })
      .catch((err) => console.log(err));
  };

  const downVote = (post_id) => {
    props.setButtonsDisabled(true);
    console.log(`downvoting`);
    axios
      .post(`/api/subforums/${subforum_id}/posts/${post_id}/downvote`)
      .then((res) => {
        props.getPosts();
      });
  };

  const deleteVote = (post_id) => {
    props.setButtonsDisabled(true);
    console.log(`deleting vote`);
    axios
      .delete(`/api/subforums/${subforum_id}/posts/${post_id}/remove-vote`)
      .then((res) => {
        props.getPosts();
      });
  };

  return (
    <div className="card-post-container">
      <div className="card-vote-count-container">
        <div>
          <div>
            {upvote === true ? (
              <GoArrowUp
                alt="upvote"
                style={{ maxWidth: 50 }}
                className="vote-arrow voted"
                onClick={() =>
                  props.buttonsDisabled ? null : deleteVote(post_id)
                }
              />
            ) : (
              <GoArrowUp
                alt="upvote"
                className="vote-arrow"
                onClick={() => (props.buttonsDisabled ? null : upVote(post_id))}
              />
            )}
          </div>
          <div className="voteCount">{vote_tracker}</div>
          <div>
            {downvote === true ? (
              <GoArrowDown
                alt="upvote"
                style={{ maxWidth: 50 }}
                className="vote-arrow voted"
                onClick={() =>
                  props.buttonsDisabled ? null : deleteVote(post_id)
                }
              />
            ) : (
              <GoArrowDown
                alt="downvote"
                className="vote-arrow"
                onClick={() =>
                  props.buttonsDisabled ? null : downVote(post_id)
                }
              />
            )}
          </div>
        </div>
      </div>
      <div className="card-content-container">
        <div className="card-content-header">
          <h4>c/{subforum_name}</h4>
          <h5>
            posted by {author_username} on {post_time}
          </h5>
        </div>
        <div className="card-content-body">
          <div className="card-post-title">{post_title}</div>
          <div className="card-post-content">
            {post_type_id === 1 || post_type_id === null ? (
              <span>{post_content}</span>
            ) : null}
          </div>
        </div>
        <div className="card-content-footer">
            <h5>{comment_count} comments</h5>
        </div>
      </div>
    </div>
  );
}
