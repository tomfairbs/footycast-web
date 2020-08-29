import React from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { VictoryPie } from 'victory';

import { TeamLogo } from '../../components';

const Wrapper = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 64px;
`;

const Matchup = styled.div`
    display: flex;
    align-items: baseline;
    margin-right: 64px;
    svg {
        margin: 0 48px;
    }
`;

const MatchTime = styled.div`
    font-size: 24px;
`;

const Match = ({
    date,
    home,
    away,
    prHome,
    prAway,
    prDraw,
}) => (
    <Wrapper>
        <Matchup>
            <TeamLogo team={home} />
            <svg width={192} height={96}>
                <VictoryPie
                    standalone={false}
                    width={192}
                    height={104}
                    origin={{ x: 96, y: 96, }}
                    colorScale={[
                        prHome > prAway ? '#666666' : '#aaaaaa',
                        '#cccccc',
                        prAway > prHome ? '#666666' : '#aaaaaa'
                    ]}
                    style={{ labels: { fontSize: 14 } }}
                    radius={96}
                    startAngle={-90}
                    endAngle={90}
                    labels={() => null}
                    // labels={({ datum, index: i }) => (
                    //     i === 1
                    //         ? `${Math.round(datum.y * 100)}% (draw)`
                    //         : null
                    // )}
                    data={[
                        { y: prHome },
                        { y: prDraw },
                        { y: prAway },
                    ]}
                />
            </svg>
            <TeamLogo team={away} />
        </Matchup>
        <MatchTime>
            {format(parseISO(date), 'h:mm a')}
        </MatchTime>
    </Wrapper>
);

export default Match;
