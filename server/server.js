const express = require("express");
const cors = require('cors');
const queryString = require("querystring");
require('dotenv').config();
const axios = require('axios');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8888/callback';

var app = express();

// Prevent CORS error when calling server for refresh token
app.use(cors({
    origin: "http://localhost:3000"
}));

const generateRandomString = (length) => {
    // generate a random string
    let result = '';
    let possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let possibleCharactersLength = possibleCharacters.length;
    for (let i = 0; i < length; i++) {
        result += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharactersLength));
    }
    return result;
}

const stateKey = 'spotify_auth_state';

// Login route to redirect user to spotify
app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email user-top-read user-library-modify';

    const queryParams = queryString.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
})

// After logging in, redirect user to callback route and capture response data
app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        if (response.status === 200) {
    
            const { access_token, refresh_token, expires_in } = response.data;

            const queryParams = queryString.stringify({
                access_token,
                refresh_token,
                expires_in
            })

            // redirect to react app
            res.redirect(`http://localhost:3000?${queryParams}`);

            // pass along tokens in query params
        } else {
            res.redirect(`/?${queryString.stringify({
                error: 'invalid_token'
            })}`);
        }
    })
    .catch(error => {
        res.send(error);
    });
})

// Submit refresh token to spotify for new access token after timeout
app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
})

app.listen(8888);