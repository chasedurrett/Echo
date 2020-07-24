import React, { useEffect, useState } from "react";
import "./ClassicPost.scss";
import { BsDot } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";

function ClassicPost(props) {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [voteNum, setVoteNum] = useState(props.vote_tracker);
  const [upvote, setUpVote] = useState(props.upvote);
  const [downvote, setDownVote] = useState(props.downvote);

  const getVote = () => {
    axios.get(`/posts/${props.post_id}/votes`).then((res) => {
      setVoteNum(res.data[0].vote_tracker);
      setUpVote(res.data[0].upvote);
      setDownVote(res.data[0].downvote);
      setButtonsDisabled(false);
    });
  };

  const upVote = (postId) => {
    setButtonsDisabled(true);
    axios
      .post(`/api/subforums/${props.subforumId}/posts/${postId}/upvote`)
      .then((res) => {
        getVote();
      })
      .catch((err) => console.log(err));
  };

  const downVote = (postId) => {
    setButtonsDisabled(true);
    axios
      .post(`/api/subforums/${props.subforumId}/posts/${postId}/downvote`)
      .then((res) => {
        getVote();
      })
      .catch((err) => console.log(err));
  };

  const deleteVote = (postId) => {
    setButtonsDisabled(true);
    axios
      .delete(`/api/subforums/${props.subforumId}/posts/${postId}/remove-vote`)
      .then((res) => {
        getVote();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="classic-post-container">
      <div className="counter-container">
        <div>
          {upvote === true ? (
            <GoArrowUp
              alt="upvote"
              className="voter-arrow voted"
              onClick={() =>
                buttonsDisabled ? null : deleteVote(props.post_id)
              }
            />
          ) : (
            <GoArrowUp
              alt="upvote"
              className="voter-arrow"
              onClick={() => (buttonsDisabled ? null : upVote(props.post_id))}
            />
          )}
        </div>
        <div className="vote-counter">{voteNum}</div>
        <div>
          {downvote === true ? (
            <GoArrowDown
              alt="downvote"
              className="voter-arrow voted down-arr"
              onClick={() =>
                buttonsDisabled ? null : deleteVote(props.post_id)
              }
            />
          ) : (
            <GoArrowDown
              alt="downvote"
              className="voter-arrow down-arr"
              onClick={() => (buttonsDisabled ? null : downVote(props.post_id))}
            />
          )}
        </div>
      </div>
      <div className="post-info-container">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/subforums/${props.subforum_id}/posts/${props.post_id}`}
        >
          <div className="classic-title">{props.title}</div>
        </Link>
        <div className="classic-chamber">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/subforums/${props.subforum_id}`}
          >
            c/{props.chamber}
          </Link>
          <BsDot className="dot" />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/users/${props.user_id}`}
          >
            <span className="classic-author">Posted by u/{props.username}</span>
          </Link>
          <FaCommentAlt className="classic-comment" />
        </div>
      </div>
    </div>
  );
}

export default ClassicPost;
