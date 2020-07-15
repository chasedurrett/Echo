import React, { useEffect, useState } from "react";
import axios from "axios";

function Post(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios.get("api/subforums/1/posts").then((res) => {
      setPosts(res.data);
    });
  };

  const mappedPosts = posts.map((element, index) => {
    return (
      <div key={element.post_id}>
        <div className="voteTracker">
          {/* <button className="upVoteBtn" onClick={() => upVote(element.vote_tracker)}></button> */}
          <div className="voteCount"></div>
          <div className="downVoteBtn"></div>
        </div>
      </div>
    );
  });

  return <div>
    {mappedPosts}
  </div>;
}

export default Post;
