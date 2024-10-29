const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
const Score = require('./models/scores');

mongoose.set('strictQuery', false); //allows for quering of fields not defined in the schema

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())


/*Start method that connects Nodejs backend to the mongodb Database*/
const start = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

start();






app.get("/test", (req, res) => {
    res.json(score);
});

//Returns all scores in database
app.get("/api/getScores" , async (req, res) => {
   
    try{
        const result = await Score.find(); //Gets all data with no filter from scores collection
        console.log(result);
        res.json({"scores": result});
    }catch(e){
        res.status(500).json({error: e.message});
    }
});

//Adds user and the scores to database
app.post("/addScores", async (req, res) => {
    console.log(req.body)
    try{
        const score = new Score(req.body);
        await score.save() //await needed so we can see if there is a name and score given if not throw error
        res.status(201).json({score}) //shorthand for score: score
    }catch(e){
        res.status(500).json({error: e.message});
    }
});




