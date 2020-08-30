import React from 'react';
import styled from 'styled-components';

import Header from './Header';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex: 1;
    padding: 32px;
    background-color: #fafafa;
`;

const Layout = ({ children }) => (
    <Wrapper>
        <Header />
        <Content>
            {children}
        </Content>
    </Wrapper>
);

export default Layout;
