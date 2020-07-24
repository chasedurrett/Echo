import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./CreatePost.css";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChooseSubforumDropdown from "./ChooseSubforumDropdown/ChooseSubforumDropdown";
import TextField from "@material-ui/core/TextField";
import ProfileBox from "../ProfileBox/ProfileBox";
import axios from "axios";
import CreateImagePost from "./CreateImagePost/CreateImagePost";

function CreatePost(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [inputVal, setInputVal] = useState({
    post_content: "",
    post_url: "",
  });
  const [post_title, setPostTitle] = useState("");
  const [post_type_id, setPostType] = useState(1);
  const [subforum, setSubforum] = useState({});
  const [img_file, setImgFile] = useState(null);
  const [img_preview, setImgPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Setting up useEffect() to only render on update as opposed to mount and update //
  useEffect(() => {
    getSubforum();
  }, [props.match.params.subforumId]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handlePostType = (n) => {
    setPostType(n);
  };

  const handleTitleInput = (e) => {
    setPostTitle(e.target.value);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const getSubforum = () => {
    const subforumId =
      props.match.params.subforumId === undefined
        ? ""
        : props.match.params.subforumId;
    axios.get(`/api/subforum/${subforumId}`).then((res) => {
      setSubforum(res.data[0]);
    });
  };

  const createPost = () => {
    const { post_content, post_url } = inputVal;

    console.log(post_type_id, post_title, post_content);

    axios
      .post(`/api/subforums/${props.match.params.subforumId}/post`, {
        post_title,
        post_content,
        post_url,
        post_type_id,
      })
      .then((res) => {
        props.history.push(`/subforums/${props.match.params.subforumId}`);
      });
  };

  // Below are the functions for handling an Image post upload and submission

  const handleSubmitFile = async () => {
    setLoading(true);
    if (img_file !== null) {
      let formData = new FormData();
      formData.append("upl", img_file);
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      createImagePost(response.data);
    }
  };

  const createImagePost = async (signedUrl) => {
    const { post_content, post_url } = inputVal;

    console.log(post_type_id, post_title, signedUrl, post_url);

    axios
      .post(`/api/subforums/${props.match.params.subforumId}/post`, {
        post_title,
        signedUrl,
        post_url,
        post_type_id,
      })
      .then((res) => {
        props.history.push(`/subforums/${props.match.params.subforumId}`);
      });
  };

  console.log(post_type_id, post_title);

  return (
    <div className="create-post-container">
      <div className="post-form-container">
        <div className="subforum-dropdown-container">
          <ChooseSubforumDropdown />
        </div>
        <div className="post-form-body">
          <div className={classes.root}>
            <AppBar
              position="static"
              color="default"
              className={classes.tabBar}
            >
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  name="post_type"
                  onClick={() => handlePostType(1)}
                  label="Text"
                  {...a11yProps(0)}
                />
                <Tab
                  name="post_type"
                  onClick={() => handlePostType(2)}
                  label="Image"
                  {...a11yProps(1)}
                />
                <Tab
                  name="post_type"
                  onClick={() => handlePostType(3)}
                  label="Link"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <TabPanel
              className={classes.tabPanel}
              value={value}
              index={0}
              dir={theme.direction}
            >
              <div className="type-1-title-container">
                <TextField
                  className={classes.textArea}
                  onChange={handleTitleInput}
                  id="standard-basic"
                  label="Title"
                />
              </div>
              <div className="type-1-content-container">
                <TextField
                  className={classes.textArea}
                  onChange={handleInput}
                  name="post_content"
                  id="outlined-multiline-static"
                  label="Content"
                  variant="outlined"
                  multiline
                  rows={8}
                />
              </div>
              <div
                className="type-1-submit-button-container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  onClick={() => createPost()}
                  style={{ width: 95 }}
                  className="signup-btn btn-style"
                >
                  Submit
                </button>
              </div>
            </TabPanel>
            <TabPanel
              className={classes.tabPanel}
              value={value}
              index={1}
              dir={theme.direction}
            >
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className="type-1-title-container"
              >
                <TextField
                  className={classes.textArea}
                  onChange={handleTitleInput}
                  id="standard-basic"
                  label="Title"
                />
              </div>
              <CreateImagePost
                setImgPreview={setImgPreview}
                img_preview={img_preview}
                setImgFile={setImgFile}
              />
              <div
                className="submit-button-container"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handleSubmitFile()}
                  style={{ width: 95 }}
                  className="signup-btn btn-style"
                >
                  Submit
                </button>
              </div>
            </TabPanel>
            <TabPanel
              className={classes.tabPanel}
              value={value}
              index={2}
              dir={theme.direction}
            >
              <div className="type-1-title-container">
                <TextField
                  className={classes.textArea}
                  onChange={handleTitleInput}
                  id="standard-basic"
                  label="Title"
                />
              </div>
              <div className="type-1-content-container">
                <TextField
                  className={classes.textArea}
                  onChange={handleInput}
                  name="post_url"
                  id="outlined-multiline-static"
                  label="Url"
                  variant="outlined"
                  multiline
                  rows={8}
                />
              </div>
              <div
                className="type-1-submit-button-container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  onClick={() => createPost()}
                  style={{ width: 95 }}
                  className="signup-btn btn-style"
                >
                  Submit
                </button>
              </div>
            </TabPanel>
          </div>
          <div></div>
        </div>
      </div>
      <div className="post-info-container">
        <ProfileBox
          subforum_banner={subforum.subforum_banner}
          subforum_name={subforum.subforum_name}
          cake_day={subforum.cake_day}
        />
        subforum rules
      </div>
    </div>
  );
}

export default CreatePost;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
    height: 500,
    borderRadius: 8,
    boxShadow: "6px 6px 6px lightgrey",
    indicatorColor: "#0079d3",
    textColor: "#0079d3",
  },
  tabBar: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    boxShadow: "none",
    fontFamily: "IBM Plex Sans",
  },
  tabPanel: {
    display: "flex",
    flexDirection: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  textArea: {
    width: "100%",
  },
  tabs: {
    indicatorColor: "#0079d3",
    textColor: "#0079d3",
  },
}));
