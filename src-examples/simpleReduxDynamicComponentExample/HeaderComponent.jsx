import React, {Component} from "react";
import {connect} from "react-redux";

import {setCurrency, updateRowData} from "./gridDataActions";

/*
 * This component serves both to host the demo controls, which in turn will drive row data state changes
 */
class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // provide the initial data to the store (which in turn will populate the grid)
        this.props.dispatch(updateRowData(this.createRowData()));
    }

    setCurrency(currencySymbol, exchangeRate) {
        this.props.dispatch(setCurrency(currencySymbol, exchangeRate));
    }

    render() {
        return (
            <div style={{marginTop: 15}}>
                <button onClick={this.setCurrency.bind(this, '£', 1)} className="btn btn-primary">Set Currency to GBP</button>
                <button onClick={this.setCurrency.bind(this, '$', 1.29)} className="btn btn-primary">Set Currency to USD</button>
            </div>
        )
    }

    // the following methods are for creating dummy row data
    createRowData() {
        let rowData = [];

        for (let i = 0; i < 14; i++) {
            let newItem = this.createItem();
            rowData.push(newItem);
        }

        return rowData;
    }

    createItem() {
        return {
            symbol: this.createUniqueRandomSymbol(),
            price: Math.floor(Math.random() * 100)
        };
    }

    // creates a unique symbol, eg 'ADG' or 'ZJD'
    createUniqueRandomSymbol() {
        let symbol;
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let isUnique = false;
        while (!isUnique) {
            symbol = '';
            // create symbol
            for (let i = 0; i < 3; i++) {
                symbol += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            // check uniqueness
            isUnique = true;
            this.props.rowData.forEach(function (oldItem) {
                if (oldItem.symbol === symbol) {
                    isUnique = false;
                }
            });
        }

        return symbol;
    }
}

// pull off row data
export default connect(
    (state) => {
        return {
            rowData: state.rowData
        }
    }
)(HeaderComponent);
