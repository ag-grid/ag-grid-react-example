import React, {Component} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import RowDataFactory from "./RowDataFactory";
import DateComponent from "./DateComponent.jsx";
import SkillsCellRenderer from './SkillsCellRenderer.jsx';
import NameCellEditor from './NameCellEditor.jsx';
import ProficiencyCellRenderer from './ProficiencyCellRenderer.jsx';
import RefData from './RefData';
import SkillsFilter from './SkillsFilter.jsx';
import ProficiencyFilter from './ProficiencyFilter.jsx';
import HeaderGroupComponent from './HeaderGroupComponent.jsx';
import SortableHeaderComponent from './SortableHeaderComponent.jsx';

import "./RichGridDeclarativeExample.css";
// take this line out if you do not want to use ag-Grid-Enterprise
import "ag-grid-enterprise";

export default class RichGridDeclarativeExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quickFilterText: null,
            sideBar: false,
            rowData: new RowDataFactory().createRowData(),
            rowCount: null,
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>'
            }
        };
    }

    /* Grid Events we're listening to */
    onGridReady = (params) => {
        this.api = params.api;
        this.columnApi = params.columnApi;

        this.calculateRowCount();
    };

    onCellClicked = (event) => {
        console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
    };

    onRowSelected = (event) => {
        console.log('onRowSelected: ' + event.node.data.name);
    };

    /* Demo related methods */
    onToggleSidebar = (event) => {
        this.setState({sideBar: event.target.checked});
    };

    deselectAll() {
        this.api.deselectAll();
    }

    onQuickFilterText = (event) => {
        this.setState({quickFilterText: event.target.value});
    };

    onRefreshData = () => {
        this.setState({
            rowData: new RowDataFactory().createRowData()
        });
    };

    invokeSkillsFilterMethod = () => {
        let skillsFilter = this.api.getFilterInstance('skills');
        let componentInstance = skillsFilter.getFrameworkComponentInstance();
        componentInstance.helloFromSkillsFilter();
    };

    dobFilter = () => {
        let dateFilterComponent = this.api.getFilterInstance('dob');
        dateFilterComponent.setModel({
            type: 'equals',
            dateFrom: '2000-01-01'
        });

        // as the date filter is a React component, and its using setState internally, we need
        // to allow time for the state to be set (as setState is an async operation)
        // simply wait for the next tick
        setTimeout(() => {
            this.api.onFilterChanged();
        });
    };

    calculateRowCount = () => {
        if (this.api && this.state.rowData) {
            const model = this.api.getModel();
            const totalRows = this.state.rowData.length;
            const processedRows = model.getRowCount();
            this.setState({
                rowCount: processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString()
            });
        }
    };

    static countryCellRenderer(params) {
        if (params.value) {
            return `<img border='0' width='15' height='10' style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/${RefData.COUNTRY_CODES[params.value]}.png'> ${params.value}`;
        } else {
            return null;
        }
    }

    static dateCellRenderer(params) {
        return RichGridDeclarativeExample.pad(params.value.getDate(), 2) + '/' +
            RichGridDeclarativeExample.pad(params.value.getMonth() + 1, 2) + '/' +
            params.value.getFullYear();
    }

    static pad(num, totalStringSize) {
        let asString = num + "";
        while (asString.length < totalStringSize) asString = "0" + asString;
        return asString;
    }

    render() {
        return (
            <div style={{width: '900px'}}>
                <h1>Rich Grid with Declarative Markup Example</h1>
                <div style={{display: "inline-block", width: "100%"}}>
                    <div style={{float: "left"}}>
                        <b>Employees Skills and Contact Details: </b>{ this.state.rowCount }
                    </div>
                </div>
                <div style={{marginTop: 10}}>
                    <div>
                        <span>
                            Grid API:
                            <button onClick={() => {
                                this.api.selectAll()
                            }} className="btn btn-primary">Select All</button>
                            <button onClick={() => {
                                this.api.deselectAll()
                            }} className="btn btn-primary">Clear Selection</button>
                        </span>
                        <span style={{float: "right"}}>
                            Column API:
                            <button onClick={() => {
                                this.columnApi.setColumnVisible('country', false)
                            }} className="btn btn-primary">Hide Country Column</button>
                            <button onClick={() => {
                                this.columnApi.setColumnVisible('country', true)
                            }} className="btn btn-primary">Show Country Column</button>
                        </span>
                    </div>
                    <div style={{display: "inline-block", width: "100%", marginTop: 10, marginBottom: 10}}>
                        <div style={{float: "left"}}>
                            <button onClick={this.onRefreshData} className="btn btn-primary">Refresh Data</button>
                        </div>
                        <div style={{float: "right"}}>
                            Filter API:
                            <button onClick={this.invokeSkillsFilterMethod}
                                    className="btn btn-primary">Invoke Skills Filter Method
                            </button>
                            <button onClick={this.dobFilter} className="btn btn-primary">DOB equals to 01/01/2000
                            </button>
                        </div>
                    </div>
                    <div style={{display: "inline-block", width: "100%", marginTop: 10, marginBottom: 10}}>
                        <div style={{float: "left"}}>
                            <label htmlFor="sideBarToggle">Show Side Bar&nbsp;</label>
                            <input type="checkbox" id="sideBarToggle" onChange={this.onToggleSidebar} style={{marginRight: 5}}/>
                        </div>
                        <div style={{float: "right", marginLeft: 20}}>
                            <label htmlFor="quickFilter">Quick Filter:&nbsp;</label>
                            <input type="text" id="quickFilter" onChange={this.onQuickFilterText} placeholder="Type text to filter..."/>
                        </div>
                    </div>
                    <div style={{height: 400, width: 900}} className="ag-theme-balham">
                        <AgGridReact
                            // listening for events
                            onGridReady={this.onGridReady}
                            onRowSelected={this.onRowSelected}
                            onCellClicked={this.onCellClicked}
                            onModelUpdated={this.calculateRowCount}

                            // binding to simple properties
                            sideBar={this.state.sideBar}
                            quickFilterText={this.state.quickFilterText}

                            // binding to an object property
                            icons={this.state.icons}

                            // binding to array properties
                            rowData={this.state.rowData}

                            // no binding, just providing hard coded strings for the properties
                            // boolean properties will default to true if provided (ie suppressRowClickSelection => suppressRowClickSelection="true")
                            suppressRowClickSelection
                            rowSelection="multiple"
                            groupHeaders

                            // setting grid wide date component
                            dateComponentFramework={DateComponent}

                            // setting default column properties
                            defaultColDef={{
                                resizable: true,
                                sortable: true,
                                filter: true,
                                headerComponentFramework: SortableHeaderComponent,
                                headerComponentParams: {
                                    menuIcon: 'fa-bars'
                                }
                            }}>
                            <AgGridColumn headerName="#" width={30}
                                          checkboxSelection sortable={false} suppressMenu filter={false} pinned>
                            </AgGridColumn>
                            <AgGridColumn headerName="Employee" headerGroupComponentFramework={HeaderGroupComponent}>
                                <AgGridColumn field="name" width={150}
                                              cellEditorFramework={NameCellEditor}
                                              enableRowGroup enablePivot pinned editable/>
                                <AgGridColumn field="country" width={150}
                                              cellRenderer={RichGridDeclarativeExample.countryCellRenderer}
                                              filterParams={{
                                                  cellRenderer: RichGridDeclarativeExample.countryCellRenderer,
                                                  cellHeight: 20
                                              }}
                                              enableRowGroup enablePivot pinned editable/>
                                <AgGridColumn field="dob" width={175} headerName="DOB" filter="agDateColumnFilter"
                                              pinned columnGroupShow="open"
                                              cellRenderer={RichGridDeclarativeExample.dateCellRenderer}/>
                            </AgGridColumn>
                            <AgGridColumn headerName="IT Skills">
                                <AgGridColumn field="skills" width={120} enableRowGroup enablePivot sortable={false}
                                              cellRendererFramework={SkillsCellRenderer}
                                              filterFramework={SkillsFilter}/>
                                <AgGridColumn field="proficiency" width={160} enableValue
                                              cellRendererFramework={ProficiencyCellRenderer}
                                              filterFramework={ProficiencyFilter}/>
                            </AgGridColumn>
                            <AgGridColumn headerName="Contact">
                                <AgGridColumn field="mobile" width={150} filter="text"/>
                                <AgGridColumn field="landline" width={150} filter="text"/>
                                <AgGridColumn field="address" width={500} filter="text"/>
                            </AgGridColumn>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        );
    }
}
