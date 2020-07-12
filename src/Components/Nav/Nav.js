import React, { useState } from 'react';
import './Nav.scss';

function Nav ({ background, hoverBackground, linkColor, logo, navLinks }) {
    // const [ subforumMenuOpen, setSubforumMenuOpen ] = useState(false)
    // const [ userMenuOpen, setUserMenuOpen ] = useState(false)
    const [ loggedIn, setLoggedIn ] = useState(false)

    console.log(background, hoverBackground, linkColor, logo, navLinks)



    return (
        <nav className="Nav">

            { loggedIn ? 

            <div className="user-nav">

                <div className="logo-sub-search-cont">

                    <div className="logo-container">
                        <img src={logo} alt=""/>
                    </div>

                    <div className="subforum-menu-cont">
                
                    </div>

                    <div className="user-search-cont">

                    </div>

                </div>
                
                <div className="user-toolbar">

                    <div className="icons-cont">

                    </div>

                    <div className="user-menu-cont">

                    </div>

                </div>

                

            </div>

                :

            <div className="no-user-toolbar">

                <div className="logo-search-cont">

                    <div className="logo-container">
                        <img src={logo} alt=""/>
                    </div>

                </div>

                <div className="login-signup-btns-cont">
                    <button>Log In</button>
                    <button>Signup</button>
                </div>

            </div>
                
            }

        </nav>
    )
}

export default Nav