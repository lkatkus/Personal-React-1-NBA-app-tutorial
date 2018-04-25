// MAIN IMPORT
import React, { Component } from 'react';

// ADDONS
import axios from 'axios';
import { URL } from '../../../../config';

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
        axios.get(`${URL}/articles?id=${this.props.match.params.id}`).then(response => {
            // SAVE ARTICLE DATA
            let article = response.data[0];

            // GET TEAM DATA
            axios.get(`${URL}/teams?id=${article.team}`).then(response => {
                this.setState({
                    article,
                    team:response.data
                })
            })
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
