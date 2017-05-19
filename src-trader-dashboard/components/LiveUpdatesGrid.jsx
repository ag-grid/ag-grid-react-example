import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";

import map from "lodash/map";
import difference from "lodash/difference";
import forEach from "lodash/forEach";
import includes from "lodash/includes";
import assign from "lodash/assign";

import ExchangeService from "../services/ExchangeService.jsx";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    field: 'symbol',
                    headerName: 'Symbol',
                    sort: 'asc'
                },
                {
                    field: 'price',
                    headerName: 'Price',
                    cellFormatter: this.numberFormatter,
                    cellRenderer: 'animateShowChange',
                    cellStyle: {'text-align': 'right'}
                },
                {
                    field: 'bid',
                    headerName: 'Bid',
                    cellFormatter: this.numberFormatter,
                    cellRenderer: 'animateShowChange',
                    cellStyle: {'text-align': 'right'}
                },
                {
                    field: 'ask',
                    headerName: 'Ask',
                    cellFormatter: this.numberFormatter,
                    cellRenderer: 'animateShowChange',
                    cellStyle: {'text-align': 'right'}
                }
            ]
        };

        this.exchangeService = new ExchangeService();

        // grid events
        this.onGridReady = this.onGridReady.bind(this);
        this.onRowClicked = this.onRowClicked.bind(this);

        // component events
        this.updateQuote = this.updateQuote.bind(this);
    }

    numberFormatter(params) {
        if (typeof params.value === 'number') {
            return params.value.toFixed(2);
        } else {
            return params.value;
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.addItems(map(this.props.selectedExchange.supportedStocks, symbol => this.exchangeService.getTicker(symbol)));

        this.gridApi.sizeColumnsToFit();
    }

    onRowClicked(params) {
        this.props.onRowClicked(params.data.symbol);
    }

    componentWillMount() {
        this.props.selectedExchange.supportedStocks.forEach(symbol => {
            this.exchangeService.addSubscriber(this.updateQuote, symbol);
        });
    }

    componentWillUnmount() {
        this.exchangeService.removeSubscribers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedExchange.supportedStocks !== this.props.selectedExchange.supportedStocks) {
            if (!this.gridApi) {
                return;
            }

            const currentSymbols = this.props.selectedExchange.supportedStocks;
            const nextSymbols = nextProps.selectedExchange.supportedStocks;

            // Unsubscribe to current ones that will be removed
            const symbolsRemoved = difference(currentSymbols, nextSymbols);
            forEach(symbolsRemoved, symbol => {
                this.exchangeService.removeSubscriber(this.updateQuote, symbol);
            });

            // Subscribe to new ones that need to be added
            const symbolsAdded = difference(nextSymbols, currentSymbols);
            forEach(symbolsAdded, symbol => {
                this.exchangeService.addSubscriber(this.updateQuote, symbol);
            });

            // Remove ag-grid nodes as necessary
            const nodesToRemove = [];
            this.gridApi.forEachNode(node => {
                const {data} = node;
                if (includes(symbolsRemoved, data.symbol)) {
                    nodesToRemove.push(node);
                }
            });
            this.gridApi.removeItems(nodesToRemove);

            // Insert new ag-grid nodes as necessary
            this.gridApi.addItems(map(symbolsAdded, symbol => this.exchangeService.getTicker(symbol)));
        }
    }

    updateQuote(quote) {
        if (!this.gridApi) {
            // the grid isn't ready yet
            return;
        }

        const updatedNodes = [];
        const updatedCols = [];

        this.gridApi.forEachNode(node => {
            const {data} = node;
            if (data.symbol === quote.symbol) {
                for (const def of this.state.columnDefs) {
                    if (data[def.field] !== quote[def.field]) {
                        updatedCols.push(def.field);
                    }
                }
                assign(data, quote);
                updatedNodes.push(node);
            }
        });

        this.gridApi.refreshCells(updatedNodes, updatedCols);
    };

    render() {
        return (
            <div style={{height: 400, width: 800}}
                 className="ag-fresh">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    enableSorting="true"

                    // events
                    onGridReady={this.onGridReady}
                    onRowClicked={this.onRowClicked}>
                </AgGridReact>
            </div>
        );
    }
}