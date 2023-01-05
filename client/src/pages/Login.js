import React from "react";
import  '../styles/Login.css';

const Login = () => {
    return (
        <div className="loginContainer">
            <h1 className="title">Spotify Dashboard</h1>
            <h3 className="description">
                Learn about your current music trends with top artists, songs and more.
                <br></br>
                Browse personalized song recommendations and discover new music.
            </h3>
            <a className="loginButton" href='http://localhost:8888/login'>Login with Spotify</a>
        </div>
    );
}

export default Login;