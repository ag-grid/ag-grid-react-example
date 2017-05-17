'use strict';

import ReactDOM from "react-dom";
import React from "react";

import TraderDashboard from "./components/TraderDashboard.jsx";

import "ag-grid-root/dist/styles/ag-grid.css";
import "ag-grid-root/dist/styles/theme-fresh.css";


document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        React.createElement(TraderDashboard),
        document.querySelector('#traderDashboard')
    );
});

