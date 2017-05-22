import React, {Component} from "react";
import {connect} from "react-redux";
import {AgGridReact} from "ag-grid-react";

import ExchangeService from "../services/ExchangeService.jsx";

class FxQuoteMatrix extends Component {
    constructor(props) {
        super(props);

        this.exchangeService = new ExchangeService();

        this.state = {
            columnDefs: this.exchangeService.getFxMatrixHeaderNames(),
            // rowData: this.exchangeService.getFxMatrixSnapshot()
        };

        // grid events
        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    }


    // componentWillUnmount() {
    //     this.exchangeService.removeSubscribers();
    // }

    componentWillReceiveProps(nextProps) {
        console.log(props);
    //     if (nextProps.selectedExchange.supportedStocks !== this.props.selectedExchange.supportedStocks) {
    //         if (!this.gridApi) {
    //             return;
    //         }
    //
    //         const currentSymbols = this.props.selectedExchange.supportedStocks;
    //         const nextSymbols = nextProps.selectedExchange.supportedStocks;
    //
    //         // Unsubscribe to current ones that will be removed
    //         const symbolsRemoved = difference(currentSymbols, nextSymbols);
    //         forEach(symbolsRemoved, symbol => {
    //             this.exchangeService.removeSubscriber(this.updateQuote, symbol);
    //         });
    //
    //         // Subscribe to new ones that need to be added
    //         const symbolsAdded = difference(nextSymbols, currentSymbols);
    //         forEach(symbolsAdded, symbol => {
    //             this.exchangeService.addSubscriber(this.updateQuote, symbol);
    //         });
    //
    //         // Remove ag-grid nodes as necessary
    //         const nodesToRemove = [];
    //         this.gridApi.forEachNode(node => {
    //             const {data} = node;
    //             if (includes(symbolsRemoved, data.symbol)) {
    //                 nodesToRemove.push(node);
    //             }
    //         });
    //         this.gridApi.removeItems(nodesToRemove);
    //
    //         // Insert new ag-grid nodes as necessary
    //         this.gridApi.addItems(map(symbolsAdded, symbol => this.exchangeService.getTicker(symbol)));
    //     }
    }

    render() {
        return (
            <div style={{height: 500, width: "100%"}}
                 className="ag-fresh">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    enableSorting="false"
                    enableFilter="false"

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            rowData: state.fxRowData
        }
    }
)(FxQuoteMatrix);