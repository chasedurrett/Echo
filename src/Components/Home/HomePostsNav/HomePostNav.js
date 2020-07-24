import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/reducer";
import { connect } from "react-redux";

function HomePostNav(props) {
  return (
    <div
      className="home-posts-nav"
      style={{
        height: 80,
        width: 650,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingBottom: 5,
        marginTop: 13,
      }}
    >
      <div
        style={{
          width: 650,
          height: 50,
          backgroundColor: "#ffffff",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 30,
            width: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.user.user_image ? (
            <img
              style={{ width: 30, height: 30, borderRadius: 50 }}
              src={props.user.user_image}
            />
          ) : (
            <img
              style={{ width: 30, height: 30, borderRadius: 50 }}
              src={
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"
              }
            />
          )}
        </div>
        <Link to={"/create-post"}>
          <div
            style={{
              height: 30,
              width: 450,
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              id="standard-basic"
              variant="outlined"
              placeholder="Create a post"
              style={{
                height: 25,
                width: "100%",
                borderRadius: 8,
                border: "1px solid grey",
                outline: "none",
                fontSize: 16,
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(HomePostNav);
