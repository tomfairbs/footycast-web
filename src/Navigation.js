import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav``;

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
    color: #0059c7;
    :hover,
    :active {
        text-decoration: underline;
    }
`;

const Navigation = () => (
    <Wrapper>
        <NavItems>
            <NavItem>
                <NavLink to="/">Ratings</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/ladder">Ladder</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/fixture">Fixture</NavLink>
            </NavItem>
        </NavItems>
    </Wrapper>
);

export default Navigation;
