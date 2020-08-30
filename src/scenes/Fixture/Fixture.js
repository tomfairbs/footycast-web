import React, { useState } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';

import { predictionFixture } from '../../sample-data';
import { groupMatchesByDate } from '../../core';
import { ChartTitle, ChartDescription } from '../../components';
import Match from './Match';

const Filters = styled.div`
    margin-bottom: 32px;
`;

const MatchDate = styled.h2`
    margin-bottom: 40px;
    font-size: 20px;
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
            <ChartTitle>Fixture</ChartTitle>
            <ChartDescription>
                Head to head probabilities. Each matchup assumes a ~2% chance of a draw.
            </ChartDescription>
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
                                    venue={match.venue}
                                    home={match.home}
                                    away={match.away}
                                    prHome={match.prHome}
                                    prAway={match.prAway}
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
