import React, { useState, useEffect } from "react";
import { getCurrentSubforum } from "../../../redux/reducer";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { MdArrowDropDown } from "react-icons/md";
import {withRouter} from 'react-router-dom'

function ChooseSubforumDropdown(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [allSubforums, setAllSubforums] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [subforumPick, setSubforumPick] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getSubforums();
  }, []);

  const getSubforums = () => {
    axios.get("/api/subforums").then((res) => {
      setAllSubforums(res.data);
    });
  };

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubforumClick = (subforum) => {
    setSubforumPick(subforum);
    // console.log(subforum)
    handleClose();
    props.getCurrentSubforum(subforum);
    props.history.push(`/create-post/${subforum.subforum_id}`)
  };

  const subforumsList = allSubforums
    .filter((e) => e.subforum_name.includes(inputVal))
    .map((e) => {
      return (
        <MenuItem key={e.subforum_id} onClick={() => handleSubforumClick(e)}>
          <div
            style={{
              background: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {e.subforum_img === null ? (
              <img
                style={{ height: 25, width: 25, borderRadius: 50 }}
                src={
                  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"
                }
              ></img>
            ) : (
              <img
                style={{ height: 25, width: 25, borderRadius: 50 }}
                src={e.subforum_img}
              ></img>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 300,
                fontFamily: "IBM Plex Sans",
                textDecoration: "none",
                color: "black",
                marginLeft: 15,
              }}
            >
              c/{e.subforum_name}
            </h3>
          </div>
        </MenuItem>
      );
    });

  return (
    <div style={{zIndex: 2}}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        className={classes.button}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: 30,
              display: "flex",
              width: 25,
              alignItems: "center",
            }}
          >
            {subforumPick.subforum_img === null || subforumPick.length === 0 ? (
              <img
                style={{ height: 25, width: 25, borderRadius: 50 }}
                src={
                  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"
                }
              ></img>
            ) : (
              <img
                style={{ height: 25, width: 25, borderRadius: 50 }}
                src={subforumPick.subforum_img}
              ></img>
            )}
          </div>
          <div
            style={{
              height: 30,
              display: "flex",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            {subforumPick.length === 0
              ? "Pick a chamber"
              : `c/${subforumPick.subforum_name}`}
          </div>
        </div>
        <MdArrowDropDown className="down-arrow" />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <input
            className="dropdown-input"
            style={{
              border: 0,
              outline: "none",
              height: "100%",
              width: "100%",
              borderColor: "none",
              boxShadow: "none",
              fontSize: 15,
              fontFamily: "IBM Plex Sans",
            }}
            value={inputVal}
            placeholder="Search.."
            onChange={handleChange}
          ></input>
        </MenuItem>
        {subforumsList}
      </StyledMenu>
    </div>
  );
}

export default withRouter(connect(null, { getCurrentSubforum })(ChooseSubforumDropdown));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    width: 250,
    fontFamily: "IBM Plex Sans",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.background.paper,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    width: 250,
    fontFamily: "IBM Plex Sans",
    textTransform: "initial",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
