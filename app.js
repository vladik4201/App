const express = require('express');
const app = express();
const port = 3006;


//Here you are defining your routes with app.get
app.get('/', (req, res) => { //when requests comes to root path (/) , call back function is called
    res.send("Main Page"); //res.send function in Express.js terminate the response once called
});

//Another route located in //localhost:3005/suh
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

//located in localhost:3005/Heyg

app.get('/about', (req, res) => {
    res.send("About Us Page");
});

// app.get('/auth', (req, rest) => {
//     res.send("")
// })

app.listen(port, () => {
    console.log('server is running at http://localhost:${port}');
});
