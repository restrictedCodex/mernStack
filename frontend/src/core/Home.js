import React from 'react'
import '../styles.css'

function Home() {
    console.log("API IS", process.env.REACT_APP_BACKEND)
    return (
        <div>
            <h1 className='text-white'>Hello front end</h1>
        </div>
    )
}

export default Home
