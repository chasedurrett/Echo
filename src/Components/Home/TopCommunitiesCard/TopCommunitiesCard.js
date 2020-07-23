import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TopCommunitiesCard.css";

const TopCommunitiesCard = () => {
  const [topCommunties, setTopCommunities] = useState([]);

  useEffect(() => {
    getTopCommunties();
  }, []);

  const getTopCommunties = () => {
    axios.get("/api/subforums/").then((res) => {
      if (res.status === 200) {
        setTopCommunities(res.data);
      }
    });
  };

  const topCommuntiesMap = topCommunties.map((e) => {
    return (
      <Link
        className="card-link"
        key={e.subforum_id}
        to={`/subforums/${e.subforum_id}`}
      >
        <div className="top-communities-list-card">
          <div className="top-communities-card-img-container">
            <img
              className="top-communities-card-img"
              style={{ height: 25, width: 25, borderRadius: 50 }}
              src={
                e.subforum_img === null
                  ? require("../../Post/CardPost/echo_chamber_icon_2.png")
                  : e.subforum_img
              }
            />
          </div>
          <div className="top-communities-card-name-container">
            <div className="top-communities-card-name">
              <h5>c/{e.subforum_name}</h5>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="top-communities-card-container">
      <div className="top-communities-banner">
        <h4>Top Chambers</h4>
      </div>
      <div className="list-card-container">{topCommuntiesMap}</div>
    </div>
  );
};

export default TopCommunitiesCard;
