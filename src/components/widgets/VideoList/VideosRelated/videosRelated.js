import React from 'react';

import VideosListTemplate from '../videosTemplate';

import styles from '../videosList.css';

const VideosRelated = (props) => {
    return(
        <div className={styles.relatedWrapper}>
            <VideosListTemplate
                data={props.data}
                teams={props.teams}
            />
        </div>
    )
}

export default VideosRelated;
