// MAIN IMPORTS
import React from 'react';

// ADDONS
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

// OTHER COMPONENTS
import SideNav from './SideNav/sidenav';

// CSS
import style from './header.css';

// COMPONENT
const Header = (props) => {

    const navBars = () => (
        <div>
            <FontAwesome name="bars" style={{ color:'#dfdfdf', padding:'10px', cursor:'pointer' }} onClick={props.onOpenNav}/>
        </div>
    )

    const logo = () => (
        <Link to="/" className={style.logo}>
            <img alt="nba logo" src="/images/nba_logo.png" />
        </Link>
    )

    return(
        <header className={style.header}>
            <SideNav {...props} />
            <div className={style.headerOptions}>
                {navBars()}
                {logo()}
            </div>
        </header>
    )
}

export default Header;
