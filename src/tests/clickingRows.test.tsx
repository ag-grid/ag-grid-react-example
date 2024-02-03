import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry, RowClickedEvent } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useCallback, useState } from 'react';
import { describe, expect, test } from 'vitest';

ModuleRegistry.register(ClientSideRowModelModule);
interface RowData {
    make: string;
    model: string;
    price: number;
}

const App = () => {
    const [rowData] = useState<RowData[]>([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 }
    ]);
    const [colDefs, setColDefs] = useState<ColDef<RowData>[]>([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
    ]);

    const [rowClicked, setRowClicked] = useState<RowData | null>(null);
    const [rowDoubleClicked, setRowDoubleClicked] = useState<RowData | null>(null);

    const onRowClicked = useCallback((params: RowClickedEvent) => {
        setRowClicked(params.data);
    }, []);

    const onRowDoubleClicked = useCallback((params: RowClickedEvent) => {
        setRowDoubleClicked(params.data);
    }, []);

    return (
        <div>
            <div data-testid="rowClicked">Row Clicked: {rowClicked?.make}</div>
            <div data-testid="rowDoubleClicked">Row Double Clicked: {rowDoubleClicked?.make}</div>
            <div className="ag-theme-quartz" style={{ height: 400, width: 600 }}>
                <AgGridReact<RowData>
                    rowData={rowData}
                    columnDefs={colDefs}
                    onRowClicked={onRowClicked}
                    onRowDoubleClicked={onRowDoubleClicked} />
            </div>
        </div>
    );
};

describe('Row Clicks Grid', () => {

    // render basic AgGridReact
    test('render grid and click a row', async () => {
        render(<App />);

        const row = await screen.findByText('Ford');
        expect(row).toBeDefined();

        await userEvent.click(row);

        const rowClicked = await screen.findByTestId('rowClicked');
        expect(rowClicked.textContent).toBe('Row Clicked: Ford');
    });

    // render basic AgGridReact
    test('render grid and double click a row', async () => {
        render(<App />);

        const row = await screen.findByText('Porsche');
        expect(row).toBeDefined();

        await userEvent.dblClick(row);

        const rowClicked = await screen.findByTestId('rowDoubleClicked');
        expect(rowClicked.textContent).toBe('Row Double Clicked: Porsche');
    });

});