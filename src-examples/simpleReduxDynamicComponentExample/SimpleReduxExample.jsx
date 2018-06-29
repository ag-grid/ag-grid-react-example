import React, {Component} from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
// take this line out if you do not want to use ag-Grid-Enterprise
import "ag-grid-enterprise";

import HeaderComponent from "./HeaderComponent";
import GridComponent from "./GridComponent";

import gridData from "./gridDataReducer";

let store = createStore(gridData);

/*
 * This component serves as a container for both the header and grid components. It's primarily here to act as a container
 * for the redux Provider
 */
export default class SimpleReduxExample extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>Simple Redux Example using Connected React Components</h1>
                    <HeaderComponent/>
                    <GridComponent/>
                </div>
            </Provider>
        )
    }
};
