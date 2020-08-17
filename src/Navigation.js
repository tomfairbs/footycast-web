import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/ratings">Ratings</Link>
            </li>
            <li>
                <Link to="/ladder">Ladder</Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;
