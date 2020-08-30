import React from 'react';

import { LOGO_PATHS } from '../core';
import logos from '../img/logos.svg';

const TeamSvg = ({ x, y, datum }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        height={12}
        width={12}
        x={x}
        y={y}
    >
        <use xlinkHref={`${logos}#logo-${LOGO_PATHS[datum.team]}`} />
    </svg>
);

export default TeamSvg;
