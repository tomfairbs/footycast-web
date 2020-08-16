import React from 'react';
import styled from 'styled-components';

import { LOGO_PATHS } from '../core';
import images from '../img/logos/*.png';

const Image = styled.div`
    width: 48px;
    height: 48px;
    background-image: ${p => `url(${images[LOGO_PATHS[p.team]]})`};
    background-size: contain;
    background-repeat: no-repeat;
`;

const TeamLogo = ({ team }) => (
    <Image team={team} />
);

export default TeamLogo;
