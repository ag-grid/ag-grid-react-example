import React, {Component} from "react";
import {connect} from "react-redux";
import {AgGridReact} from "@ag-grid-community/react";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {ExcelExportModule} from "@ag-grid-enterprise/excel-export";
import {FiltersToolPanelModule} from "@ag-grid-enterprise/filter-tool-panel";
import {SparklinesModule} from "@ag-grid-enterprise/sparklines";
import {GridChartsModule} from "@ag-grid-enterprise/charts";
import {MasterDetailModule} from "@ag-grid-enterprise/master-detail";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {MultiFilterModule} from "@ag-grid-enterprise/multi-filter";
import {RangeSelectionModule} from "@ag-grid-enterprise/range-selection";
import {RichSelectModule} from "@ag-grid-enterprise/rich-select";
import {RowGroupingModule} from "@ag-grid-enterprise/row-grouping";
import {ServerSideRowModelModule} from "@ag-grid-enterprise/server-side-row-model";
import {SetFilterModule} from "@ag-grid-enterprise/set-filter";
import {SideBarModule} from "@ag-grid-enterprise/side-bar";
import {StatusBarModule} from "@ag-grid-enterprise/status-bar";
import {ViewportRowModelModule} from "@ag-grid-enterprise/viewport-row-model";
import {ClipboardModule} from "@ag-grid-enterprise/clipboard";

import PriceRenderer from "./PriceRenderer";


/*
 * This component serves to display the row data (provided by redux)
 */
class GridComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    field: 'symbol'
                },
                {
                    field: 'price',
                    cellClass: 'align-right',
                    cellRenderer: PriceRenderer
                }
            ]
        };

        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    // row data will be provided via redux on this.props.rowData
    render() {
        return (
            <div style={{height: 400, width: 900, marginTop: 15}}
                 className="ag-theme-alpine">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}
                    modules={[
                        ClientSideRowModelModule,
                        ColumnsToolPanelModule,
                        ExcelExportModule,
                        FiltersToolPanelModule,
                        SparklinesModule,
                        GridChartsModule,
                        MasterDetailModule,
                        MenuModule,
                        MultiFilterModule,
                        RangeSelectionModule,
                        RichSelectModule,
                        RowGroupingModule,
                        ServerSideRowModelModule,
                        SetFilterModule,
                        SideBarModule,
                        StatusBarModule,
                        ViewportRowModelModule,
                        ClipboardModule
                    ]}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        )
    }
}

// pull off row data changes
export default connect(
    (state) => {
        return {
            rowData: state.rowData
        }
    }
)(GridComponent);
