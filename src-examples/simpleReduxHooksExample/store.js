import React from "react";
import PriceRenderer from "./PriceRenderer";
import PriceEditor from "./PriceEditor";
import PriceFilter from "./PriceFilter";

export const initialState = {
    rowData: [],
    columnDefs: [
        {
            field: 'symbol',
            editable: true
        },
        {
            field: 'price',
            cellClass: 'align-right',
            editable: true,
            cellEditor: PriceEditor,
            filter: PriceFilter,
            cellRenderer: PriceRenderer
        }
    ]
};

export const reducer = (state = {rowData: []}, action) => {
    switch (action.type) {
        case 'SET_ROW_DATA':
            return {
                ...state,
                rowData: createRowData()
            };
        default:
            return state;
    }
};

export const Context = React.createContext();


// for test data
// the following methods are for creating dummy row data
const createRowData = () => {
    let rowData = [];

    for (let i = 0; i < 14; i++) {
        let newItem = createItem(rowData);
        rowData.push(newItem);
    }

    return rowData;
};

const createItem = (rowData) => {
    return {
        symbol: createUniqueRandomSymbol(rowData),
        price: Math.floor(Math.random() * 100)
    };
};

// creates a unique symbol, eg 'ADG' or 'ZJD'
const createUniqueRandomSymbol = (rowData) => {
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
        rowData.forEach(function (oldItem) {
            if (oldItem.symbol === symbol) {
                isUnique = false;
            }
        });
    }

    return symbol;
};
