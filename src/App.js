import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import { Home, Ladder, Ratings } from './scenes';
import Layout from './Layout';
import Router from './Router';

const App = () => (
    <div className="app">
        <BrowserRouter>
            <Layout>
                <Router />
            </Layout>
        </BrowserRouter>
    </div>
);

export default App;
