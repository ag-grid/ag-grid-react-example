'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import {MyApp} from './myApp.jsx';

document.addEventListener('DOMContentLoaded', ()=> {
    var container = document.getElementById('myAppContainer');
    ReactDOM.render(
        React.createElement(MyApp),
        container
    );
});
