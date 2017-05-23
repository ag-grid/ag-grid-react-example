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
                },
                {
                    headerName: 'Recommendation',
                    field: 'recommendation',
                    cellEditor: 'richSelect',
                    cellEditorParams: {
                        values: ['Buy', 'Hold', 'Sell']
                    },
                    editable: true
                }
            ]
        };

        this.exchangeService = new ExchangeService();

        // grid events
        this.onGridReady = this.onGridReady.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);

        // component events
        this.updateSymbol = this.updateSymbol.bind(this);
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

        // make realistic - call in a batch
        let rowData = map(this.props.selectedExchange.supportedStocks, symbol => this.exchangeService.getTicker(symbol));
        this.gridApi.addItems(rowData);

        // select the first symbol to show the chart
        this.gridApi.getModel().getRow(0).setSelected(true);

        this.gridApi.sizeColumnsToFit();
    }

    onSelectionChanged() {
        let selectedNode = this.gridApi.getSelectedNodes()[0];
        this.props.onSelectionChanged(selectedNode ? selectedNode.data.symbol : null);
    }

    componentWillMount() {
        this.props.selectedExchange.supportedStocks.forEach(symbol => {
            this.exchangeService.addSubscriber(this.updateSymbol, symbol);
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
            this.gridApi.deselectAll();

            const currentSymbols = this.props.selectedExchange.supportedStocks;
            const nextSymbols = nextProps.selectedExchange.supportedStocks;

            // Unsubscribe to current ones that will be removed
            const symbolsRemoved = difference(currentSymbols, nextSymbols);
            forEach(symbolsRemoved, symbol => {
                this.exchangeService.removeSubscriber(this.updateSymbol, symbol);
            });

            // Subscribe to new ones that need to be added
            const symbolsAdded = difference(nextSymbols, currentSymbols);
            forEach(symbolsAdded, symbol => {
                this.exchangeService.addSubscriber(this.updateSymbol, symbol);
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
            let rowData = map(symbolsAdded, symbol => this.exchangeService.getTicker(symbol));
            this.gridApi.addItems(rowData);

            // select the first symbol to show the chart
            this.gridApi.getModel().getRow(0).setSelected(true);
        }
    }

    updateSymbol(symbol) {
        if (!this.gridApi) {
            // the grid isn't ready yet
            return;
        }

        const updatedNodes = [];
        const updatedCols = [];

        this.gridApi.forEachNode(node => {
            const {data} = node;
            if (data.symbol === symbol.symbol) {
                for (const def of this.state.columnDefs) {
                    if (data[def.field] !== symbol[def.field]) {
                        updatedCols.push(def.field);
                    }
                }
                assign(data, symbol);
                updatedNodes.push(node);
            }
        });

        this.gridApi.refreshCells(updatedNodes, updatedCols);
    };

    render() {
        return (
            <div style={{height: 410, width: 800}}
                 className="ag-fresh">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    enableSorting="true"
                    rowSelection="single"

                    // events
                    onGridReady={this.onGridReady}
                    onSelectionChanged={this.onSelectionChanged}>
                </AgGridReact>
            </div>
        );
    }
}