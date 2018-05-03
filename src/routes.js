import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/layout';

// ROUTE COMPONENTS
import Home from './components/Home/home';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/VideosMain/index';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import SignIn from './components/SignIn/signin';

// COMPONENT
class Routes extends Component {
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={NewsMain} />
                    <Route path="/videos" exact component={VideosMain} />
                    <Route path="/articles/:id" exact component={NewsArticle} />
                    <Route path="/videos/:id" exact component={VideoArticle} />
                    <Route path="/sign-in" exact component={SignIn} />
                </Switch>
            </Layout>
        )
    }
}

export default Routes;
