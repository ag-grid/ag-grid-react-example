import React, {Component} from "react";

import LiveUpdatesGrid from "./LiveUpdatesGrid.jsx";
import StockDetailPanel from "./StockDetailPanel.jsx";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{float: "left", marginRight: 25}}>
                    <LiveUpdatesGrid selectedExchange={this.props.selectedExchange}></LiveUpdatesGrid>
                </div>
                <div style={{float: "left"}}>
                    <StockDetailPanel></StockDetailPanel>
                </div>
            </div>
        );
    }
};
