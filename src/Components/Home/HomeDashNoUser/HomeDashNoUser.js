import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPost from "../../Post/CardPost/CardPost";

const HomeDashNoUser = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

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
    return <CardPost post={e} />;
  });
  return (
    <div className="home-dashboard-container">
      <div className="trending-subforums-container">
        Dash with no user logged in
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      {allPostsMap}
    </div>
  );
};

export default HomeDashNoUser;
