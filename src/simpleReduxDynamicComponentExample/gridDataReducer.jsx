export default (state = {rowData: [], currencySymbol: '£', exchangeRate: 1}, action) => {
    switch (action.type) {
        case 'ROW_DATA_CHANGED':
            return {
                ...state,
                rowData: action.rowData,
            };
        case 'CURRENCY_CHANGED':
            return {
                ...state,
                currencySymbol: action.currencySymbol,
                exchangeRate: action.exchangeRate
            };
        default:
            return state;
    }
};