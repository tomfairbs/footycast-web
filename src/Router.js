import React from "react";
import { Switch, Route } from "react-router-dom";

import { Home, Ladder, Ratings } from './scenes';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/ratings" component={Ratings} />
        <Route exact path="/ladder" component={Ladder} />
    </Switch>
);

export default Router;
