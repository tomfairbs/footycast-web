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
        <div className="chart-example">
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: [32, 0] }}
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
                    style={{ labels: { marginTop: 32 } }}
                    x="team"
                    y="rating"
                />
            </VictoryChart>
        </div>
    );
};

export default Ratings;
