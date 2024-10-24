const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/users.js');

mongoose.set('strictQuery', false); //allows for quering of fields not defined in the schema

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};


app.get("/", (req, res) => {
    res.send("Welcome");
})

//Returns all users in database
app.get("/api/getUsers" , async (req, res) => {
    try{
        const result = await User.find();
        console.log(result)
        res.json({"users": result});
    }catch(e){
        res.status(500).json({error: "e.message"});
    }
});


const start = async () => {
    await connectDB(); // Connect to MongoDB
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};

start();


