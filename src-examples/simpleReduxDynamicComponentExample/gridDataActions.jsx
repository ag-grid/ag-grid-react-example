export function updateRowData(rowData) {
    return {
        type: 'ROW_DATA_CHANGED',
        rowData
    }
}
export function setCurrency(currencySymbol, exchangeRate) {
    return {
        type: 'CURRENCY_CHANGED',
        currencySymbol,
        exchangeRate
    }
}