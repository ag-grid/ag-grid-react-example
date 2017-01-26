import React from "react";
import {AgGridReact} from "ag-grid-react";
import ColDefFactory from "./ColDefFactory.jsx";
import "./myApp.css";

// take this line out if you do not want to use ag-Grid-Enterprise
import "ag-grid-enterprise";


export default class MyApp extends React.Component {

    constructor() {
        super();

        this.state = {
            showToolPanel: false,
            columnDefs: new ColDefFactory().createColDefs(),
            rowData: null,
        };

        this.gridOptions = {
            groupRowInnerRenderer: function (params) {
                var FLAG_CODES = {
                    'Ireland': 'ie',
                    'United States': 'us',
                    'Russia': 'ru',
                    'Australia': 'au',
                    'Canada': 'ca',
                    'Norway': 'no',
                    'China': 'cn',
                    'Zimbabwe': 'zw',
                    'Netherlands': 'nl',
                    'South Korea': 'kr',
                    'Croatia': 'hr',
                    'France': 'fr'
                };

                var flagCode = FLAG_CODES[params.node.key];

                var html = '';
                if (flagCode) {
                    html += '<img class="flag" border="0" width="20" height="15" src="https://flags.fmcdn.net/data/flags/mini/' + flagCode + '.png">'
                }

                html += '<span class="groupTitle"> COUNTRY_NAME</span>'.replace('COUNTRY_NAME', params.node.key);
                html += '<span class="medal gold"> Gold: GOLD_COUNT</span>'.replace('GOLD_COUNT', params.data.gold);
                html += '<span class="medal silver"> Silver: SILVER_COUNT</span>'.replace('SILVER_COUNT', params.data.silver);
                html += '<span class="medal bronze"> Bronze: BRONZE_COUNT</span>'.replace('BRONZE_COUNT', params.data.bronze);

                return html;
            }
        };
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;

        var that = this;
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', '/olympicWinners.json');
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var httpResult = JSON.parse(httpRequest.responseText);
                that.api.setRowData(httpResult);
            }
        };

    }

    render() {
        var gridTemplate = (
            <div style={{height: 400}} className="ag-fresh">
                <AgGridReact
                    // gridOptions is optional - it's possible to provide
                    // all values as React props
                    gridOptions={this.gridOptions}

                    // listening for events
                    onGridReady={this.onGridReady.bind(this)}

                    // binding to array properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}

                    groupUseEntireRow="true"
                />
            </div>
        );

        return <div style={{width: '800px'}}>
            <div>
                {gridTemplate}
            </div>
        </div>;
    }

}
