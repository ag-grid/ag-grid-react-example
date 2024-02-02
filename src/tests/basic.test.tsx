import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { render, screen } from '@testing-library/react';
import React, { useRef, useState } from 'react';

import { expect, describe, test } from 'vitest';

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

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: 600 }}>
            <AgGridReact<RowData>
                rowData={rowData}
                columnDefs={colDefs} />
        </div>
    );
};

describe('Basic Grid', () => {
    test('render basic grid', async () => {
        render(<App />);
        expect(screen.findByText('Boxster')).toBeDefined();
        expect(screen.findByText('72000')).toBeDefined();
    });
});
