import React, { useEffect, useState } from 'react'
import './Leaderboard.css';
import axios from 'axios'

const Leaderboard = () => {

    const [scores, setScores] = useState([]);


    useEffect(() => {
        const fetchScores = async () => {
            const result = await axios.get('http://localhost:3001/api/getScores');
            
            //sorts the scores
            const sortedScores = result.data.scores.sort((a, b) => b.score - a.score);
            setScores(sortedScores);
        };
        fetchScores();
    }, [])


    return (
        <div className="leaderboard-container">

            <h1>Leaderboard</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((player, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{player.playerName}</td>
                        <td>{player.score}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard