import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './Error404.css'

const Error404 = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='error-page-container'>
            <div className='error-page-text'>
                <h1 className='error-page-header'>Oops!</h1>
                <p>This is not the page you are looking for!</p>
                <p>Error code: 404</p>
                <p>Move along, move along:</p>
                <Link to='/'>
                    Click here to return to your home feed
                </Link>
            </div>
            <div>
                <img className='error-page-img'
                    src='https://i.pinimg.com/originals/e8/63/92/e863927635dc1c5aba5663e8dd33efa0.jpg'
                    alt='This link is also lost' >
                </img>
            </div>

        </div>
    )
}

export default Error404