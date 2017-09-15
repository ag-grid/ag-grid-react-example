import React, {Component} from "react";

import {AgGridReact} from "ag-grid-react";
import SquareRenderer from "./SquareRenderer";
import CubeRenderer from "./CubeRenderer";
import ParamsRenderer from "./ParamsRenderer";
import CurrencyRenderer from "./CurrencyRenderer";
import ChildMessageRenderer from "./ChildMessageRenderer";

export default class DynamicComponentsExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gridOptions: {
                context: {
                    componentParent: this
                }
            },

            rowData: DynamicComponentsExample.createRowData(),

            columnDefs: DynamicComponentsExample.createColumnDefs()
        };

        this.onGridReady = this.onGridReady.bind(this);
        this.refreshEvenRowsCurrencyData = this.refreshEvenRowsCurrencyData.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    methodFromParent(cell) {
        alert(`Parent Component Method from ${cell}!`);
    }

    refreshEvenRowsCurrencyData() {
        this.gridApi.forEachNode(rowNode => {
            if (rowNode.data.value % 2 === 0) {
                rowNode.setDataValue('currency', rowNode.data.value + Number(Math.random().toFixed(2)))
            }
        });

        this.gridApi.refreshCells({
            columns: ['currency']
        })
    }

    static createColumnDefs() {
        return [
            {headerName: "Row", field: "row", width: 100},
            {
                headerName: "Square",
                field: "value",
                cellRendererFramework: SquareRenderer,
                editable: true,
                colId: "square",
                width: 100
            },
            {
                headerName: "Cube",
                field: "value",
                cellRendererFramework: CubeRenderer,
                colId: "cube",
                width: 100
            },
            {
                headerName: "Row Params",
                field: "row",
                cellRendererFramework: ParamsRenderer,
                colId: "params",
                width: 215
            },
            {
                headerName: "Currency",
                field: "currency",
                cellRendererFramework: CurrencyRenderer,
                colId: "currency",
                width: 135
            },
            {
                headerName: "Child/Parent",
                field: "value",
                cellRendererFramework: ChildMessageRenderer,
                colId: "params",
                width: 120
            }
        ];
    }

    static createRowData() {
        let rowData = [];

        for (let i = 0; i < 15; i++) {
            rowData.push({
                row: "Row " + i,
                value: i,
                currency: 1 + Number(Math.random()).toFixed(2)
            });
        }

        return rowData;
    }

    render() {
        return (
            <div style={{height: 400, width: 900}}
                 className="ag-fresh">
                <h1>Dynamic React Component Example</h1>
                <button onClick={this.refreshEvenRowsCurrencyData} style={{marginBottom: 10}} className="btn btn-primary">Refresh Even Row Currency Data</button>
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    gridOptions={this.state.gridOptions}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
                <div className="row">
                    <div className="col-sm-12"><h1>Dynamic React Component Example</h1></div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h5>This example demonstrates Dynamic React Components with ag-Grid, Parent/Child Communication (cell component to parent grid component), as well as
                            dynamic data updates of the <code>Currency</code> column.</h5>
                        <p><span style={{fontWeight: "bold"}}>Square, Cube, Row Params, Currency and Child/Parent</span>: React Components within the Grid</p>
                        <p><span style={{fontWeight: "bold"}}>Currency (Pipe)</span>: An React Component mimicking a Currency Pipe, dynamically updated with the button above.</p>
                        <p><span style={{fontWeight: "bold"}}>Child/Parent</span>: Demonstrates the Child Cell Component communicating with the Parent Grid Component.</p>
                        <p><span style={{fontWeight: "bold"}}>Refresh Even Row Currency Data</span>: Dynamically Updates Event Rows Currency Value. Only the Currency column will be re-rendered.</p>
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
                                <a target="_blank" href="https://www.ag-grid.com/javascript-grid-data-update/" className="btn btn-primary">Updating Data</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
