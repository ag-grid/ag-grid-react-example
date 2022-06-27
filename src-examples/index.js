'use strict';

import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";

import "@ag-grid-enterprise/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import App from "./App";

// only required when using enterprise features
// import {LicenseManager} from "@ag-grid-enterprise/core";
// LicenseManager.setLicenseKey("<your license key>");

document.addEventListener('DOMContentLoaded', () => {
    render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>,
        document.querySelector('#app')
    );
});

