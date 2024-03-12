//Creating a server for handling user data; 

const express = require('express');
const bodyParser = require('body-parser'); //middleware body for POST requests, can parse JSON and URL-encoded data.
const fs = require('fs');

const app = express();
const port = 3007;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

