import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import axios from "axios";
import "./Subforum.scss";

function Subforum(props) {
  const [posts, setPosts] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false)

  useEffect(() => {
    // console.log(props.match.params);
    getPosts();
  }, [props.match.params.subforumId]);

  const getPosts = () => {
    axios
      .get(`/api/subforums/${props.match.params.subforumId}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setButtonsDisabled(false)
      });
  };

  const upVote = (postId) => {
    setButtonsDisabled(true)
    console.log(`upvoting`);
    axios.post(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/upvote`)
      .then(res => {
        getPosts()
      })
      .catch(err => console.log(err))
      ;
  };

  const downVote = (postId) => {
    setButtonsDisabled(true)
    console.log(`downvoting`);
    axios.post(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/downvote`)
      .then(res => {
        getPosts()
      });
  };

  const deleteVote = (postId) => {
    setButtonsDisabled(true)
    console.log(`deleting vote`);
    axios.delete(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/remove-vote`)
      .then(res => {
        getPosts()
      });
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
                className="vote-arrow voted"
                onClick={() => buttonsDisabled ? null : deleteVote(element.post_id)}
              />
            ) : (
                <GoArrowUp
                  alt="upvote"
                  className="vote-arrow"
                  onClick={() => buttonsDisabled ? null :  upVote(element.post_id)}
                />
              )}
          </div>
          <div className="voteCount">{element.vote_tracker}</div>
          <div>
            {element.downvote === true ? (
              <GoArrowDown
                alt="upvote"
                style={{ maxWidth: 50 }}
                className="vote-arrow voted"
                onClick={() => buttonsDisabled ? null :  deleteVote(element.post_id)}
              />
            ) : (
                <GoArrowDown
                  alt="downvote"
                  className="vote-arrow"
                  onClick={() => buttonsDisabled ? null :  downVote(element.post_id)}
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
