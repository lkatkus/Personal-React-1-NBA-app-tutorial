// MAIN IMPORTS
import React from 'react';

import { CURRENT_YEAR } from '../../config';

// ADDONS
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

// CSS
import styles from './footer.css';

// COMPONENT
const Footer = () => {
    return(
        <div className={styles.footer}>
            <Link to="/" className={styles.logo}>
                <img alt="nba logo" src="/images/nba_logo.png" />
            </Link>
            <div className={styles.right}>
                @NBA { CURRENT_YEAR } All rights reserved.
            </div>
        </div>
    )
}

export default Footer;
