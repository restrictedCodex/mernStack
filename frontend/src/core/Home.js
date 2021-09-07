import React from 'react'
import '../styles.css'
import Base from './Base'

function Home() {
    console.log("API IS", process.env.REACT_APP_BACKEND)
    return (
        <Base title="Home Page" description='Welcome to the T-shirt store!!'>
            <h1 className='text-white'>Hello front end</h1>
        </Base>
    )
}

export default Home
