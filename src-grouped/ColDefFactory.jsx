export default class ColDefFactory {
    createColDefs() {
        return [
            {headerName: "Athlete", field: "athlete", width: 200},
            {headerName: "Age", field: "age", width: 90},
            {headerName: "Gold", field: "gold", width: 100, aggFunc: 'sum'},
            {headerName: "Silver", field: "silver", width: 100, aggFunc: 'sum'},
            {headerName: "Bronze", field: "bronze", width: 100, aggFunc: 'sum'},
            {headerName: "Total", field: "total", width: 100, aggFunc: 'sum'},
            {headerName: "Country", field: "country", width: 120, rowGroupIndex: 0},
            {headerName: "Year", field: "year", width: 90},
            {headerName: "Date", field: "date", width: 110},
            {headerName: "Sport", field: "sport", width: 110}
        ];
    }
}

