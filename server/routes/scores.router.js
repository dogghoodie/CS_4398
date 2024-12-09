const express = require('express');

const scoresRouter = express.Router();
const scoresController = require('../controller/scores.controller');

scoresRouter.get('/getScores', scoresController.getScores);
scoresRouter.post('/addScores', scoresController.addScore);

module.exports = scoresRouter;