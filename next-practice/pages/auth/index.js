import React from 'react'
import User from '../../components/User'
import axios from 'axios'

const authIndexPage = (props) => {
    console.log('[authIndexPage]', props)
    return (
        <div>
            <h1>The Auth Index Page</h1>
            <User name="Tanay" age="21" />
            <img src={props.message} />
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

authIndexPage.getInitialProps = async (context) => {
    const data = await axios.get('https://dog.ceo/api/breeds/image/random')
    return data.data
}

export default authIndexPage