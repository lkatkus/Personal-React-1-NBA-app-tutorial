import React from 'react';
import styles from '../articles.css';

const TeamInfo = (props) => {
    return(
        <div className={styles.articleTeamHeader}>
            <div className={styles.left} style={{ background:`url('/images/teams/${props.teamData.logo}')`}}></div>

            <div className={styles.right}>
                <div>
                    <span>{props.teamData.city} {props.teamData.name}</span>
                </div>
                <div>
                    <strong>W{props.teamData.stats[0].wins}-L{props.teamData.stats[0].defeats}</strong>
                </div>
            </div>
        </div>
    )
}

export default TeamInfo;
