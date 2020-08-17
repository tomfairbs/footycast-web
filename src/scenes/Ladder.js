import React from 'react';
import styled, { css } from 'styled-components';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';

import { ladder } from '../sample-data';
import { TeamLogo } from '../components';

const gridTemplateColumns = `
    minmax(64px, 1fr)
    minmax(128px, 2fr)
    minmax(64px, 1fr)
    minmax(64px, 1fr)
    minmax(64px, 1fr)
    minmax(64px, 1fr)
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
            {teams.map(
                team => (
                    <LadderRow key={team.team}>
                        <Cell>
                            {<TeamLogo team={team.team} />}
                        </Cell>
                        <Cell>
                            <VictoryBar
                                data={team.positions}
                                width={320}
                                height={120}
                                x="position"
                                y="chance"
                            />
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
