import React, { useEffect, useState } from "react";
import upArrow from '../../upvoteArrow.png'
import downArrow from '../../downvoteArrow.png'
import axios from "axios";
import './Subforum.scss'


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
        {element.post_title}
        <div className="voteTracker">
          <img src={upArrow} alt='upvote' className='vote-arrow'/>
          <div className="voteCount">{element.vote_tracker}</div>
          <img src={downArrow} alt='downvote'  className='vote-arrow'/>
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