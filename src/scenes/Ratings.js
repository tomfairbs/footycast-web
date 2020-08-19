import React from 'react';
import styled from 'styled-components';
import {
    VictoryChart,
    VictoryScatter,
    VictoryAxis,
    VictoryTheme,
} from 'victory';

import {
    getMinRating,
    getMaxRating,
    sortByRating,
    toRatingDiff
} from '../core';
import { TeamSvg } from '../components';
import { currentRatings } from '../sample-data';

const Wrapper = styled.div`
    max-width: 1200px;
`;

const Ratings = () => {
    const sortedRatings = currentRatings
        .map(toRatingDiff)
        .sort(sortByRating);

    return (
        <Wrapper>
            <VictoryChart
                theme={VictoryTheme.material}
                height={160}
                width={240}
                padding={{ right: 32, bottom: 32, left: 32 }}
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
                    style={{
                        tickLabels: { fontSize: 6 }
                    }}
                />
                <VictoryScatter
                    data={sortedRatings}
                    dataComponent={<TeamSvg />}
                    x="team"
                    y="rating"
                />
            </VictoryChart>
        </Wrapper>
    );
};

export default Ratings;
