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
    return (
      <div>
        <div className="voteTracker">
          {/* <button className="upVoteBtn" onClick={() => upVote(element.vote_tracker)}></button> */}
          <div className="voteCount"></div>
          <div className="downVoteBtn"></div>
          {element.post_title}
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