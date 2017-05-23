import React, {Component} from "react";

import PriceChangesGrid from "./PriceChangesGrid.jsx";
import StockDetailPanel from "./StockDetailPanel.jsx";
import FxQuoteMatrix from "./FxQuoteMatrix.jsx";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSymbol: null
        };

        this.onSelectionChanged = this.onSelectionChanged.bind(this);
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

    onSelectionChanged(selectedSymbol) {
        this.setState({
            selectedSymbol
        })
    }

    render() {
        return (
            <div style={{width: 1250}}>
                <div>
                    <div style={{float: "left", marginRight: 25}}>
                        <PriceChangesGrid selectedExchange={this.props.selectedExchange}
                                          onSelectionChanged={this.onSelectionChanged}/>
                    </div>
                    <div style={{float: "left"}}>
                        <StockDetailPanel selectedSymbol={this.state.selectedSymbol}
                                          exchangeName={this.props.selectedExchange.name}/>
                    </div>
                </div>
                <div style={{width: "100%", clear: "both", paddingTop: 25}}>
                    <FxQuoteMatrix/>
                </div>
            </div>
        );
    }
};
