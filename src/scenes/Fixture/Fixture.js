import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';

import { predictionFixture } from '../../sample-data';
import Match from './Match';
import { groupMatchesByDate } from '../../core';

const Filters = styled.div`
    margin-bottom: 32px;
`;

const MatchDate = styled.h2`
    margin-bottom: 40px;
`;

const Fixture = () => {
    const remainingRounds = [...new Set(predictionFixture.map(match => `${match.round}`))];
    const roundOptions = remainingRounds.map(
        round => ({ label: `Round ${round}`, value: round }),
    );
    const [selectedRound, setSelectedRound] = useState(roundOptions[0]);

    const matchDates = groupMatchesByDate(
        predictionFixture.filter(
            match => match.round.toString() === selectedRound.value,
        )
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
            {Object.keys(matchDates).map(
                date => (
                    <React.Fragment key={date}>
                        <MatchDate>{date}</MatchDate>
                        {matchDates[date].map(
                            match => (
                                <Match
                                    key={match.id}
                                    date={match.date}
                                    home={match.home}
                                    away={match.away}
                                    prHome={match.prHome}
                                    prAway={match.prAway}
                                    prDraw={match.prDraw}
                                />
                            )
                        )}
                    </React.Fragment>
                ),
            )}
        </>
    )
};

export default Fixture;
