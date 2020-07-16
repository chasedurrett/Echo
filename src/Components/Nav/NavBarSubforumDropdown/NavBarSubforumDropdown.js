import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function NavBarSubforumDropdown(props) {
  const [subforumsList, setSubforumsList] = useState([]);

  useEffect(() => {
    getAllSubforums();
  }, []);

  const getAllSubforums = () => {
    axios
      .get("/api/subforums/users")
      .then((res) => {
        if (res.status === 200) {
          setSubforumsList(res.data);
        } else {
          console.log(`Couldn't recieve list of chambers!`);
        }
      })
      .catch((err) => console.log(err));
  };

  const mappedSubforumsList = subforumsList.map((e) => {
    return (
      <div className="subforum-preview-card" key={e.subforum_id}>
        <div className="subforum-preview-img-container">
          <img className="subforum-preview-img" src={e.subforum_img}></img>
        </div>
        <div className="subforum-preview-link-container">
          <Link
            className="subforum-preview-link"
            to={{ pathname: `/subforum/${e.subforum_id}` }}
          >
            <h3>c/{e.subforum_name}</h3>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="subforum-dropdown-container">
      {mappedSubforumsList}
    </div>
  );
}
