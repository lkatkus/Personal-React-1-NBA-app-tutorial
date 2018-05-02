// MAIN IMPORT
import React, { Component } from 'react';

// ADDONS
import { firebaseDB, firebaseLooper, firebaseTeams } from '../../../../firebase';

// OTHER COMPONENT
import Header from './header';

// CSS
import styles from '../../articles.css';

// COMPONENT
class NewsArticles extends Component {

    state = {
        article:[],
        team:[]
    }

    componentWillMount(){
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();

            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
            })
            .catch((e)=>{
                console.log(e);
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
            <div className={styles.article_wrapper}>
                <Header
                    teamData={ team[0] }
                    date={ article.date }
                    author={ article.author }
                />

            <div className={styles.articleBody}>
                <h2>{article.title}</h2>
                <div className={styles.articleImage} style={{background:`url('/images/articles/${article.image}')`}}></div>
                <div className={styles.articleText}> {article.body} </div>
            </div>

            </div>
        )
    }
}

export default NewsArticles;
