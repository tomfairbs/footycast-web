import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav`
    margin-bottom: 32px;
`;

const NavItems = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li`
    font-size: 18px;
    font-weight: 600;
    color: #0059c7;
    :not(:last-child) {
        margin-right: 32px;
    }
`;

const NavLink = styled(Link)`
    text-decoration: none;
    :visited {
        color: #0059c7;
    }
    :hover,
    :active {
        text-decoration: underline;
    }
`;

const Navigation = () => (
    <Wrapper>
        <NavItems>
            <NavItem>
                <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/ratings">Ratings</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/ladder">Ladder</NavLink>
            </NavItem>
        </NavItems>
    </Wrapper>
);

export default Navigation;