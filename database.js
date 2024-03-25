const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');


const uri = 'mongodb+srv://vladimirleclere:mango334@cluster0.pjq5yo1.mongodb.net/';


//Signup functionality DB 
async function signup(username, email, password) {

    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    try{
        await client.connect();
        console.log("connected to client MongoDb");

        //Do operations here, like inserting data or quering

        const database = client.db();
        const usersCollection = database.collection('users');

        
        //Need to check if a user already exists:

        const existingUser = await usersCollection.findOne({ email });

        if(existingUser){
            throw new Error("This email is already in use");
        }

        //hash the password 10 salt rounds
        // const hashedPassword = await bcrypt.hash(password, 10);

        // await usersCollection.insertOne({ username, email, password: await bcrypt.hash(password, 10) });


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, 10);


        bcrypt.hash(password, saltRounds)
            .then(result => {
                hashedPassword = result;
                return usersCollection.insertOne({ username, email, password: hashedPassword });
            })
            .catch(error => {
                console.error("Error hashig the passwords", error);
            });


        //await usersCollection.insertOne({ username, email,  password: hashedPassword });
        console.log("User Signed Up successfully"); 
        }
        catch (error) {
            console.error("Error signing up:", error);
        }
        finally {
            await client.close();
            console.log("Disconnected from MongoDB");
        } 
}
        // //listing all collections in database
        // const collections = await database.listCollections().toArray();
        // console.log("Collections:", collections);

       
//Login Functionality

async function login(email, password){

    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    try{

        await client.connect();
        console.log("connect to MongoDB Login");

        const database = client.db(); 
        const usersCollection = database.collection('users');

    //Searching user by email

    const user = await usersCollection.findOne({email});

    if(!user){
        throw new Error("User not found by email");
    }

    //Password Match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        throw new Error("Incorrect password");
    }

    console.log("User login successful");
} catch (error) {
    console.log("Error Logging in:", error);}

    finally{
        await client.close();
        console.log("disconnecting from MongoDB");
    }
}

module.exports = {signup, login};