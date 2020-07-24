import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import Comments from "./Comments/Comment";
import { BsDot } from "react-icons/bs";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import ProfileBox from "../../ProfileBox/ProfileBox";
import { Link } from "react-router-dom";
import "../PostDetailed/PostDetailed.scss";
import Microlink from "@microlink/react";

function PostDetailed(props) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [voteNum, setVoteNum] = useState();
  const [upvote, setUpVote] = useState();
  const [downvote, setDownVote] = useState();
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    console.log("postDetailed");
    getPostDetails();
  }, []);

  const getPostDetails = () => {
    setButtonsDisabled(true);
    axios
      .get(
        `/api/subforums/${props.match.params.subforumId}/posts/${props.match.params.postId}`
      )
      .then((res) => {
        console.log("then");
        setPost(res.data);
        setVoteNum(res.data[0].vote_tracker);
        getVote();
        setButtonsDisabled(false);
        setLoading(false);
      });
  };

  const getVote = () => {
    console.log("get vote");
    axios.get(`/posts/${props.match.params.postId}/votes`).then((res) => {
      console.log("get vote", res.data);
      setVoteNum(res.data[0].vote_tracker);
      setUpVote(res.data[0].upvote);
      setDownVote(res.data[0].downvote);
      setButtonsDisabled(false);
    });
  };

  const upVote = (postId) => {
    setButtonsDisabled(true);
    console.log(`upvoting`);
    axios
      .post(
        `/api/subforums/${props.match.params.subforumId}/posts/${postId}/upvote`
      )
      .then((res) => {
        getVote();
      })
      .catch((err) => console.log(err));
  };

  const downVote = (postId) => {
    setButtonsDisabled(true);
    console.log(`downvoting`);
    axios
      .post(
        `/api/subforums/${props.match.params.subforumId}/posts/${postId}/downvote`
      )
      .then((res) => {
        getVote();
      })
      .catch((err) => console.log(err));
  };

  const deleteVote = (postId) => {
    setButtonsDisabled(true);
    console.log(`deleting vote`);
    axios
      .delete(
        `/api/subforums/${props.match.params.subforumId}/posts/${postId}/remove-vote`
      )
      .then((res) => {
        getVote();
      })
      .catch((err) => console.log(err));
  };

  const submitComment = (postId, comment_author_id) => {
    setLoader(false);
    axios
      .post(`/api/posts/${postId}/comments`, { comment, comment_author_id })
      .then((res) => {
        getPostDetails();
        setComment("");
        setLoader(true);
      });
  };

  console.log(voteNum);
  console.log(post);
  console.log(post.subforum_banner);

  return (
    <div style={{ display: "flex" }}>
      <div className="detailed-post-container" style={{ borderRadius: 8 }}>
        <div>
          {loading === true ? (
            <LinearProgress />
          ) : (
            <div>
              <div className="detailed-post-counter-container">
                {upvote === true ? (
                  <GoArrowUp
                    alt="upvote"
                    className="voter-arrow voted"
                    onClick={() =>
                      buttonsDisabled ? null : deleteVote(post[0].post_id)
                    }
                  />
                ) : (
                  <GoArrowUp
                    alt="upvote"
                    className="voter-arrow"
                    onClick={() =>
                      buttonsDisabled ? null : upVote(post[0].post_id)
                    }
                  />
                )}

                <div className="vote-counter">{voteNum}</div>
                {downvote === true ? (
                  <GoArrowDown
                    alt="downvote"
                    className="voter-arrow voted down-arr"
                    onClick={() =>
                      buttonsDisabled ? null : deleteVote(post[0].post_id)
                    }
                  />
                ) : (
                  <GoArrowDown
                    alt="downvote"
                    className="voter-arrow down-arr"
                    onClick={() =>
                      buttonsDisabled ? null : downVote(post[0].post_id)
                    }
                  />
                )}
              </div>
              <div className="detailed-post-info-container">
                <div className="details-links">
                  <Link
                    to={`/subforums/${post[0].subforum_id}`}
                    className="card-post-subforum-img"
                  >
                    {post[0].subforum_img === null ? (
                      <img
                        style={{ height: 20, width: 20 }}
                        src={require("./echo_chamber_icon_2.png")}
                      />
                    ) : (
                      <img
                        style={{ borderRadius: "50%", height: 20, width: 20 }}
                        src={post[0].subforum_img}
                      />
                    )}
                  </Link>
                  <Link
                    to={`/subforums/${post[0].subforum_id}`}
                    style={{ color: "black" }}
                  >
                    c/{post[0].subforum_name}
                  </Link>
                  <BsDot className="dot" />
                  <Link
                    to={`/users/${post[0].post_author_id}`}
                    style={{ color: "black" }}
                  >
                    <span className="classic-Author">
                      posted by u/{post[0].author_username}
                    </span>
                  </Link>
                </div>
                <div className="detailed-title">{post[0].post_title}</div>
              </div>
              <div className="detailed-post" style={{ minHeight: 200 }}>
                {post[0].post_type_id === 2 ? (
                  <img
                    style={{ width: 400, height: 300, margin: "auto" }}
                    src={post[0].post_content}
                  />
                ) : null}
                {post[0].post_type_id === 1 || post[0].post_type_id === null
                  ? post.post_content
                  : null}
                {post[0].post_type_id === 3 ? (
                  <Microlink
                    style={{ borderRadius: 8, margin: "auto" }}
                    size="large"
                    url={post[0].post_url}
                  />
                ) : null}
              </div>

              <span className="comment-as">Comment as {post[0].username}</span>
            </div>
          )}
        </div>
        <div>
          <div className="text-area-container">
            [0]
            <textarea
              value={comment}
              className="comment-textarea"
              onChange={(e) => setComment(e.target.value)}
              placeholder="What are your thoughts?"
            />
            <div
              className="comment-btn"
              onClick={() =>
                submitComment(props.match.params.postId, post[0].user_id)
              }
            >
              Comment
            </div>
          </div>
          <div className="comments-container"></div>
          <Comments loader={loader} postId={props.match.params.postId} />
        </div>
      </div>
      <div style={{ position: "absolute" }}></div>
    </div>
  );
}

export default PostDetailed;
