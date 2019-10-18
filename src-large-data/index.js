'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import LargeGrid from './largeGrid.jsx';

import '@ag-community/grid-core/dist/styles/ag-grid.css';
import '@ag-community/grid-core/dist/styles/ag-theme-fresh.css';

// waiting for dom to load before booting react. we could alternatively
// put the index.js reference at the end fo the index.html, but i prefer this way.
document.addEventListener('DOMContentLoaded', ()=> {
    var container = document.getElementById('myAppContainer');
    ReactDOM.render(
        React.createElement(LargeGrid),
        container
    );
});
