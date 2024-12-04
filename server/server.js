const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');


const scoresRouter = require('./routes/scores.router')

mongoose.set('strictQuery', false); //allows for quering of fields not defined in the schema


dotenv.config();

const app = express();
const port = 3001;

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

app.use(cors());
app.use(express.json());

app.use('/api', scoresRouter);








