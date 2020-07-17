import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdArrowDropDown } from "react-icons/md";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import "./NavBarSubforumDropdown.scss";

export default function NavBarSubforumDropdown(props) {
  const [subforumsList, setSubforumsList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    getAllSubforums();
  }, []);

  const getAllSubforums = () => {
    axios
      .get("/api/subforums/users")
      .then((res) => {
        if (res.status === 200) {
          setSubforumsList(res.data);
          console.log(res.data);
        } else {
          console.log(`Couldn't recieve list of chambers!`);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const dropDownSubforumsList = subforumsList
    .filter((e) => {
      return e.subforum_name.includes(inputVal);
    })
    .map((e) => (
      <Link
        style={{ textDecoration: "none", fontFamily: "IBM Plex Sans" }}
        to={`/subforums/${e.subforum_id}`}
      >
        <MenuItem
          onClick={handleClose}
          style={{
            height: 40,
            width: 300,
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px black",
          }}
        >
          <div
            className="subforum-preview-img-container"
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
                className="subforum-preview-img"
                src={
                  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"
                }
              ></img>
            ) : (
              <img
                style={{ height: 25, width: 25, borderRadius: 50 }}
                className="subforum-preview-img"
                src={e.subforum_img}
              ></img>
            )}
          </div>
          <div
            className="subforum-preview-link-container"
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
      </Link>
    ));

  return (
    <div className="user-subforums-dropdown-container">
      <Button
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        style={{
          width: 300,
          border: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 80,
          }}
        >
          <div
            className="subforum-preview-img-container"
            style={{
              background: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ height: 25, width: 25, borderRadius: 50 }}
              className="subforum-preview-img"
              src={
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"
              }
            ></img>
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 300,
              fontFamily: "IBM Plex Sans",
              textDecoration: "none",
            }}
          >
            Home
          </div>
        </div>
        <MdArrowDropDown className="down-arrow" />
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  style={{
                    height: 40,
                    width: 300,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <input
                    className="dropdown-input"
                    style={{
                      border: 0,
                      outline: "none",
                      height: 100,
                      width: "100%",
                      borderColor: "#ffffff",
                      boxShadow: "none",
                      fontSize: 15,
                      fontFamily: "IBM Plex Sans",
                    }}
                    value={inputVal}
                    placeholder="Search.."
                    onChange={handleChange}
                  ></input>
                </MenuItem>
                <MenuItem
                  style={{ height: 40, width: 300, backgroundColor: "#ffffff" }}
                  onClick={handleClose}
                >
                  <Link
                    to={`/`}
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      fontFamily: "IBM Plex Sans",
                      textDecoration: "none",
                      color: "#0079d3",
                    }}
                  >
                    <h4>Home Feed</h4>
                  </Link>
                </MenuItem>
                {dropDownSubforumsList}
                <MenuItem
                  onClick={handleClose}
                  style={{
                    height: 40,
                    width: 300,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      fontWeight: 300,
                      fontFamily: "IBM Plex Sans",
                      color: "#0079d3",
                    }}
                    onClick={handleClose}
                    to={`/create-post`}
                  >
                    Create a post
                  </Link>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
