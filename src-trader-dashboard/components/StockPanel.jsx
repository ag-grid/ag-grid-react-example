import React, {Component} from "react";

import LiveUpdatesGrid from "./LiveUpdatesGrid.jsx";
import StockDetailPanel from "./StockDetailPanel.jsx";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSymbol: null
        };

        this.onRowClicked = this.onRowClicked.bind(this);
    }

    onRowClicked(selectedSymbol) {
        this.setState({
            selectedSymbol
        })
    }

    render() {
        return (
            <div>
                <div style={{float: "left", marginRight: 25}}>
                    <LiveUpdatesGrid selectedExchange={this.props.selectedExchange}
                                     onRowClicked={this.onRowClicked} />
                </div>
                <div style={{float: "left"}}>
                    <StockDetailPanel selectedSymbol={this.state.selectedSymbol}
                                      exchangeName={this.props.selectedExchange.name}/>
                </div>
            </div>
        );
    }
};
