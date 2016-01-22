import ReactDOM from 'react-dom';
import React from 'react';
import {AgGridReact} from './AgGridReact.jsx';
import {RefData} from './RefData';
import './myApp.css';

export class MyApp extends React.Component {

    constructor() {
        super();
        this.state = {
            quickFilterText: null
        };
        this.onQuickFilterChange = this.onQuickFilterChange.bind(this)
    }

    onQuickFilterChange() {
        console.log('it changed: ' + this.state.quickFilterText);
    }

    render() {
        var gridOptions = {
            columnDefs: this.createColDefs(),
            rowData: this.createRowData(),
            rowSelection: 'multiple',
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            groupHeaders: true,
            rowHeight: 22,
            //modelUpdated: modelUpdated,
            debug: true
        };

        return <div style={{width: '800px'}}>
            <div style={{padding: '4px'}}>
                <div style={{float: 'right'}}>
                    <input type="text" value={this.state.quickFilterText} onChange={this.onQuickFilterChange} placeholder="Type text to filter..."/>
                    <button type="checkbox" id="btDestroyGrid">Destroy Grid</button>
                    <button type="checkbox" id="btBringGridBack">Create Grid</button>
                </div>
                <div style={{padding: '4px'}}>
                    <b>Employees Skills and Contact Details</b> <span id="rowCount"/>
                </div>
                <div style={{clear: 'both'}}/>
            </div>
            <AgGridReact style={{width: '100%', height: '400px'}} className="ag-fresh" gridOptions={gridOptions}></AgGridReact>
        </div>;
    }


    createRowData() {
        var rowData = [];

        for (var i = 0; i < 1000; i++) {
            var countryData = RefData.COUNTRIES[i % RefData.COUNTRIES.length];
            rowData.push({
                name: RefData.FIRST_NAMES[i % RefData.FIRST_NAMES.length] + ' ' + RefData.LAST_NAMES[i % RefData.LAST_NAMES.length],
                skills: {
                    android: Math.random() < 0.4,
                    html5: Math.random() < 0.4,
                    mac: Math.random() < 0.4,
                    windows: Math.random() < 0.4,
                    css: Math.random() < 0.4
                },
                address: RefData.ADDRESSES[i % RefData.ADDRESSES.length],
                years: Math.round(Math.random() * 100),
                proficiency: Math.round(Math.random() * 100),
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                mobile: createRandomPhoneNumber(),
                landline: createRandomPhoneNumber()
            });
        }

        return rowData;
    }

