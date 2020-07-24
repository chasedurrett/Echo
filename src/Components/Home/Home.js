import React, { useEffect, useState } from "react";
import "./Home.scss";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import CardPost from "../Post/CardPost/CardPost";
import TopCommunitiesCard from "./TopCommunitiesCard/TopCommunitiesCard";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import HomePostNav from "./HomePostsNav/HomePostNav";

function Home(props) {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.getUser();
    getPosts();
  }, [props.isLoggedIn]);

  const getPosts = () => {
    setLoading(true);
    if (props.isLoggedIn) {
      axios.get("api/subforums/posts/user-feed").then((res) => {
        setPosts(res.data);
        setLoading(false);
        console.log(res.data);
        setButtonsDisabled(false);
      });
    } else if (!props.isLoggedIn) {
      axios.get("/api/subforums/posts/no-user").then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
    }
  };

  const allPostsMap = posts.map((e) => {
    console.log("e being mapped", e);
    return (
      <CardPost
        key={e.post_id}
        buttonsDisabled={buttonsDisabled}
        setButtonsDisabled={setButtonsDisabled}
        getPosts={getPosts}
        post={e}
      />
    );
  });

  return (
    <div className={"home-container"}>
      {/*props.isLoggedIn ? <HomeDashUser /> : <HomeDashNoUser />*/}
      <div className="home-dashboard-container">
        {/*<div className="explore-subforums-container-nu">
          <div className="explore-title"></div>
  </div>*/}
        {loading ? (
          <div
            style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
          >
            <LinearProgress />
          </div>
        ) : null}
        <div className="posts-sidebar-parent-container">
          <div className="subforum-posts-container">
            {loading === true ? null : <HomePostNav />}
            {posts[0] || loading === true ? (
              allPostsMap
            ) : (
              <div className="empty-msg">Join Chambers to fill your feed!!</div>
            )}
          </div>
          <div className="sidebar-container">
            <TopCommunitiesCard />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(Home);
