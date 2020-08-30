
import React from 'react';
import styled from 'styled-components';

import logo from './img/footycast-logo.jpg';
import Navigation from './Navigation';

const Wrapper = styled.nav`
    padding: 32px;
    border-bottom: 1px solid #dddddd;
    box-shadow: 0 2px 16px rgba(72, 72, 72, 0.25);
`;

const Logo = styled.img`
    width: 256px;
    margin-bottom: 16px;
`;

const Header = () => (
    <Wrapper>
        <Logo src={`${logo}`} alt="Footycast logo" />
        <Navigation />
    </Wrapper>
);

export default Header;
