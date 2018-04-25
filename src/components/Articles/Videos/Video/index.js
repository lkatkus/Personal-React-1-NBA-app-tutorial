import React,{ Component } from 'react';
import axios from 'axios';
import {URL} from '../../../../config';

// OTHER COMPONENT
import Header from './header';
import VideosRelated from '../../../widgets/VideoList/VideosRelated/videosRelated';

// CSS
import styles from '../../articles.css';

class VideoArticle extends Component {

    state = {
        article:[],
        team:[],
        teams:[],
        related:[]
    }

    componentWillMount(){
        axios.get(`${URL}/videos?id=${this.props.match.params.id}`).then(response => {
            // SAVE ARTICLE DATA
            let article = response.data[0];

            // GET TEAM DATA
            axios.get(`${URL}/teams?id=${article.team}`).then(response => {
                this.setState({
                    article,
                    team:response.data
                });
            this.getRelated();
            })
        })
    }

    getRelated = () => {
        axios.get(`${URL}/teams`).then(response => {
            let teams = response.data;
            axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`).then(response => {
                this.setState({
                    teams,
                    related:response.data
                })
            });
        })
    }

    render(){

        const article = this.state.article;
        const team = this.state.team;

        return(
            <div>
                <Header
                    teamData={ team[0] }
                    date={ article.date }
                    author={ article.author }
                />

                <div className={styles.videoWrapper}>
                    <h2>{article.title}</h2>

                    <iframe
                        title="videoPlayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    />
                </div>

                <VideosRelated
                    teams={this.state.teams}
                    data={this.state.related}
                />

            </div>
        )
    }
}

export default VideoArticle;
