import React, { useState } from "react";
import "./Nav.scss";
// import {FiSearch} from 'react-icons/fi';
import { BsPencilSquare } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import NavBarSubforumDropdown from "./NavBarSubforumDropdown/NavBarSubforumDropdown";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/reducer";
import axios from "axios";

function Nav(
  props,
  { background, hoverBackground, linkColor, logo, navLinks }
) {
  // const [ subforumMenuOpen, setSubforumMenuOpen ] = useState(false)
  // const [ userMenuOpen, setUserMenuOpen ] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [signupFormOpen, setSignupFormOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginFormClose = () => {
    setLoginFormOpen(false);
  };
  const handleSignupFormClose = () => {
    setSignupFormOpen(false);
  };

  const history = useHistory();
  const location = useLocation();
  const { params } = useParams();
  
  const handleSearch = (e) => {
    if(e.key === 'Enter' && location.pathname != '/search'){
      history.push({
        pathname: '/search/',
        search: `input=${searchInput}`
      })
    } else if (e.key === 'Enter' && location.pathname === '/search'){
      const searchParam = searchInput
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const logout = () => {
    axios
      .delete("/auth/logout")
      .then(() => {
        console.log("logout hit");
        props.logoutUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className="Nav">
        <div className="no-user-toolbar flex-row">
          <div className="logo-search-cont flex-row">
            <div className="logo-container flex-row">
            <img
              style={{ height: 30, width: 30, borderRadius: 50, marginRight: 10 }}
              className="subforum-preview-img"
               src={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnetdna.webdesignerdepot.com%2Fuploads%2F2013%2F07%2Fecho.gif&f=1&nofb=1"}
            />
              <span style={{fontWeight: 'bold'}}>Echo</span>
            </div>

            <div className='subforum-dropdown'>
              {props.isLoggedIn ? (
                <div>
                 <NavBarSubforumDropdown/>
                </div>
              ) : null}
            </div>

            <div className="search-bar-cont">
              <input type="search" placeholder="Search" onKeyPress={handleSearch} onChange={handleChange}></input>
            </div>
          </div>

          <div className="nav-btns-cont flex-row">
            {props.isLoggedIn ? (
              <div className="nav-icons-cont flex-row">
                <BsChatDotsFill className="nav-icon" />
                <BsPencilSquare className="nav-icon" />
              </div>
            ) : (
              <div className="login-signup-btns-cont flex-row">
                <button
                  onClick={() => {
                    setLoginFormOpen(true);
                  }}
                  className="login-btn btn-style"
                >
                  LOG IN
                </button>
                <button
                  onClick={() => {
                    setSignupFormOpen(true);
                  }}
                  className="signup-btn btn-style"
                >
                  SIGN UP
                </button>
              </div>
            )}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <BsFillPersonFill className="person-icon" />{" "}
              <MdArrowDropDown className="down-arrow" />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
               <MenuItem onClick={handleClose}>
                <Link to={`/`} className="profile-menu-link">
                  Home
                </Link>
              </MenuItem>
              {props.isLoggedIn ? 
              <span>
                <MenuItem onClick={handleClose}>
                <Link
                    to={`/users/${props.user.user_id}`}
                    className="profile-menu-link"
                  >
                    Profile
                  </Link> 
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
                </span>
              : '' }
            </Menu>
          </div>
        </div>
      </nav>
      {loginFormOpen ? (
        <Login handleLoginFormClose={handleLoginFormClose} />
      ) : (
        ""
      )}
      {signupFormOpen ? (
        <Signup handleSignupFormClose={handleSignupFormClose} />
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutUser })(Nav);
