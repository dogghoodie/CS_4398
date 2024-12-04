const Score = require('../models/scores');

async function getScores(req, res){
    try{
        const result = await Score.find(); //Gets all data with no filter from scores collection
        console.log(result);
        res.json({"scores": result});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

async function addScore(req, res){
    try{
        const score = new Score(req.body);
        await score.save() //await needed so we can see if there is a name and score given if not throw error
        res.status(201).json({score}) //shorthand for score: score
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    getScores,
    addScore,
}