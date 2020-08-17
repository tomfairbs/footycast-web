import React from 'react';
import {
    VictoryChart,
    VictoryScatter,
    VictoryAxis,
    VictoryTheme,
} from 'victory';

import { currentRatings } from '../sample-data';
import { TeamSvg } from '../components';
import {
    TEAMS,
    getMinRating,
    getMaxRating,
    sortByRating,
    toRatingDiff
} from '../core';

const Ratings = () => {
    const sortedRatings = currentRatings
        .map(toRatingDiff)
        .sort(sortByRating);

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domain={{
                y: [
                    getMinRating(sortedRatings) - 10,
                    getMaxRating(sortedRatings) + 10,
                ]
            }}
        >
            <VictoryAxis
                dependentAxis
                crossAxis={false}
                tickCount={10}
                style={{ tickLabels: { fontSize: 10 } }}
            />
            <VictoryScatter
                data={sortedRatings}
                dataComponent={<TeamSvg />}
                x="team"
                y="rating"
            />
        </VictoryChart>
    );
};

export default Ratings;
