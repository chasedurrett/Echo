import React, { useState } from 'react';
import './Nav.scss';
// import {FiSearch} from 'react-icons/fi';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdArrowDropDown} from 'react-icons/md';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/reducer';
import axios from 'axios';



  

function Nav (props, { background, hoverBackground, linkColor, logo, navLinks, }) {
    // const [ subforumMenuOpen, setSubforumMenuOpen ] = useState(false)
    // const [ userMenuOpen, setUserMenuOpen ] = useState(false)
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ loginFormOpen, setLoginFormOpen] = useState(false)
    const [ signupFormOpen, setSignupFormOpen] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLoginFormClose = () => {
        setLoginFormOpen(false)
    }
    const handleSignupFormClose = () => {
        setSignupFormOpen(false)
    }

    const logout = () => {
        axios.delete('/auth/logout')
        .then(() => {
            console.log('logout hit')
           props.logoutUser()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <nav className="Nav">

            { loggedIn ? 

            <div className="user-nav">

                <div className="logo-sub-search-cont flex-row">

                    <div className="logo-container">
                        <img src={logo} alt=""/>
                        Echo
                    </div>

                    <div className="subforum-menu-cont">

                    </div>

                    <div className="search-bar-cont">
                        <input type='search'></input>
                    </div>

                </div>
                
                <div className="user-toolbar flex-row">

                    <div className="icons-cont">

                    </div>

                    <div className="user-menu-cont">

                    </div>

                </div>

                

            </div>

                :

            <div className="no-user-toolbar flex-row">

                <div className="logo-search-cont flex-row">

                    <div className="logo-container">
                        <img src={logo} alt=""/>
                        <span>Echo</span>
                    </div>

                    <div className='search-bar-cont'>
                        <input type='search' placeholder="Search"></input>
                    </div>

                </div>

                <div className="login-signup-btns-cont flex-row">
                    <button 
                        onClick={() => {setLoginFormOpen(true)}}
                        className='login-btn btn-style'>LOG IN
                    </button>
                    <button 
                        onClick={() => {setSignupFormOpen(true)}}
                        className='signup-btn btn-style'>SIGN UP
                    </button>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <BsFillPersonFill className='person-icon'/> <MdArrowDropDown className='down-arrow'/>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={() => {handleClose(); logout()}}>Logout</MenuItem>
                    </Menu>
                </div>

            </div>
                
            }

        </nav>

            {loginFormOpen ? <Login handleLoginFormClose={handleLoginFormClose}/> : ''}
            {signupFormOpen ? <Signup handleSignupFormClose={handleSignupFormClose}/> : ''}
        </div>
    )
}

export default connect(null, {logoutUser})(Nav);
