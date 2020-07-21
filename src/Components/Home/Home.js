import React, { useEffect, useState } from "react";
import "./Home.scss";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import HomeDashUser from "./HomeDashUser/HomeDashUser";
import HomeDashNoUser from "./HomeDashNoUser/HomeDashNoUser";
import axios from 'axios'

function Home(props) {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(props.user){
      axios.get('api/')
    } else if (!props.user){
      
    }
  }, []);

  const upVote = (postId) => {
    setButtonsDisabled(true);
    console.log(`upvoting`);
    axios
      .post(
        `/api/subforums/${props.match.params.subforumId}/posts/${postId}/upvote`
      )
      .then((res) => {
        getPosts();
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
        getPosts();
      });
  };

  const deleteVote = (postId) => {
    setButtonsDisabled(true);
    console.log(`deleting vote`);
    axios
      .delete(
        `/api/subforums/${props.match.params.subforumId}/posts/${postId}/remove-vote`
      )
      .then((res) => {
        getPosts();
      });
  };

  return (
    <div className={"home-container"}>
      {props.isLoggedIn ? <HomeDashUser /> : <HomeDashNoUser />}
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(Home);
