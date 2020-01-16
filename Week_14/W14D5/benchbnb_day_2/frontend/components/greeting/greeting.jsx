import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = (props) => {
    const display = (props.currentUser) ? (
        <div>
            <p>Greetings {props.currentUser.username}</p>
            <button onClick={props.logout}>Logout</button>
        </div>
    ) : ( 
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
        </div>
    )
    return display;
}

export default Greeting;