import React from "react";
import {AgGridReact} from "ag-grid-react";
import "./myApp.css";
import "ag-grid-enterprise";


export class DetailPanelCellRenderer extends React.Component{
    


    render (){
        return <div><div class="full-width-panel">
              <div class="full-width-details">
                <div class="full-width-detail"><b>Name: </b>+parentRecord.name+</div>
                <div class="full-width-detail"><b>Account: </b>+parentRecord.account+</div>
              </div>
              <div class="full-width-grid"></div>
              <div class="full-width-grid-toolbar">
                   <img class="full-width-phone-icon" src="https://www.ag-grid.com/images/phone.png"/>
                   <button><img src="https://www.ag-grid.com/images/fire.png"/></button>
                   <button><img src="https://www.ag-grid.com/images/frost.png"/></button>
                   <button><img src="https://www.ag-grid.com/images/sun.png"/></button>
                   <input class="full-width-search" placeholder="Search..."/>
              </div>
            </div></div>;
    }
}



// take this line out if you do not want to use ag-Grid-Enterprise
// a list of names we pick from when generating data
var firstnames = ['Sophia','Emma','Olivia','Isabella','Mia','Ava','Lily','Zoe','Emily','Chloe','Layla','Madison','Madelyn','Abigail','Aubrey','Charlotte','Amelia','Ella','Kaylee','Avery','Aaliyah','Hailey','Hannah','Addison','Riley','Harper','Aria','Arianna','Mackenzie','Lila','Evelyn','Adalyn','Grace','Brooklyn','Ellie','Anna','Kaitlyn','Isabelle','Sophie','Scarlett','Natalie','Leah','Sarah','Nora','Mila','Elizabeth','Lillian','Kylie','Audrey','Lucy','Maya'];
var lastnames = ['Smith','Jones','Williams','Taylor','Brown','Davies','Evans','Wilson','Thomas','Johnson'];

var images = ['niall','sean','alberto','statue','horse'];
// each call gets a unique id, nothing to do with the grid, just help make the sample
// data more realistic
var callIdSequence = 555;

// method creates all the data, both the top level grid and the lower level grids
function createRowData() {
    var rowData = [];

    for (var i = 0; i < 20; i++) {
        var firstName = firstnames[Math.floor(Math.random()*firstnames.length)];
        var lastName = lastnames[Math.floor(Math.random()*lastnames.length)];

        var image = images[i % images.length];

        var totalDuration = 0;

        var callRecords = [];
        // call count is random number between 20 and 120
        var callCount = Math.floor(Math.random() * 100) + 20;
        for (var j = 0; j<callCount; j++) {
            // duration is random number between 20 and 120
            var callDuration = Math.floor(Math.random() * 100) + 20;
            var callRecord = {
                callId: callIdSequence++,
                duration: callDuration,
                switchCode: 'SW' + Math.floor(Math.random() * 10),
                // 50% chance of in vs out
                direction: (Math.random()>.5) ? 'In' : 'Out',
                // made up number
                number:  '(0' + Math.floor(Math.random() * 10) + ') ' + Math.floor(Math.random() * 100000000)
            };
            callRecords.push(callRecord);
            totalDuration += callDuration;
        }

        var record = {
            name: firstName + ' ' + lastName,
            account: i + 177000,
            totalCalls: callCount,
            image: image,
            // convert from seconds to minutes
            totalMinutes: totalDuration / 60,
            callRecords: callRecords
        };
        rowData.push(record);
    }

    return rowData;
}

var minuteCellFormatter = function (params) {
    return params.value.toLocaleString() + 'm';
};

var secondCellFormatter= function (params) {
    return params.value.toLocaleString() + 's';
};

var masterColumnDefs = [
    {headerName: 'Name', field: 'name',
        // left column is going to act as group column, with the expand / contract controls
        cellRenderer: 'group',
        // we don't want the child count - it would be one each time anyway as each parent
        // not has exactly one child node
        cellRendererParams: { suppressCount: true }
    },
    {headerName: 'Account', field: 'account'},
    {headerName: 'Calls', field: 'totalCalls'},
    {headerName: 'Minutes', field: 'totalMinutes', cellFormatter: minuteCellFormatter}
];

var detailColumnDefs = [
    {headerName: 'Call ID', field: 'callId', cellClass: 'call-record-cell'},
    {headerName: 'Direction', field: 'direction', cellClass: 'call-record-cell'},
    {headerName: 'Number', field: 'number', cellClass: 'call-record-cell'},
    {headerName: 'Duration', field: 'duration', cellClass: 'call-record-cell', cellFormatter: secondCellFormatter},
    {headerName: 'Switch', field: 'switchCode', cellClass: 'call-record-cell'}
];

