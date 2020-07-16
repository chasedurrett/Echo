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
import "./NavBarSubforumDropdown.css";

export default function NavBarSubforumDropdown(props) {
  const [subforumsList, setSubforumsList] = useState([]);
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
        Home
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
                style={{ borderRadius: 15 }}
              >
                {subforumsList.map((e) => (
                  <MenuItem
                    key={e.subforum_id}
                    onClick={handleClose}
                    style={{
                      height: 40,
                      width: 300,
                      backgroundColor: "#ffffff",
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
                      {/* this link is for testing, needs to be e.subforum_img */}
                      <img
                        style={{ height: 30, width: 30, borderRadius: 50 }}
                        className="subforum-preview-img"
                        src={
                          "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"
                        }
                      ></img>
                    </div>
                    <div
                      className="subforum-preview-link-container"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          marginLeft: 35,
                        }}
                        className="subforum-preview-link"
                        to={{ pathname: `/subforum/${e.subforum_id}` }}
                      >
                        <h3>c/{e.subforum_name}</h3>
                      </Link>
                    </div>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={handleClose}
                  style={{
                    height: 40,
                    width: 300,
                    backgroundColor: "#ffffff",
                  }}
                >
                  Create a chamber
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
