import React, {Suspense, lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import App from "./App";
import Albums from "./components/Pages/Albums";
import Album from "./components/Pages/Album";
import Favorites from "./components/Pages/Favorites";
import NotFound from "./components/Pages/NotFound";

const AppRoutes = () => (
    <App>
        <Switch>
            <Route path="/" component={Albums} exact />
            <Route path="/albums" component={Albums} exact />
            <Route path="/albums/fav" component={Favorites} exact />
            <Route path="/albums/:albumSlug" component={Album} exact />
            <Route component={NotFound} />
        </Switch>
    </App>
);

export default AppRoutes;