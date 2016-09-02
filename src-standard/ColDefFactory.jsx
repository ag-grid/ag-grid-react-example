import SkillsCellRenderer from './SkillsCellRenderer.jsx';
import ProficiencyCellRenderer from './ProficiencyCellRenderer.jsx';
import RefData from './RefData';
import {reactCellRendererFactory} from 'ag-grid-react';
import {reactFilterFactory} from 'ag-grid-react';
import SkillsFilter from './SkillsFilter.jsx';
import ProficiencyFilter from './ProficiencyFilter.jsx';

export default class ColDefFactory {

    createColDefs(parentReactComponent) {

        var columnDefs = [
            {headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true},
            {
                headerName: 'Employee',
                children: [
                    {headerName: "Name", field: "name", enableRowGroup: true, enablePivot: true,
                        width: 150, pinned: true},
                    {headerName: "Country", field: "country", width: 150, enableRowGroup: true, enablePivot: true,
                        // not bothering with React for country, as it's a simple HTML string
                        cellRenderer: countryCellRenderer, pinned: true,
                        filterParams: {cellRenderer: countryCellRenderer, cellHeight: 20}},
                ]
            },
            {
                headerName: 'IT Skills',
                children: [
                    {headerName: "Skills", width: 125, suppressSorting: true, field: 'skills', enableRowGroup: true, enablePivot: true,
                        // using ag-Grid's React cellRenderer factory
                        cellRenderer: reactCellRendererFactory(SkillsCellRenderer, parentReactComponent),
                        // using ag-Grid's React filter factory
                        filter: reactFilterFactory(SkillsFilter, parentReactComponent)
                    },
                    {headerName: "Proficiency", field: "proficiency", filter: 'number', width: 120, enableValue: true,
                        // using ag-Grid's React cellRenderer factory
                        cellRenderer: reactCellRendererFactory(ProficiencyCellRenderer, parentReactComponent),
                        // using ag-Grid's React filter factory
                        filter: reactFilterFactory(ProficiencyFilter, parentReactComponent)}
                ]
            },
            {
                headerName: 'Contact',
                children: [
                    {headerName: "Mobile", field: "mobile", width: 150, filter: 'text'},
                    {headerName: "Land-line", field: "landline", width: 150, filter: 'text'},
                    {headerName: "Address", field: "address", width: 500, filter: 'text'}
                ]
            }
        ];
        return columnDefs;
    }
}

// this is a simple cell renderer, putting together static html, no
// need to use React for it.
function countryCellRenderer(params) {
    if (params.value) {
        var flag = "<img border='0' width='15' height='10' " +
            "style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/"
            + RefData.COUNTRY_CODES[params.value] + ".png'>";
        return flag + " " + params.value;
    } else {
        return null;
    }
}
