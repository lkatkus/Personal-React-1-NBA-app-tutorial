// MAIN IMPORTS
import React from 'react';

// OTHER COMPONENTS
import SideNavItems from './sideNav_items';

// ADDONS
import SideNav from 'react-simple-sidenav';

// COMPONENT
const SideNavigation = (props) => {
    return(
        <div>
            <SideNav showNav={props.showNav} onHideNav={props.onHideNav} navStyle={{ background:'#242424', maxWidth:'220px' }}>
                <SideNavItems {...props}/>
            </SideNav>
        </div>
    )
}

export default SideNavigation;
