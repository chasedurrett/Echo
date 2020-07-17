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
  }, [props.match.params.subforumId]);

  const getPosts = () => {
    axios.get(`/api/subforums/${props.match.params.subforumId}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
  };

  const upVote = (postId) => {
    console.log(`upvoting`);
    axios.post(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/upvote`)
      .then(res => {
        console.log(res.data.vote_tracker)
        console.log(posts)
        setPosts(posts.map(element => {
          if (element.post_id === postId) {
            element.vote_tracker = res.data.vote_tracker
          }
          return element
        }
        ))
      })
      .catch(err => console.log(err))
      ;
  };

  const downVote = (postId) => {
    console.log(`downvoting`);
    axios.post(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/downvote`)
      .then(res => {
        setPosts(posts.map(element => {
          if (element.post_id === postId) {
            element.vote_tracker = res.data.vote_tracker
          }
          return element
        }
        ))
      });
  };

  const deleteVote = (postId) => {
    console.log(`deleting vote`);
    axios.delete(`/api/subforums/${props.match.params.subforumId}/posts/${postId}/remove-vote`)
      .then(res => {
        setPosts(posts.map(element => {
          if (element.post_id === postId) {
            element.vote_tracker = res.data.vote_tracker
          }
          return element
        }
        ))
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
