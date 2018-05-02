// MAIN IMPORT
import React from 'react';

// ADDONS
import moment from 'moment';

// CSS
import styles from '../articles.css'

// COMPONENT
const PostData = (props) =>{

    const formatDate = (date) => {
        return moment(date).format(' MM-DD-YY');
    }

    return(
        <div className={styles.articlePostData}>
            <div>
                Date: <span>{formatDate(props.data.date)}</span>
            </div>
            <div>
                Author: <span>{props.data.author}</span>
            </div>
        </div>
    )
}

export default PostData;
