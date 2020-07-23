import React, { Component } from 'react'
import Post from '../../../components/Post/Post'
import axios from 'axios'
import './Posts.css'
import { Link } from 'react-router-dom'

export class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            let posts = response.data.slice(0, 4)
            posts = posts.map(post => {
                return { ...post, author: 'Tony' }
            })
            this.setState({
                posts: posts
            })
        }).catch(err => console.log(err))
    }

    selectPost = (id) => {
        this.setState({
            selectedPostId: id
        })
    }

    render() {

        const posts = this.state.posts.map(post => {
            return (
                <Link to={'/' + post.id} key={post.id}>
                    <Post
                        title={post.title}
                        author={post.author}
                        select={() => this.selectPost(post.id)} />
                </Link>
            )
        })

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts
