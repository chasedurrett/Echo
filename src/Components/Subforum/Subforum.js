import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import axios from "axios";
import "./Subforum.scss";

function Subforum(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(props.match.params);
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get(`/api/subforums/${props.match.params.subforumId}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
  };

  const upVote = (postId) => {
    console.log(postId);
    axios.post(`/api/posts/${postId}/upvote`).then();
  };

  const downVote = (postId) => {
    console.log(postId);
    axios.post(`/api/posts/${postId}/downvote`).then();
  };

  const deleteVote = (postId) => {
    console.log(postId);
    axios.delete(`/api/posts/${postId}/remove-vote`).then();
  };

  console.log(posts);

  const mappedPosts = posts.map((element, index) => {
    console.log(element);
    return (
      <div>
        {element.post_title}
        {element.post_id}
        <div className="voteTracker">
          <div>
            {element.upvote === true ? (
              <GoArrowUp
                alt="upvote"
                style={{ maxWidth: 50 }}
                className="vote-arrow"
                onClick={() => deleteVote(element.post_id)}
              />
            ) : (
              <GoArrowUp
                alt="upvote"
                className="vote-arrow"
                onClick={() => upVote(element.post_id)}
              />
            )}
          </div>
          <div className="voteCount">{element.vote_tracker}</div>
          <div>
            {element.downvote === true ? (
              <GoArrowDown
                alt="upvote"
                style={{ maxWidth: 50 }}
                className="vote-arrow"
                onClick={() => deleteVote(element.post_id)}
              />
            ) : (
              <GoArrowDown
                alt="downvote"
                className="vote-arrow"
                onClick={() => downVote(element.post_id)}
              />
            )}
          </div>
        </div>
      </div>
    );
  });

  return <div className="subforum-container">{mappedPosts}</div>;
}

export default Subforum;
