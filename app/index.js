import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "./config/configureStore";
import AppRoutes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootElement = document.getElementById('root');
const store = configureStore();

const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Component/>
            </Router>
        </Provider>,
        rootElement
    );
};

renderApp(AppRoutes);