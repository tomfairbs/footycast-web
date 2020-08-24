import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import { VictoryTheme, VictoryPie } from 'victory';

import { predictionFixture } from '../sample-data';
import { TeamLogo } from '../components';

const Filters = styled.div`
    margin-bottom: 32px;
`;

const Matches = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Match = styled.div`
    flex: 0 0 33.33%;
    margin-bottom: 64px;
    text-align: center;
`;

const Teams = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 0 40px;
`;

const Fixture = () => {
    const remainingRounds = [...new Set(predictionFixture.map(match => `${match.round}`))];
    const roundOptions = remainingRounds.map(
        round => ({ label: `Round ${round}`, value: round }),
    );
    const [selectedRound, setSelectedRound] = useState(roundOptions[0]);

    const matches = predictionFixture.filter(
        match => match.round.toString() === selectedRound.value,
    );

    return (
        <>
            <Filters>
                <ReactSelect
                    value={selectedRound}
                    options={roundOptions}
                    onChange={option => setSelectedRound(option)}
                    styles={{ container: base => ({ ...base, width: 160 }) }}
                />
            </Filters>
            <Matches>
                {matches.map(
                    match => (
                        <Match key={match.id}>
                            <Teams>
                                <TeamLogo team={match.home} />
                                <span>VS</span>
                                <TeamLogo team={match.away} />
                            </Teams>
                            <svg height={200}>
                                <VictoryPie
                                    standalone={false}
                                    theme={VictoryTheme.material}
                                    style={{ labels: { fontSize: 14 } }}
                                    padding={{ right: 48, bottom: 16 }}
                                    radius={128}
                                    startAngle={-90}
                                    endAngle={90}
                                    labelRadius={({ index: i }) => i === 1 ? 152 : 64}
                                    labels={({ datum, index: i }) => {
                                        const chance = `${Math.round(datum.y * 100)}%`;
                                        return i === 1 ? `${chance} (draw)` : chance;
                                    }}
                                    data={[
                                        { y: match.prHome },
                                        { y: match.prDraw },
                                        { y: match.prAway },
                                    ]}
                                />
                            </svg>
                        </Match>
                    ),
                )}
            </Matches>
        </>
    )
};

export default Fixture;
