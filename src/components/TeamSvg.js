import React from 'react';
import styled from 'styled-components';

import { LOGO_PATHS } from '../core';
import images from '../img/logos/*.png';

const TeamSvg = ({ x, y, datum }) => (
    <image
        height={12}
        width={12}
        x={x}
        y={y}
        xlinkHref={images[LOGO_PATHS[datum.team]]}
    />
);

export default TeamSvg;
