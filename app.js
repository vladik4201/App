//In app.js we mainly handle the routes

const express = require('express');
const app = express();
const port = 3007;
const path = require('path');
const database = require('./database');
//const password = require('password');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Set up static file serving middleware
// This line tells Express to serve static files from the directory where the current module (app.js) is located

app.use(express.static(path.join(__dirname)));


//Here you are defining your routes with app.get
app.get('/', (req, res) => { //when requests comes to root path (/) , call back function is called
    res.sendFile(__dirname + '/main.html'); //res.send function in Express.js terminate the response once called
});

//Another route located in //localhost:3007/login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

//Route to handle login requests
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //Now call 
        await database.login(email, password);
        res.status(200).json({message: "Login Successful"});
    }
    catch (error) {
        console.log("Error whilst logging in: ", error);
        res.status(500).json({error: "Internal error"});
    }    
});


app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});


//Route for handling signup requests

app.post('/signup', async (req, res) => {
    try{
        const {username, email, password} = req.body; 
        await database.signup(username, email, password);
        res.status(201).json({message: "User signed up sucessfully"});
    }
    catch (error){
        console.log("Error occured during sign up:", error);
        res.status(500).json({error: "Internal signup error"});
    }
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});



