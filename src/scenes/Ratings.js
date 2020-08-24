import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import {
    VictoryChart,
    VictoryScatter,
    VictoryLine,
    VictoryAxis,
    VictoryTheme,
} from 'victory';

import {
    getMinRating,
    getMaxRating,
    sortByRating,
    NOTIONAL_AVG_RATING,
} from '../core';
import { TeamSvg } from '../components';
import { ratingsByRound } from '../sample-data';
import ChartTitle from '../components/ChartTitle';
import ChartDescription from '../components/ChartDescription';

const Wrapper = styled.div`
    max-width: 1200px;
`;

const Filters = styled.div`
    margin-bottom: 32px;
`;

const { rounds } = ratingsByRound;

const roundOptions = rounds.reverse().map(
    ({ round }, i) => ({
        label: `Round ${round}${i === 0 ? ' (current)' : ''}`,
        value: round,
    }),
);

const Ratings = () => {
    const [selectedRound, setSelectedRound] = useState(roundOptions[0]);

    const { ratings: currentRatings } = rounds.find(
        ({ round }) => round === selectedRound.value,
    );

    const sortedRatings = currentRatings.sort(sortByRating);

    return (
        <Wrapper>
            <ChartTitle>Ratings by round</ChartTitle>
            <ChartDescription>
                The average rating is 90. More than 90 is good. Less than 90 is bad!
            </ChartDescription>
            <Filters>
                <ReactSelect
                    value={selectedRound}
                    options={roundOptions}
                    onChange={option => setSelectedRound(option)}
                    styles={{ container: base => ({ ...base, width: 200 }) }}
                />
            </Filters>
            <VictoryChart
                theme={VictoryTheme.material}
                height={160}
                width={240}
                padding={{ top: 4, right: 32, bottom: 32, left: 16 }}
                domain={{
                    y: [
                        getMinRating(sortedRatings) - 10,
                        getMaxRating(sortedRatings) + 10,
                    ],
                    x: [0, 18]
                }}
            >
                <VictoryAxis
                    dependentAxis
                    tickCount={8}
                    style={{ tickLabels: { fontSize: 5 }, ticks: { size: 0 } }}
                />
                <VictoryLine
                    y={() => NOTIONAL_AVG_RATING}
                    style={{ data: { strokeWidth: 0.2 } }}
                />
                <VictoryScatter
                    data={sortedRatings.map(
                        ({ team, rating }, i) => ({ x: i, y: rating, team })
                    )}
                    dataComponent={<TeamSvg />}
                    tickCount={19}
                />
            </VictoryChart>
        </Wrapper>
    );
};

export default Ratings;
