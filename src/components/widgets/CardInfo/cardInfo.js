import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './cardInfo.css';

const CardInfo = (props) => {

    const teamName = (teamId) => {
        let data = props.teams.find((item) => {
            return item.id === teamId
        });

        if(data){
            return data.name;
        }
    }

    return(
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>
                {teamName(props.teamId)}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {props.date}
            </span>
        </div>
    )
}

export default CardInfo;
