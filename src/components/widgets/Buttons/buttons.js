// MAIN IMPORT
import React from 'react';

// ADDONS
import { Link } from 'react-router-dom';

// CSS
import styles from './buttons.css';


const Buttons = (props) => {

    let template = null;

    switch (props.type) {
        case ('loadmore'):
            template = (
                <div className={styles.blue_btn} onClick={props.loadmore}>
                    {props.cta}
                </div>
            );
            break;
        default:
            template = null;
    }

    return template;
}

export default Buttons;
