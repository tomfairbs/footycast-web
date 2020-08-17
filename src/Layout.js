import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const Wrapper = styled.div`
    padding: 32px;
`;

const Layout = ({ children }) => (
    <Wrapper>
        <h1>The Footycast</h1>
        <Navigation />
        {children}
    </Wrapper>
);

export default Layout;
