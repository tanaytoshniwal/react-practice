import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'
import { Route, NavLink, Switch } from 'react-router-dom'

class Blog extends Component {

    render () {

        return (
            <div className="posts">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact>home</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>new post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:id" exact component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default Blog;