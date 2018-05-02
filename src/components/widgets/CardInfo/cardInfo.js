// MAIN IMPORT
import React from 'react';

// ADDONS
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

// CSS
import styles from './cardInfo.css';

const CardInfo = (props) => {

    const teamName = (teamId) => {
        let data = props.teams.find((item) => {
            return item.teamId === teamId
        });

        if(data){
            return data.name;
        }
    }

    const formatDate = (date) => {
        return moment(date).format(' MM-DD-YY');
    }

    return(
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>
                {teamName(props.teamId)}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {formatDate(props.date)}
            </span>
        </div>
    )
}

export default CardInfo;
