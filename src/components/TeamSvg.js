import React from 'react';

import { LOGO_PATHS } from '../core';
import images from '../img/logos/*.png';

const TeamSvg = ({ x, y, datum }) => (
    <image
        height={8}
        width={8}
        x={x}
        y={y}
        xlinkHref={images[LOGO_PATHS[datum.team]]}
    />
);

export default TeamSvg;
