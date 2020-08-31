import React from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { VictoryPie } from 'victory';

import { TeamLogo } from '../../components';

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    max-width: 648px;
    margin-bottom: 32px;
    padding: 32px;
    border: 1px solid #dddddd;
    border-radius: 8px;
    box-shadow: 0 0 32px rgba(208, 208, 208, 0.25);
    background-color: #fcfcfc;
`;

const Matchup = styled.div`
    display: flex;
    align-items: flex-end;
    > svg {
        margin: 0 32px;
    }
`;

const TeamChance = styled.div`
    margin-bottom: 8px;
    color: ${p => p.favourite ? '#333333' : '#777777'};
    font-size: 30px;
    text-align: center;
`;

const Details = styled.div`
    margin-left: 64px;
    color: #333333;
`;

const Time = styled.div`
    font-size: 20px;
`;

const Venue = styled.div`
    font-size: 14px;
`;

const Match = ({
    date,
    venue,
    home,
    away,
    prHome,
    prAway,
}) => (
    <Wrapper>
        <Matchup>
            <div>
                <TeamChance favourite={prHome > prAway}>
                    {Math.round(prHome * 100)}%
                </TeamChance>
                <TeamLogo
                    favourite={prHome > prAway}
                    team={home}
                />
            </div>
            <svg width={192} height={96}>
                <VictoryPie
                    standalone={false}
                    width={192}
                    height={104}
                    origin={{ x: 96, y: 96, }}
                    colorScale={[
                        prHome > prAway ? '#666666' : '#bbbbbb',
                        prAway > prHome ? '#666666' : '#bbbbbb'
                    ]}
                    style={{ labels: { fontSize: 14 } }}
                    radius={96}
                    startAngle={-90}
                    endAngle={90}
                    labels={() => null}
                    data={[
                        { y: prHome },
                        { y: prAway },
                    ]}
                />
            </svg>
            <div>
                <TeamChance favourite={prAway > prHome}>
                    {Math.round(prAway * 100)}%
                </TeamChance>
                <TeamLogo
                    team={away}
                    favourite={prAway > prHome}
                />
            </div>
        </Matchup>
        <Details>
            <Time>{format(parseISO(date), 'h:mm a')}</Time>
            <Venue>{venue}</Venue>
        </Details>
    </Wrapper>
);

export default Match;
