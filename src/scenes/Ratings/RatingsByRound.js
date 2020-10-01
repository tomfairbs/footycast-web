import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import {
    VictoryChart,
    VictoryScatter,
    VictoryLine,
    VictoryAxis,
    VictoryTheme,
    VictoryLabel,
} from 'victory';

import {
    getMinRating,
    getMaxRating,
    sortByRating,
    getRoundLabel,
    NOTIONAL_AVG_RATING,
} from '../../core';
import { ChartDescription, ChartTitle, TeamSvg } from '../../components';
import { ratingsByRound } from '../../sample-data';

const Filters = styled.div`
    margin-bottom: 64px;
`;

const { rounds } = ratingsByRound;

const roundOptions = rounds.reverse().map(
    ({ round }, i) => ({
        label: getRoundLabel(round, i),
        value: round,
    }),
);

export default function RatingsByRound() {
    const [selectedRound, setSelectedRound] = useState(roundOptions[0]);

    const sortedRatings = rounds.find(
        ({ round }) => round === selectedRound.value,
    ).ratings.sort(sortByRating);

    return (
        <>
            <ChartTitle>Ratings by round</ChartTitle>
            <ChartDescription>
                Ratings are calculated prior to the start of the selected round.
            </ChartDescription>
            <Filters>
                <ReactSelect
                    value={selectedRound}
                    options={roundOptions}
                    onChange={option => setSelectedRound(option)}
                    styles={{
                        container: base => ({ ...base, width: 200 }),
                        menu: base => ({
                            ...base,
                            zIndex: 100,
                        })
                    }}
                />
            </Filters>
            <VictoryChart
                theme={VictoryTheme.material}
                height={160}
                width={240}
                padding={{ top: 4, right: 32, bottom: 16, left: 20 }}
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
                    tickCount={10}
                    label="Rating"
                    axisLabelComponent={(
                        <VictoryLabel
                            renderInPortal
                            x={6}
                            y={0}
                        />
                    )}
                    style={{
                        axisLabel: { fill: '#666666', fontSize: 4, fontWeight: 600, angle: 0 },
                        tickLabels: { fontSize: 5 },
                        ticks: { size: 0 }
                    }}
                />
                <VictoryLine
                    y={() => NOTIONAL_AVG_RATING}
                    style={{ data: { strokeWidth: 0.5 } }}
                />
                <VictoryScatter
                    data={sortedRatings.map(
                        ({ team, rating }, i) => ({ x: i, y: rating, team })
                    )}
                    dataComponent={<TeamSvg />}
                    tickCount={19}
                />
            </VictoryChart>
        </>
    );
}
