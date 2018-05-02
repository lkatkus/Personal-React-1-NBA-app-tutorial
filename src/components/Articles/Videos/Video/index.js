// MAIN IMPORT
import React,{ Component } from 'react';

// ADDONS
import { firebaseDB, firebaseLooper, firebaseTeams, firebaseVideos } from '../../../../firebase';

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
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();

            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
                this.getRelated();
            })
            .catch((e)=>{
                console.log(e);
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    getRelated = () => {
        
        firebaseTeams.once('value')
        .then((snapshot)=>{
            const teams = firebaseLooper(snapshot);

            firebaseVideos
                .orderByChild('team')
                .equalTo(this.state.article.team)
                .limitToFirst(3)
                .once('value')
                .then((snapshot)=>{
                    const related = firebaseLooper(snapshot);
                    this.setState({
                        teams,
                        related
                    })
                })
        })
        .catch((e)=>{
            console.log(e);
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