    createColDefs() {
        var columnDefs = [
            {headerName: '', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true},
            {
                headerName: 'Employee',
                children: [
                    {headerName: "Name", field: "name",
                        width: 150, pinned: true},
                    {headerName: "Country", field: "country", width: 150,
                        cellRenderer: countryCellRenderer, pinned: true,
                        filterParams: {cellRenderer: countryCellRenderer, cellHeight: 20}},
                ]
            },
            {
                headerName: 'IT Skills',
                children: [
                    {headerName: "Skills", width: 125, suppressSorting: true, cellRenderer: skillsCellRenderer, filter: SkillFilter},
                    {headerName: "Proficiency", field: "proficiency", filter: 'number', width: 120, cellRenderer: percentCellRenderer, filter: ProficiencyFilter},
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

    var btBringGridBack;
    var btDestroyGrid;
        //
        //btBringGridBack = document.querySelector('#btBringGridBack');
        //btDestroyGrid = document.querySelector('#btDestroyGrid');
        //
        //btBringGridBack.addEventListener('click', onBtBringGridBack);
        //btDestroyGrid.addEventListener('click', onBtDestroyGrid);
        //
        //addQuickFilterListener();
        //onBtBringGridBack();

    function onBtBringGridBack() {
        var eGridDiv = document.querySelector('#myGrid');
        new ag.grid.Grid(eGridDiv, gridOptions);
        btBringGridBack.disabled = true;
        btDestroyGrid.disabled = false;
    }

    function onBtDestroyGrid() {
        btBringGridBack.disabled = false;
        btDestroyGrid.disabled = true;
        gridOptions.api.destroy();
    }

    function addQuickFilterListener() {
        var eInput = document.querySelector('#quickFilterInput');
        eInput.addEventListener("input", function () {
            var text = eInput.value;
            gridOptions.api.setQuickFilter(text);
        });
    }

    function modelUpdated() {
        var model = gridOptions.api.getModel();
        var totalRows = gridOptions.rowData.length;
        var processedRows = model.getVirtualRowCount();
        var eSpan = document.querySelector('#rowCount');
        eSpan.innerHTML = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }

    function skillsCellRenderer(params) {
        var data = params.data;
        var skills = [];
        RefData.IT_SKILLS.forEach(function (skill) {
            if (data.skills[skill]) {
                skills.push('<img src="images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
            }
        });
        return skills.join(' ');
    }

    function countryCellRenderer(params) {
        var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
        return flag + " " + params.value;
    }

    function createRandomPhoneNumber() {
        var result = '+';
        for (var i = 0; i < 12; i++) {
            result += Math.round(Math.random() * 10);
            if (i === 2 || i === 5 || i === 8) {
                result += ' ';
            }
        }
        return result;
    }

    function percentCellRenderer(params) {
        var value = params.value;

        var eDivPercentBar = document.createElement('div');
        eDivPercentBar.className = 'div-percent-bar';
        eDivPercentBar.style.width = value + '%';
        if (value < 20) {
            eDivPercentBar.style.backgroundColor = 'red';
        } else if (value < 60) {
            eDivPercentBar.style.backgroundColor = '#ff9900';
        } else {
            eDivPercentBar.style.backgroundColor = '#00A000';
        }

        var eValue = document.createElement('div');
        eValue.className = 'div-percent-value';
        eValue.innerHTML = value + '%';

        var eOuterDiv = document.createElement('div');
        eOuterDiv.className = 'div-outer-div';
        eOuterDiv.appendChild(eValue);
        eOuterDiv.appendChild(eDivPercentBar);

        return eOuterDiv;
    }

    var SKILL_TEMPLATE =
        '<label style="border: 1px solid lightgrey; margin: 4px; padding: 4px; display: inline-block;">' +
        '  <span>' +
        '    <div style="text-align: center;">SKILL_NAME</div>' +
        '    <div>' +
        '      <input type="checkbox"/>' +
        '      <img src="images/skills/SKILL.png" width="30px"/>' +
        '    </div>' +
        '  </span>' +
        '</label>';

    var FILTER_TITLE =
        '<div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey;">' +
        '<b>TITLE_NAME</b>' +
        '</div>';

    function SkillFilter() {
    }

    SkillFilter.prototype.init = function (params) {
        this.filterChangedCallback = params.filterChangedCallback;
        this.model = {
            android: false,
            css: false,
            html5: false,
            mac: false,
            windows: false
        };
    };

    SkillFilter.prototype.getGui = function () {
        var eGui = document.createElement('div');
        eGui.style.width = '380px';
        var eInstructions = document.createElement('div');
        eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Skills Filter');
        eGui.appendChild(eInstructions);

        var that = this;

        RefData.IT_SKILLS.forEach(function (skill, index) {
            var skillName = RefData.IT_SKILLS_NAMES[index];
            var eSpan = document.createElement('span');
            var html = SKILL_TEMPLATE.replace("SKILL_NAME", skillName).replace("SKILL", skill);
            eSpan.innerHTML = html;

            var eCheckbox = eSpan.querySelector('input');
            eCheckbox.addEventListener('click', function () {
                that.model[skill] = eCheckbox.checked;
                that.filterChangedCallback();
            });

            eGui.appendChild(eSpan);
        });

        return eGui;
    };

    SkillFilter.prototype.doesFilterPass = function (params) {

        var rowSkills = params.data.skills;
        var model = this.model;
        var passed = true;

        IT_SKILLS.forEach(function (skill) {
            if (model[skill]) {
                if (!rowSkills[skill]) {
                    passed = false;
                }
            }
        });

        return passed;
    };

    SkillFilter.prototype.isFilterActive = function () {
        var model = this.model;
        var somethingSelected = model.android || model.css || model.html5 || model.mac || model.windows;
        return somethingSelected;
    };

    var PROFICIENCY_TEMPLATE =
        '<label style="padding-left: 4px;">' +
        '<input type="radio" name="RANDOM"/>' +
        'PROFICIENCY_NAME' +
        '</label>';

    var PROFICIENCY_NONE = 'none';
    var PROFICIENCY_ABOVE40 = 'above40';
    var PROFICIENCY_ABOVE60 = 'above60';
    var PROFICIENCY_ABOVE80 = 'above80';

    var PROFICIENCY_NAMES = ['No Filter', 'Above 40%', 'Above 60%', 'Above 80%'];
    var PROFICIENCY_VALUES = [PROFICIENCY_NONE, PROFICIENCY_ABOVE40, PROFICIENCY_ABOVE60, PROFICIENCY_ABOVE80];

    function ProficiencyFilter() {
    }

    ProficiencyFilter.prototype.init = function (params) {
        this.filterChangedCallback = params.filterChangedCallback;
        this.selected = PROFICIENCY_NONE;
        this.valueGetter = params.valueGetter;
    };

    ProficiencyFilter.prototype.getGui = function () {
        var eGui = document.createElement('div');
        var eInstructions = document.createElement('div');
        eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Proficiency Filter');
        eGui.appendChild(eInstructions);

        var random = '' + Math.random();

        var that = this;
        PROFICIENCY_NAMES.forEach( function (name, index) {
            var eFilter = document.createElement('div');
            var html = PROFICIENCY_TEMPLATE.replace('PROFICIENCY_NAME', name).replace('RANDOM', random);
            eFilter.innerHTML = html;
            var eRadio = eFilter.querySelector('input');
            if (index === 0) {
                eRadio.checked = true;
            }
            eGui.appendChild(eFilter);

            eRadio.addEventListener('click', function () {
                that.selected = PROFICIENCY_VALUES[index];
                that.filterChangedCallback();
            });
        });

        return eGui;
    };

    ProficiencyFilter.prototype.doesFilterPass = function (params) {

        var value = this.valueGetter(params);
        var valueAsNumber = parseFloat(value);

        switch (this.selected) {
            case PROFICIENCY_ABOVE40 : return valueAsNumber >= 40;
            case PROFICIENCY_ABOVE60 : return valueAsNumber >= 60;
            case PROFICIENCY_ABOVE80 : return valueAsNumber >= 80;
            default : return true;
        }

    };

    ProficiencyFilter.prototype.isFilterActive = function () {
        return this.selected !== PROFICIENCY_NONE;
    };
