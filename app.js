//In app.js we mainly handle the routes

const express = require('express');
const app = express();
const port = 3007;
const path = require('path');

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

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

// app.get('/auth', (req, rest) => {
//     res.send("")
// })

  

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
