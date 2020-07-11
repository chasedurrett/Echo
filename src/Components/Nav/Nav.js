import React, { useState } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';

function Nav ({ background, hoverBackground, linkColor, logo, navLinks }) {
    // const { subOpen, setSubOpen } = useState(false)
    // const { accountOpen, setAccountOpen } = useState(false)

    console.log(background, hoverBackground, linkColor, logo, navLinks)

    return (
        <nav className="Nav" style={( background )}>


        </nav>
    )
}

export default Nav