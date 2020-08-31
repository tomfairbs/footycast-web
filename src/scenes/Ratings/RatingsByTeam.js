import React, { useState } from 'react';
import styled from 'styled-components';
import {
    VictoryChart,
    VictoryLine,
    VictoryAxis,
    VictoryTheme,
    VictoryVoronoiContainer,
    VictoryLabel,
} from 'victory';

import {
    getMinRating,
    getMaxRating,
    NOTIONAL_AVG_RATING,
    TEAMS,
    TEAM_COLORS
} from '../../core';
import { ChartDescription, ChartTitle, TeamLogo } from '../../components';
import { ratingsByTeam } from '../../sample-data';

const Filters = styled.div`
    margin-bottom: 64px;
`;

const TeamOptions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 16px 24px;
    border: 1px solid #dddddd;
    border-radius: 8px;
    box-shadow: 0 0 32px rgba(208, 208, 208, 0.25);
    background-color: #fcfcfc;
    > :not(:last-child) {
        margin-right: 8px;
    }
`;

const { teams } = ratingsByTeam;
const roundCount = teams[0].ratings.length; // TODO: This is a bit flaky

const {
    min: minRating,
    max: maxRating,
} = teams.reduce(
    (acc, cur) => {
        const teamMin = getMinRating(cur.ratings);
        const teamMax = getMaxRating(cur.ratings);
        return {
            min: teamMin < acc.min ? teamMin : acc.min,
            max: teamMax > acc.max ? teamMax : acc.max,
        };
    }, {
        min: Infinity,
        max: 0,
    }
);

export default function RatingsByTeam() {
    const [selectedTeam, setSelectedTeam] = useState();

    return (
        <>
            <ChartTitle>Ratings by team</ChartTitle>
            <ChartDescription>
                Select a team to display their ratings progression throughout the season.
            </ChartDescription>
            <Filters>
                <TeamOptions>
                    {Object.values(TEAMS).map(
                        team => (
                            <TeamLogo
                                key={`logo-${team}`}
                                team={team}
                                selectable
                                selected={team === selectedTeam}
                                onClick={() => setSelectedTeam(team)}
                            />
                        ),
                    )}
                </TeamOptions>
            </Filters>
            <VictoryChart
                theme={VictoryTheme.material}
                height={160}
                width={240}
                padding={{ top: 4, right: 32, bottom: 32, left: 20 }}
                containerComponent={<VictoryVoronoiContainer />}
                domain={{
                    y: [minRating - 10, maxRating + 10],
                    x: [1, roundCount]
                }}
            >
                <VictoryAxis
                    crossAxis
                    tickCount={roundCount}
                    label="Round"
                    style={{
                        axisLabel: { fill: '#666666', fontSize: 4, fontWeight: 600, padding: 20 },
                        tickLabels: { fontSize: 5 },
                        ticks: { size: 0 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickCount={8}
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
                {teams.map(
                    ({ team, ratings }) => (
                        <VictoryLine
                            key={`line-${team}`}
                            data={ratings.map(
                                ({ round, rating }) => ({ x: round, y: rating })
                            )}
                            interpolation="natural"
                            style={{
                                data: {
                                    strokeWidth: team === selectedTeam ? 1.5 : 0.5,
                                    strokeOpacity: team === selectedTeam ? 1 : 0.075,
                                    stroke: team === selectedTeam
                                        ? `url(#gradient-${team.replace(/ /g,'')})`
                                        : '#333333',
                                }
                            }}
                        />
                    )
                )}
            </VictoryChart>
            {Object.values(TEAMS).map(
                team => (
                    <svg key={`svg-${team}`} style={{ width: 0, height: 0 }}>
                        <defs>
                            <linearGradient id={`gradient-${team.replace(/ /g,'')}`}>
                                <stop offset="0%" stopColor={TEAM_COLORS[team].primary} />
                                <stop offset="100%" stopColor={TEAM_COLORS[team].secondary}/>
                            </linearGradient>
                        </defs>
                    </svg>
                )
            )}
        </>
    );
}
