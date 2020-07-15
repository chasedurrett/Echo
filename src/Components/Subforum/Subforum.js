import React, { useEffect, useState } from "react";
import axios from "axios";

function Subforum(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      console.log(props.match.params)
    getPosts();
  }, []);

  const getPosts = () => {
    axios.get(`/api/subforums/${props.match.params.subforumId}/posts`)
    .then(res => {
        console.log(res.data)
      setPosts(res.data);
    });
  };

  const upVote = () => {
      axios.put()
  }

  console.log(posts)

  const mappedPosts = posts.map((element, index) => {
      axios.get()
      .then()


    return (
      <div>
        {element.post_title}
        <div className="voteTracker">
          <button className="upVoteBtn" onClick={() => upVote(element.vote_tracker)}>upvote</button>
          <div className="voteCount">{element.vote_tracker}</div>
          <button className="downVoteBtn">downvote</button>
        </div>
      </div>
    );
});

return (
    <div>
        {mappedPosts}
    </div>
  )
}

export default Subforum;