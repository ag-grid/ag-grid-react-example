import React, {Component} from "react";

import {AgGridReact} from "ag-grid-react";
import MoodRenderer from "./MoodRenderer";
import MoodEditor from "./MoodEditor";
import NumericEditor from "./NumericEditor";

export default class EditorComponentsExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowData: EditorComponentsExample.createRowData(),
            columnDefs: EditorComponentsExample.createColumnDefs()
        };

        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    static createColumnDefs() {
        return [
            {
                headerName: "Name",
                field: "name",
                width: 300,
                editable: true,
                cellEditor: 'richSelect',
                cellEditorParams: {
                    values: [
                        "Bob",
                        "Harry",
                        "Sally",
                        "Mary",
                        "John",
                        "Jack",
                        "Sue",
                        "Sean",
                        "Niall",
                        "Albert",
                        "Fred",
                        "Jenny",
                        "Larry"
                    ]
                }
            },
            {
                headerName: "Mood",
                field: "mood",
                cellRendererFramework: MoodRenderer,
                cellEditorFramework: MoodEditor,
                editable: true,
                width: 250
            },
            {
                headerName: "Numeric",
                field: "number",
                cellEditorFramework: NumericEditor,
                editable: true,
                width: 250
            }
        ];
    }

    static createRowData() {
        return [
            {name: "Bob", mood: "Happy", number: 10},
            {name: "Harry", mood: "Sad", number: 3},
            {name: "Sally", mood: "Happy", number: 20},
            {name: "Mary", mood: "Sad", number: 5},
            {name: "John", mood: "Happy", number: 15},
            {name: "Jack", mood: "Happy", number: 25},
            {name: "Sue", mood: "Sad", number: 43},
            {name: "Sean", mood: "Sad", number: 1335},
            {name: "Niall", mood: "Happy", number: 2},
            {name: "Alberto", mood: "Happy", number: 123},
            {name: "Fred", mood: "Sad", number: 532},
            {name: "Jenny", mood: "Happy", number: 34},
            {name: "Larry", mood: "Happy", number: 13},
        ];
    }

    render() {
        return (
            <div style={{height: 370, width: 900}}
                 className="ag-fresh">
                <h1>Cell Editor Component Example</h1>
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
                <div className="row">
                    <div className="col-sm-12"><h1>Cell Editor Component Example</h1></div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h5>This example demonstrates React Editor Components within ag-Grid, as well as an example using the built in Rich Select editor.</h5>
                        <p><span style={{fontWeight: "bold"}}>Name</span>: Utilises the built in <code>RichSelect</code> editor</p>
                        <p><span style={{fontWeight: "bold"}}>Mood</span>: A Custom React Editor demonstrating popup functionality, with full keyboard control.</p>
                        <p><span style={{fontWeight: "bold"}}>Numeric</span>: A Custom React Editor demonstrating pre & post validation. Only numeric characters are allowed,
                            and numbers greater than 1000000 will be rejected.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">React Functionality</h4>
                                <p className="card-text">Utilise React Components within ag-Grid</p>
                                <a target="_blank" href="https://www.ag-grid.com/javascript-grid-cell-editing/?framework=react" className="btn btn-primary">Cell Editing</a>
                                <a target="_blank" href="https://www.ag-grid.com/javascript-grid-cell-editor/?framework=react" className="btn btn-primary">Editor Components</a>
                                <a target="_blank" href="https://www.ag-grid.com/best-react-data-grid/?framework=react" className="btn btn-primary">React with ag-Grid</a>
                                <a target="_blank" href="https://www.ag-grid.com/javascript-grid-cell-editor/?framework=react#reactCellEditing" className="btn btn-primary">React Editor Components</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
};
