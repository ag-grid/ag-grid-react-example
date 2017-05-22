'use strict';

import React from "react";
import {render} from "react-dom";

import {Provider} from "react-redux";
import {createStore} from "redux";

import TraderDashboard from "./components/TraderDashboard.jsx";

import "ag-grid-root/dist/styles/ag-grid.css";
import "ag-grid-root/dist/styles/theme-fresh.css";

import fxData from "./reducers/fxData";

let store = createStore(fxData);

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <TraderDashboard />
        </Provider>,
        document.querySelector('#traderDashboard')
    );
});

