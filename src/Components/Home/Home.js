import React, { useEffect, useState } from "react";
import "./Home.scss";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import CardPost from "../Post/CardPost/CardPost";
import TopCommunitiesCard from "./TopCommunitiesCard/TopCommunitiesCard";
import axios from "axios";

function Home(props) {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    props.getUser()
    getPosts();
  }, [props.isLoggedIn]);

  const getPosts = () => {
    if (props.isLoggedIn) {
      axios.get("api/subforums/posts/user-feed").then((res) => {
        setPosts(res.data);
        setButtonsDisabled(false)
      });
    } else if (!props.isLoggedIn) {
      axios.get("/api/subforums/posts/no-user").then((res) => {
        setPosts(res.data);
      });
    }
  };

  const allPostsMap = posts.map((e) => {
    console.log('e being mapped', e)
    return (
      <CardPost key={e.post_id}
        buttonsDisabled={buttonsDisabled}
        setButtonsDisabled={setButtonsDisabled}
        getPosts={getPosts}
        post={e}
      />
    );
  });


  console.log(buttonsDisabled)

  return (
    <div className={"home-container"}>
      {/*props.isLoggedIn ? <HomeDashUser /> : <HomeDashNoUser />*/}
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
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(Home);
