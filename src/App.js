import React from 'react';
import { VictoryScatter } from 'victory';
import './App.css';

import * as sampleData from './sample-data';
import { TeamLogo } from './components';
import { TEAMS } from './core';

const App = () => {
    const {
        currentRatings,
        predictionFixture,
        ratingsByRound,
        rounds,
    } = sampleData;

    const sortedRatings = currentRatings
        .map(
            ({ team, rating }) => ({ team, rating: rating - 90 })
        )
        .sort(
            (a, b) => a.rating > b.rating ? -1 : 1,
        );

    return (
        <div className="App">
            <div className="chart-example">
                <VictoryScatter
                    horizontal
                    data={sortedRatings}
                    maxDomain={{ y: 50 }}
                    labels={({ datum }) => datum.team}
                    x="team"
                    y="rating"
                />
                {Object.values(TEAMS).map(
                    team => <TeamLogo team={team} />
                )}
            </div>
        </div>
    );
}

export default App;
