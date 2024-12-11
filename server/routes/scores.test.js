const request = require('supertest');
const app = require('../server'); 

describe('GET /getScores', () => {
    it('should return a list of scores', async () => {
        const response = await request(app).get('/getScores');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); 
    });
});


describe('POST /addScores', () => {
    it('should add a score and return the added score', async () => {
        const newScore = { 
            playerName: 'Michael',
            score: 100 
        }; 
        const response = await request(app)
            .post('/addScores')
            .send(newScore)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201); 
        expect(response.body).toHaveProperty('score', newScore); 
    });
});