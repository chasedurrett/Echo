import React, { useState } from 'react';
import './Nav.scss';
import {FiSearch} from 'react-icons/fi';

function Nav ({ background, hoverBackground, linkColor, logo, navLinks }) {
    // const [ subforumMenuOpen, setSubforumMenuOpen ] = useState(false)
    // const [ userMenuOpen, setUserMenuOpen ] = useState(false)
    const [ loggedIn, setLoggedIn ] = useState(false)

    console.log(background, hoverBackground, linkColor, logo, navLinks)



    return (
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
                        <input type='search' placeholder=""></input>
                    </div>

                </div>

                <div className="login-signup-btns-cont flex-row">
                    <button className='login-btn btn-style'>LOG IN</button>
                    <button className='signup-btn btn-style'>SIGN UP</button>
                </div>

            </div>
                
            }

        </nav>
    )
}

export default Nav