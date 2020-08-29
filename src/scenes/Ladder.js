import React from 'react';
import styled from 'styled-components';
import {
    VictoryGroup,
    VictoryTheme,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryBar,
} from 'victory';

import { ladder } from '../sample-data';
import { TeamLogo } from '../components';
import { addOrdinalSuffix } from '../core';
import ChartTitle from '../components/ChartTitle';
import ChartDescription from '../components/ChartDescription';

const gridTemplateColumns = `
    minmax(96px, 96px)
    minmax(256px, 256px)
    minmax(128px, 2fr)
    minmax(128px, 2fr)
    minmax(128px, 2fr)
    minmax(128px, 2fr)
`;

const Wrapper = styled.div`
    max-width: 1200px;
`;

const LadderHeader = styled.div`
    display: grid;
    grid-template-columns: ${gridTemplateColumns};
    padding: 16px 0;
`;

const LadderRow = styled.div`
    display: grid;
    grid-template-columns: ${gridTemplateColumns};
    border-top: 1px solid #eee;
    &:last-child {
        border-bottom: 1px solid #eee;
    }
`;

const HeaderCell = styled.div`
    font-weight: 600;
    font-size: 14px;
`;

const Cell = styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    font-size: 18px;
    padding-right: 16px;
`;

const PercChange = styled.span`
    margin-left: 8px;
    color: ${p => p.up ? '#31a300' : '#c71b00'};
    font-size: 16px;
`;

const getYUpperBound = positions => (
    positions.reduce(
        (acc, cur) => (
            cur.chance > acc ? cur.chance : acc
        ), positions[0].chance,
    ) + 10
);

const Ladder = () => {
    const { teams } = ladder;
    const sortedTeams = teams.sort(
        (a, b) => a.wins < b.wins ? 1 : -1,
    );

    return (
        <Wrapper>
            <ChartTitle>Ladder</ChartTitle>
            <ChartDescription>
                Positional probabilities, top 8/4 chances, and likely win count.
            </ChartDescription>
            <LadderHeader>
                <HeaderCell>Team</HeaderCell>
                <HeaderCell>Likely position</HeaderCell>
                <HeaderCell>Top 8 chance</HeaderCell>
                <HeaderCell>Top 4 chance</HeaderCell>
                <HeaderCell>Predicted wins</HeaderCell>
                <HeaderCell>Predicted %</HeaderCell>
            </LadderHeader>
            {sortedTeams.map(
                ({
                    team,
                    positions,
                    topEight,
                    topEightPre,
                    topFour,
                    topFourPre,
                    wins,
                    perc,
                }) => (
                    <LadderRow key={team}>
                        <Cell>
                            {<TeamLogo team={team} />}
                        </Cell>
                        <Cell>
                            <VictoryGroup
                                height={88}
                                padding={{ top: 32, right: 32 }}
                                containerComponent={<VictoryVoronoiContainer />}
                                domain={{ x: [1, 18], y: [0, getYUpperBound(positions)] }}
                                theme={VictoryTheme.material}
                            >
                                <VictoryBar
                                    labelComponent={(
                                        <VictoryTooltip
                                            constrainToVisibleArea
                                            pointerLength={0}
                                            pointerWidth={0}
                                            center={{ x: 280, y: 32 }}
                                            flyoutStyle={{
                                                strokeWidth: 0,
                                                background: 'transparent',
                                            }}
                                            style={{
                                                fontSize: 21,
                                                fontWeight: '600',
                                                fontFamily: '\'Source Sans Pro\', sans-serif',
                                            }}
                                        />
                                    )}
                                    labels={positions.map(
                                        ({ position, chance }) => `${addOrdinalSuffix(position)} - ${chance}%`
                                    )}
                                    data={positions}
                                    x="position"
                                    y="chance"
                                    alignment="start"
                                />
                            </VictoryGroup>
                        </Cell>
                        <Cell>
                            {topEight}%
                            <PercChange up={topEight > topEightPre}>
                                {topEight - topEightPre === 0
                                    ? '-'
                                    : `(${topEight - topEightPre < 0 ? '-' : '+'}${Math.abs(topEight - topEightPre)}%)`}
                            </PercChange>
                        </Cell>
                        <Cell>
                            {topFour}%
                            <PercChange up={topFour > topFourPre}>
                                {topFour - topFourPre === 0
                                    ? '-'
                                    : `(${topFour - topFourPre < 0 ? '-' : '+'}${Math.abs(topFour - topFourPre)}%)`}
                            </PercChange>
                        </Cell>
                        <Cell>
                            {Math.round(wins)}
                        </Cell>
                        <Cell>
                            {Math.round(perc * 10 * 100) / 10}
                        </Cell>
                    </LadderRow>
                )
            )}
        </Wrapper>
    );
};

export default Ladder;
