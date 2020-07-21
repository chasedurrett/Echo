import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPost from "../../Post/CardPost/CardPost";
import TopCommunitiesCard from "../TopCommunitiesCard/TopCommunitiesCard";
import "./HomeDashNoUser.css";

const HomeDashNoUser = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    getPosts();
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

  const getPosts = () => {
    axios
      .get("/api/subforums/posts/no-user")
      .then((res) => {
        if (res.status === 200) {
          setAllPosts(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const allPostsMap = allPosts.map((e) => {
    return (
      <CardPost
        upVote={upVote}
        downVote={downVote}
        deleteVote={deleteVote}
        post={e}
      />
    );
  });

  console.log(allPosts);
  // nu === no user
  return (
    <div className="home-dashboard-container">
      <div className="explore-subforums-container-nu">
        <h2>Explore</h2>
        explore chambers -- maybe a carousel of randomly generated posts?
      </div>
      <div className="posts-sidebar-parent-container">
        <div className="subforum-posts-container">{allPostsMap}</div>
        <div className="sidebar-container">
          <TopCommunitiesCard />
        </div>
      </div>
    </div>
  );
};

export default HomeDashNoUser;
