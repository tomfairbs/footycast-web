import React from 'react';
import styled, { css } from 'styled-components';

import { LOGO_PATHS } from '../core';
import images from '../img/logos/*.png';

const Image = styled.div`
    width: 48px;
    height: 48px;
    background-image: ${p => `url(${images[LOGO_PATHS[p.team]]})`};
    background-size: contain;
    background-repeat: no-repeat;
    ${p => p.selectable && css`
        cursor: pointer;
        opacity: 0.5;
        transform: scale(0.8);
        transition: all 0.15s ease-out;
        ${p.selected && css`
            opacity: 1;
            transform: scale(1);
        `}
        ${!p.selected && css`
            &:hover {
                opacity: 0.8;
                transform: scale(1);
            }
        `}
    `}
`;

const TeamLogo = ({
    team,
    selectable,
    selected,
    ...props
}) => (
    <Image
        team={team}
        selectable={selectable}
        selected={selected}
        {...props}
    />
);

export default TeamLogo;
