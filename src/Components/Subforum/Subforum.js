import React, { useEffect, useState } from "react";
import axios from "axios";
import CardPost from '../Post/CardPost/CardPost'
import "./Subforum.scss";

function Subforum(props) {
  const [posts, setPosts] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false)

  useEffect(() => {
    // console.log(props.match.params);
    getPosts();
  }, [props.match.params.subforumId]);

  const getPosts = () => {
    // setButtonsDisabled(true)
    axios.get(`/api/subforums/${props.match.params.subforumId}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setButtonsDisabled(false)
      });
  };

  console.log(posts)

  return <div className="subforum-container">
    {posts.map(post => (
      <CardPost key={post.post_id}
      post={post}
      getPosts={getPosts}
      setButtonsDisabled={setButtonsDisabled}
      buttonsDisabled={buttonsDisabled}
      />
    ))}
  </div>;
}

export default Subforum;
