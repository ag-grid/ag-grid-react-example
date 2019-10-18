'use strict';

import React from "react";
import {render} from "react-dom";

import {Provider} from "react-redux";

import StoreService from './services/StoreService';
import TraderDashboard from "./components/TraderDashboard.jsx";

let store = StoreService.STORE;

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <TraderDashboard />
        </Provider>,
        document.querySelector('#traderDashboard')
    );
});

