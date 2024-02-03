import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact, CustomCellRendererProps } from '@ag-grid-community/react';
import { render, screen } from '@testing-library/react';
import exp from 'constants';
import React, { useRef, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { describe, expect, test } from 'vitest';

ModuleRegistry.register(ClientSideRowModelModule);

interface RowData {
    make: string;
    model: string;
    price: number;
    bought: boolean;
}

// cell renderer that contains a button
const BuyCellRenderer = (props: CustomCellRendererProps<RowData, boolean>) => {
    const buttonClick = () => {
        props.node.setDataValue('bought', true);
    };

    return (
        <>
            {props.data?.bought ?
                <span>Bought a {props.data?.make}</span> :
                <button onClick={buttonClick}>Buy: {props.data?.make}</button>
            }
        </>
    );
};


const App = () => {
    const gridRef = useRef<AgGridReact<RowData>>(null);

    const [rowData] = useState<RowData[]>([
        { make: 'Toyota', model: 'Celica', price: 35000, bought: false },
        { make: 'Ford', model: 'Mondeo', price: 32000, bought: false },
        { make: 'Porsche', model: 'Boxster', price: 72000, bought: false }
    ]);
    const [colDefs, setColDefs] = useState<ColDef<RowData>[]>([
        { field: 'make' },
        { field: 'model' },
        { field: 'price', valueFormatter: (params) => "$" + params.value.toLocaleString()},
        { field: 'bought', cellRenderer: BuyCellRenderer }
    ]);

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: 600 }}>
            <AgGridReact<RowData>
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                reactiveCustomComponents />
        </div>
    );
};

describe('Basic Grid', () => {

    test('render basic grid', async () => {
        render(<App />);
        await screen.findByText('Boxster')
    });

    test('value formatter and cell renderer', async () => {
        render(<App />);

        // Test the value formatter
        expect(screen.getByText('$72,000')).toBeDefined();

        const porscheButton = await screen.findByText('Buy: Porsche');
        expect(porscheButton).toBeDefined();

        // Handy debug function to see the center rows of the grid
        // screen.debug(document.querySelector('.ag-center-cols-container')!);

        act(() => porscheButton.click());

        expect(screen.findByText('Bought a Porsche')).toBeDefined();
    });
});