import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';

import Layout from './Layout';
import Router from './Router';

const App = () => (
    <div className="app">
        <HashRouter basename="/">
            <Layout>
                <Router />
            </Layout>
        </HashRouter>
    </div>
);

export default App;
