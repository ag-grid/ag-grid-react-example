import React, {useContext} from "react";
import {Context} from "./store";
import {AgGridReact} from "@ag-grid-community/react";

/*
 * This component serves to display the row data (provided by redux)
 */
export default function GridComponent() {
    const {store, dispatch} = useContext(Context);
    const {columnDefs, rowData} = store;

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    // row data will be provided via redux on this.props.rowData
    return (
        <div style={{height: 400, width: 900, marginTop: 15}}
             className="ag-theme-balham">
            <AgGridReact
                // properties
                columnDefs={columnDefs}
                rowData={rowData}

                defaultColDef={{filter: true}}

                // events
                onGridReady={onGridReady}>
            </AgGridReact>
        </div>
    )
}
