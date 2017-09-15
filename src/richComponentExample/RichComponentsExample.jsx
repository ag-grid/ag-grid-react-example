import React, {Component} from "react";

import {AgGridReact} from "ag-grid-react";
import RatioRenderer from "./RatioRenderer";
import ClickableRenderer from "./ClickableRenderer";

export default class RichComponentsExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowData: this.createRowData(),
            columnDefs: this.createColumnDefs()
        };

        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createColumnDefs() {
        return [
            {
                headerName: "Name",
                field: "name",
                width: 200
            },
            {
                headerName: "Ratio Component",
                field: "ratios",
                cellRendererFramework: RatioRenderer,
                width: 350
            },
            {
                headerName: "Clickable Component",
                field: "name",
                cellRendererFramework: ClickableRenderer,
                width: 250
            }
        ];    }

    createRowData() {
        return [
            {name: 'Homer Simpson', ratios: {top: 0.25, bottom: 0.75}},
            {name: 'Marge Simpson', ratios: {top: 0.67, bottom: 0.39}},
            {name: 'Bart Simpson', ratios: {top: 0.82, bottom: 0.47}},
            {name: 'Lisa Simpson', ratios: {top: 0.39, bottom: 1}},
            {name: 'Barney', ratios: {top: 0.22, bottom: 0.78}},
            {name: 'Sideshow Bob', ratios: {top: 0.13, bottom: 0.87}},
            {name: 'Ned Flanders', ratios: {top: 0.49, bottom: 0.51}},
            {name: 'Milhouse', ratios: {top: 0.69, bottom: 0.31}},
            {name: 'Apu', ratios: {top: 0.89, bottom: 0.11}},
            {name: 'Moe', ratios: {top: 0.64, bottom: 0.36}},
            {name: 'Smithers', ratios: {top: 0.09, bottom: 0.91}},
            {name: 'Edna Krabappel', ratios: {top: 0.39, bottom: 0.61}},
            {name: 'Krusty', ratios: {top: 0.74, bottom: 0.26}}
        ];
    }

    render() {
        return (
            <div style={{height: 370, width: 900}} className="ag-fresh">
                <h1>Dynamic React Components - Richer Example</h1>
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    gridOptions={this.state.gridOptions}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
                <div className="row">
                    <div className="col-sm-12">
                        <h5>This example demonstrates Dynamic React Components with ag-Grid. Functionally similar
                            to the <a href="/dynamic">Dynamic React Components Example</a> but with slightly richer components.</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">React Functionality</h4>
                                <p className="card-text">Utilise React Components within ag-Grid</p>
                                <a target="_blank" href="https://www.ag-grid.com/best-react-data-grid/?framework=react" className="btn btn-primary">React with ag-Grid</a>
                                <a target="_blank" href="https://www.ag-grid.com/javascript-grid-cell-rendering-components/?framework=react" className="btn btn-primary">React Renderers</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
