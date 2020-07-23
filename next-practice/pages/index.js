import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'

class IndexPage extends React.Component {
  
  state = {
    url: ''
  }

  static async getInitialProps(context) {
    console.log('[getInitialProps]')
    // console.log(context)
    
    const data = await axios.get('https://dog.ceo/api/breeds/image/random')
    return data.data
  }

  getNewDog = () => {
    console.log('getNewDog')
    axios.get('https://dog.ceo/api/breeds/image/random').then(response => {
      this.setState({url: response.data.message})
      console.log('success')
    })
  }

  componentDidMount() {
    console.log('component did mount')
    this.getNewDog()
  }

  render() {
    return (
      <div>
        <h1>The Main Page</h1>
        <p>Go to <Link href="/auth"><a>Auth</a></Link> page!</p>
        <button onClick={() => Router.push('/auth')}>Go to Auth From Button</button>
        <img src={this.state.url} />
        <button onClick={this.getNewDog}>Get New Dog</button>
        <style jsx>{`
          img {
            max-width: 400px;
            max-height: 400px;
            display: block;
          }
        `}</style>
      </div>
    )
  }
}

export default IndexPage