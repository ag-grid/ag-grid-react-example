import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef, useState } from 'react';

ModuleRegistry.register(ClientSideRowModelModule);

interface RowData {
    make: string;
    model: string;
    price: number;
}

const App = () => {
    const gridRef = useRef<AgGridReact<RowData>>(null);

    const [rowData] = useState<RowData[]>([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 }
    ]);
    const [colDefs, setColDefs] = useState<ColDef<RowData>[]>([
        { field: 'make' },
        { field: 'model' },
        { field: 'price', editable: true, valueFormatter: (params) => "$" + params.value.toLocaleString()},
    ]);

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: 600 }}>
            <AgGridReact<RowData>
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs} />
        </div>
    );
};

describe('Edit Cell Grid', () => {

    test('double click cell to edit', async () => {
        render(<App />);

        const porschePrice = await screen.findByText('$72,000')
        expect(porschePrice).toBeDefined();

        // double click to enter edit mode       
        await userEvent.dblClick(porschePrice);

        const input: HTMLInputElement = within(porschePrice).getByLabelText('Input Editor');

        await userEvent.keyboard('100000');

        // press enter to save
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(screen.findByText('$100,000')).toBeDefined();
    });

});
