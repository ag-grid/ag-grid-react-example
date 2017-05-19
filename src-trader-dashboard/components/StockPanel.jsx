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

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedExchange !== this.props.selectedExchange) {
            this.setState({
                selectedSymbol: null
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.selectedExchange !== this.props.selectedExchange ||
            nextState.selectedSymbol !== this.state.selectedSymbol;
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
                                     onRowClicked={this.onRowClicked}/>
                </div>
                <div style={{float: "left"}}>
                    <StockDetailPanel selectedSymbol={this.state.selectedSymbol}
                                      exchangeName={this.props.selectedExchange.name}/>
                </div>
            </div>
        );
    }
};
