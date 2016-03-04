import ReactDOM from 'react-dom';
import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import RefData from './RefData';
import RowDataFactory from './RowDataFactory';
import ColDefFactory from './ColDefFactory.jsx';
import './MyApp.css';

export default class MyApp extends React.Component {

    constructor() {
        super();

        this.state = {
            quickFilterText: null,
            showGrid: true,
            showToolPanel: false,
            columnDefs: new ColDefFactory().createColDefs(),
            rowData: new RowDataFactory().createRowData(),
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            }
        };

        // the grid options are optional, because you can provide every property
        // to the grid via standard React properties. however, the react interface
        // doesn't block you from using the standard JavaScript interface if you
        // wish. Maybe you have the gridOptions stored as JSON on your server? If
        // you do, the providing the gridOptions as a standalone object is just
        // what you want!
        this.gridOptions = {
            // this is how you listen for events using gridOptions
            onModelUpdated: function() {
                console.log('event onModelUpdated received');
            },
            // this is a simple property
            rowBuffer: 10 // no need to set this, the default is fine for almost all scenarios
        };
    }

    onShowGrid(show) {
        this.setState({
            showGrid: show
        });
    }

    onToggleToolPanel(event) {
        this.setState({showToolPanel: event.target.checked});
    }

    onReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    selectAll() {
        this.api.selectAll();
    }

    deselectAll() {
        this.api.deselectAll();
    }

    setCountryVisible(visible) {
        this.columnApi.setColumnVisible('country', visible);
    }

    onQuickFilterText(event) {
        this.setState({quickFilterText: event.target.value});
    }

    onCellClicked(event) {
        console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
    }

    onRowSelected(event) {
        console.log('onRowSelected: ' + event.node.data.name);
    }

    onRefreshData() {
        var newRowData = new RowDataFactory().createRowData();
        this.setState({
            rowData: newRowData
        });
    }

    render() {
        return (
            // ag-Grid comes with a React Component waiting to be used
            <AgGridReact

                // listen for events with React callbacks
                onRowSelected={this.onRowSelected.bind(this)}
                onCellClicked={this.onCellClicked.bind(this)}

                // binding to properties within React State or Props
                showToolPanel={this.state.showToolPanel}
                quickFilterText={this.state.quickFilterText}
                icons={this.state.icons}

                // column definitions and row data are immutable, the grid
                // will update when these lists change
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}

                // or provide props the old way with no binding
                rowSelection="multiple"
                enableSorting="true"
                enableFilter="true"
                rowHeight="22"
            />
        );
    }

    render() {
        var gridTemplate;
        var bottomHeaderTemplate;
        var topHeaderTemplate;

        topHeaderTemplate = (
            <div>
                <div style={{float: 'right'}}>
                    <input type="text" onChange={this.onQuickFilterText.bind(this)} placeholder="Type text to filter..."/>
                    <button id="btDestroyGrid" disabled={!this.state.showGrid} onClick={this.onShowGrid.bind(this, false)}>Destroy Grid</button>
                    <button id="btCreateGrid" disabled={this.state.showGrid} onClick={this.onShowGrid.bind(this, true)}>Create Grid</button>
                </div>
                <div style={{padding: '4px'}}>
                    <b>Employees Skills and Contact Details</b> <span id="rowCount"/>
                </div>
            </div>
        );

        // showing the bottom header and grid is optional, so we put in a switch
        if (this.state.showGrid) {
            bottomHeaderTemplate = (
                <div>
                    <div style={{padding: 4}} className={'toolbar'}>
                        <span>
                            Grid API:
                            <button onClick={this.selectAll.bind(this)}>Select All</button>
                            <button onClick={this.deselectAll.bind(this)}>Clear Selection</button>
                        </span>
                        <span style={{marginLeft: 20}}>
                            Column API:
                            <button onClick={this.setCountryVisible.bind(this, false)}>Hide Country Column</button>
                            <button onClick={this.setCountryVisible.bind(this, true)}>Show Country Column</button>
                        </span>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div style={{padding: 4}} className={'toolbar'}>
                        <label>
                            <input type="checkbox" onChange={this.onToggleToolPanel.bind(this)}/>
                            Show Tool Panel
                        </label>
                        <button onClick={this.onRefreshData.bind(this)}>Refresh Data</button>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
            );
            gridTemplate = (
                <div style={{height: 400}} className="ag-fresh">
                    <AgGridReact
                        // gridOptions is optional - it's possible to provide
                        // all values as React props
                        gridOptions={this.gridOptions}

                        // listening for events
                        onReady={this.onReady.bind(this)}
                        onRowSelected={this.onRowSelected.bind(this)}
                        onCellClicked={this.onCellClicked.bind(this)}

                        // binding to simple properties
                        showToolPanel={this.state.showToolPanel}
                        quickFilterText={this.state.quickFilterText}

                        // binding to an object property
                        icons={this.state.icons}

                        // binding to array properties
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}

                        // no binding, just providing harde coded strings for the properties
                        rowSelection="multiple"
                        enableColResize="true"
                        enableSorting="true"
                        enableFilter="true"
                        groupHeaders="true"
                        rowHeight="22"
                        debug="true"
                    />
                </div>
            );
        }

        return <div style={{width: '800px'}}>
            <div style={{padding: '4px'}}>
                {topHeaderTemplate}
                {bottomHeaderTemplate}
                {gridTemplate}
            </div>
        </div>;
    }

}
