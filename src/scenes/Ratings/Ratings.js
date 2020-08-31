import React from 'react';
import styled from 'styled-components';

import RatingsByRound from './RatingsByRound';
import RatingsByTeam from './RatingsByTeam';

const Wrapper = styled.div`
    max-width: 1072px;
`;

const Ratings = () => (
    <Wrapper>
        <RatingsByRound />
        <RatingsByTeam />
    </Wrapper>
);

export default Ratings;
