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

const gridTemplateColumns = `
    minmax(64px, 1fr)
    minmax(192px, 3fr)
    minmax(128px, 2fr)
    minmax(128px, 2fr)
    minmax(128px, 2fr)
    minmax(128px, 2fr)
`;

const Wrapper = styled.div`
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
`;

const LadderHeader = styled.div`
    display: grid;
    grid-template-columns: ${gridTemplateColumns};
    padding: 16px 0;
`;

const LadderRow = styled.div`
    display: grid;
    grid-template-columns: ${gridTemplateColumns};
    padding: 16px 0;
    border-top: 1px solid #eee;
`;

const HeaderCell = styled.div`
    font-weight: 600;
`;

const Cell = styled.div`
    display: grid;
    align-items: center;
    height: 80px;
    font-size: 21px;
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
            <LadderHeader>
                <HeaderCell>Team</HeaderCell>
                <HeaderCell>Likely position</HeaderCell>
                <HeaderCell>Top 8 chance</HeaderCell>
                <HeaderCell>Top 4 chance</HeaderCell>
                <HeaderCell>Predicted wins</HeaderCell>
                <HeaderCell>Predicted %</HeaderCell>
            </LadderHeader>
            {sortedTeams.map(
                team => (
                    <LadderRow key={team.team}>
                        <Cell>
                            {<TeamLogo team={team.team} />}
                        </Cell>
                        <Cell>
                            <VictoryGroup
                                height={80}
                                padding={{ top: 16, right: 32 }}
                                containerComponent={<VictoryVoronoiContainer />}
                                domain={{ x: [1, 18], y: [0, getYUpperBound(team.positions)] }}
                                theme={VictoryTheme.material}
                            >
                                <VictoryBar
                                    labelComponent={<VictoryTooltip constrainToVisibleArea />}
                                    labels={team.positions.map(
                                        ({ position, chance }) => `${addOrdinalSuffix(position)} - ${chance}%`
                                    )}
                                    data={team.positions}
                                    x="position"
                                    y="chance"
                                    alignment="start"
                                />
                            </VictoryGroup>
                        </Cell>
                        <Cell>
                            {team.topEight}%
                        </Cell>
                        <Cell>
                            {team.topFour}%
                        </Cell>
                        <Cell>
                            {Math.round(team.wins)}
                        </Cell>
                        <Cell>
                            {Math.round(team.perc * 10 * 100) / 10}%
                        </Cell>
                    </LadderRow>
                )
            )}
        </Wrapper>
    );
};

export default Ladder;
