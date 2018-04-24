import React, { Component } from 'react';
import axios from 'axios';

import styles from './videosList.css';
import {URL} from '../../../config';
import Button from '../Buttons/buttons';

class VideosList extends Component {

    state = {
        teams:[],
        videos:[],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    render(){
        return(
            <div>
                videoz
            </div>
        )
    }
}

export default VideosList;