var rowData = createRowData();
export default class MyApp extends React.Component {

    constructor() {
        super();

        this.state = {
            quickFilterText: null,
            showGrid: true,
            showToolPanel: false,
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
            columnDefs: masterColumnDefs,
            rowData: rowData,
            //We register the react date component that ag-grid will use to render
            // this is how you listen for events using gridOptions
            onModelUpdated: function () {
                console.log('event onModelUpdated received');
            },
            defaultColDef : {
                headerComponentParams : {
                    menuIcon: 'fa-bars'
                }
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

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        params.api.sizeColumnsToFit();
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

    invokeSkillsFilterMethod() {
        var skillsFilter = this.api.getFilterInstance('skills');
        var componentInstance = skillsFilter.getFrameworkComponentInstance();
        componentInstance.helloFromSkillsFilter();
    }

    dobFilter () {
        let dateFilterComponent = this.gridOptions.api.getFilterInstance('dob');
        dateFilterComponent.setFilterType('equals');
        dateFilterComponent.setDateFrom('2000-01-01');
        this.gridOptions.api.onFilterChanged();

    }

    onIsFullWidthCell (rowNode) {
        return rowNode.level === 1;
    }

    onGetRowHeight (params) {
        var rowIsDetailRow = params.node.level===1;
        // return 100 when detail row, otherwise return 25
        return rowIsDetailRow ? 75 : 25;
    }

    onGetNodeChildDetails (record) {
        if (record.callRecords) {
            return {
                group: true,
                // the key is used by the default group cellRenderer
                key: record.name,
                // provide ag-Grid with the children of this group
                children: [record.callRecords],
                // for demo, expand the third row by default
                expanded: record.account === 177005
            };
        } else {
            return null;
        }
    }

    render() {
        var gridTemplate;
        var bottomHeaderTemplate;
        var topHeaderTemplate;

        topHeaderTemplate = (
            <div>
                <div style={{float: 'right'}}>
                    <input type="text" onChange={this.onQuickFilterText.bind(this)}
                           placeholder="Type text to filter..."/>
                    <button id="btDestroyGrid" disabled={!this.state.showGrid}
                            onClick={this.onShowGrid.bind(this, false)}>Destroy Grid
                    </button>
                    <button id="btCreateGrid" disabled={this.state.showGrid} onClick={this.onShowGrid.bind(this, true)}>
                        Create Grid
                    </button>
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
                        <span>
                        <label>
                            <input type="checkbox" onChange={this.onToggleToolPanel.bind(this)}/>
                            Show Tool Panel
                        </label>
                        <button onClick={this.onRefreshData.bind(this)}>Refresh Data</button>
                            </span>
                        <span style={{marginLeft: 20}}>
                            Filter API:
                            <button onClick={this.invokeSkillsFilterMethod.bind(this, false)}>Invoke Skills Filter Method</button>
                            <button onClick={this.dobFilter.bind(this)}>DOB equals to 01/01/2000</button>
                        </span>
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
                        onGridReady={this.onGridReady.bind(this)}
                        onRowSelected={this.onRowSelected.bind(this)}
                        onCellClicked={this.onCellClicked.bind(this)}

                        // binding to simple properties
                        showToolPanel={this.state.showToolPanel}
                        quickFilterText={this.state.quickFilterText}

                        // binding to an object property
                        icons={this.state.icons}


                        // no binding, just providing hard coded strings for the properties
                        suppressRowClickSelection="true"
                        rowSelection="multiple"
                        enableColResize="true"
                        enableSorting="true"
                        enableFilter="true"
                        groupHeaders="true"
                        rowHeight="22"
                        // we cannot filter on the groups, as filters work on the child nodes, and in this example
                        // the child nodes are not aggregations of the parent.
                        suppressMenuFilterPanel="true"
                        isFullWidthCell = {this.onIsFullWidthCell.bind(this)}
                        // see ag-Grid docs cellRenderer for details on how to build cellRenderers
                        fullWidthCellRendererFramework= {DetailPanelCellRenderer}
                        getRowHeight={this.onGetRowHeight.bind(this)}
                        getNodeChildDetails={this.onGetNodeChildDetails.bind(this)}
                    />
                </div>
            );
        }

        return <div style={{width: '1024px'}}>
            <div style={{padding: '4px'}}>
                {topHeaderTemplate}
                {bottomHeaderTemplate}
                {gridTemplate}
            </div>
        </div>;
    }

}