// MAIN IMPORTS
import React, { Component } from 'react';

// ADDONS
import { firebaseArticles, firebaseLooper } from '../../../firebase';
import SliderTemplates from './slider_templates';

// COMPONENT
class NewsSlider extends Component {

    state = {
        news:[]
    }

    componentWillMount(){
        
        // QUERY FOR GETTING DATA FROM FIREBASE
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            // PLACEHOLDER FOR NEWS DATA
            const news = firebaseLooper(snapshot);

            // ADDING DATA TO STATE
            this.setState({              
                news
            });
        })
    }

    render(){
        return(
            <div>
                <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            </div>
        )
    }
}

export default NewsSlider;
