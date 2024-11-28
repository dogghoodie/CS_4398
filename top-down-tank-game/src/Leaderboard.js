import React, { useEffect, useState } from 'react'
import './Leaderboard.css';
import axios from 'axios'

//Need to prompt the player an input with username and the score will automatically be placed in the score field then you press the submit button which will send a post request to the database

const Leaderboard = () => {

    const [scores, setScores] = useState([]);

    //Retrieves scores
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

const renderLeaderboard = () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        React.render(<Leaderboard />, rootElement);
    } else {
        console.error('Root element not found');
    }
};

// Call the render function when the script loads
window.onload = renderLeaderboard;