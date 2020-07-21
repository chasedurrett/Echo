import React from "react";
import "./CardPost.css";

export default function CardPost(props) {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  // pass in props as a whole object 'post', then destructure the needed properties
  const {
    post_id,
    post_title,
    post_content,
    post_url,
    post_type,
    post_time,
    subforum_id,
    subforum_name,
    subforum_img,
    username,
  } = props.post;

  return (
    <div className="card-post-container">
      <div className="card-post-count-container"></div>
      <div className="card-post-body">
        <div className="card-post-header"></div>
        <div className="card-post-content"></div>
        <div className="card-post-footer"></div>
      </div>
    </div>
  );
}
