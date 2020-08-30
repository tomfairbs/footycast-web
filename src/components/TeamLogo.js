import React from 'react';
import styled, { css } from 'styled-components';

import { LOGO_PATHS } from '../core';
import logos from '../img/logos.svg';

const Wrapper = styled.div`
    width: 64px;
    height: 64px;
    svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 2px rgba(0,0,0,.15));
    }
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
    <Wrapper
        selectable={selectable}
        selected={selected}
        {...props}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <use xlinkHref={`${logos}#logo-${LOGO_PATHS[team]}`} />
        </svg>
    </Wrapper>
);

export default TeamLogo;
