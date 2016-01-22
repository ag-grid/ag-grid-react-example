'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import {MyApp} from './myApp.jsx';
import 'ag-grid-root/ag-grid.css';
import 'ag-grid-root/theme-fresh.css';

document.addEventListener('DOMContentLoaded', ()=> {
    var container = document.getElementById('myAppContainer');
    ReactDOM.render(
        React.createElement(MyApp),
        container
    );
});
