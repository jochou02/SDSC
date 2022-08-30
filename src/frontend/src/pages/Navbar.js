import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { logDOM } from '@testing-library/react';
//import logo from '../logo.PNG';
import logo from '../icons/trident.png';

import WaitTime from '../buttons/WaitTime'

function Navbar() {
    const [click,setClick] = useState(false);
    const [button,setButton] = useState(true);
    const [dropdown,setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if(window.innerWidth <960){
            setDropdown(false);
        } else{
            setDropdown(true);
        }
    }

    const onMouseLeave = () => {
        if(window.innerWidth <960){
            setDropdown(false);
        } else{
            setDropdown(false);
        }
    }

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        } else{
            setButton(true);
        }
    }

    useEffect(() => {
        showButton()
    }, []);
    window.addEventListener('resize',showButton);
  return (
    <>
        <nav className="navbar">
            <div className ="navbar-container">
                <Link to="/" className = "navbar-logo" onClick={closeMobileMenu}> 
                    UC Socially Undead <img src = {logo} width="70" height="70" className = 'logo'/>
                </Link>
                <div className = 'menu-icon' onClick ={handleClick}>
                    <i className ={click ? 'fas fa-times' : 'fas fa-bars'} />    
                </div>
                <ul className = {click ? 'nav-menu active' : 'nav-menu'}> 
                    <li className = 'nav-item'>
                        <Link to = '/home' className = 'nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>    
                    </li>
                    <li className = 'nav-item'>
                        <Link to = '/courses' className = 'nav-links' onClick={closeMobileMenu}>
                            Courses
                        </Link>    
                    </li>
                    <li className = 'nav-item'>
                        <Link to = '/tutoring' className = 'nav-links' onClick={closeMobileMenu}>
                            Tutoring
                        </Link>    
                    </li>
                    <li className = 'nav-item'>
                        <Link to = '/calendar' className = 'nav-links' onClick={closeMobileMenu}>
                            Calendar
                        </Link>    
                    </li>

                    {/*
                    <li className = 'nav-item'>
                        <Link to = '/wait_time' className = 'nav-links' onClick={closeMobileMenu}>
                            Wait Times
                        </Link>
                    </li>
                    */}

                    <li className = 'nav-item'>
                        <Link to = '/profile' className = 'nav-links' onClick={closeMobileMenu}>
                            Profile
                        </Link>
                    </li>

                    <li className = 'nav-item'><WaitTime /></li>

                    <li className = 'nav-item-dropdown'
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    >
                        <Link to = '/profile-dropdown' className = 'nav-links' onClick={closeMobileMenu}>
                            Profile <i className ='fas fa-caret-down' />
                        </Link>    
                        {dropdown && <Dropdown />}
                    </li>              
                    </ul>     
                    {/* {button && <Button buttonStyle ='btn--outline'> Profile </Button>}                                */}
            </div>
        </nav>
    </>
  )
}

export default Navbar