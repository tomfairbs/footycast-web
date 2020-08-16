import React from 'react';
import styled from 'styled-components';
import { TEAM_NAMES } from '../core';

const Wrapper = styled.div`
    width: 24px;
    height: 24px;
`;

const TeamLogo = ({ team }) => (
    <Wrapper>
        <img
            src={require(`..//img/logos/${team}.png`)}
            alt={TEAM_NAMES[team]}
        />
    </Wrapper>
);

export default TeamLogo;
