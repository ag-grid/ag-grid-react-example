import SkillsCellRenderer from './SkillsCellRenderer.jsx';
import ProficiencyCellRenderer from './ProficiencyCellRenderer.jsx';
import RefData from './RefData';
import ReactDOM from 'react-dom';
import React from 'react';
import AgGrid from 'ag-grid-react-component';
import {reactCellRendererFactory} from 'ag-grid-react-component';
import {reactFilterFactory} from 'ag-grid-react-component';
import SkillsFilter from './SkillsFilter.jsx';
import ProficiencyFilter from './ProficiencyFilter.jsx';

export default class ColDefFactory {

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
                    {headerName: "Skills", width: 125, suppressSorting: true, field: 'skills',
                        cellRenderer: reactCellRendererFactory(SkillsCellRenderer),
                        filter: reactFilterFactory(SkillsFilter)
                    },
                    {headerName: "Proficiency", field: "proficiency", filter: 'number', width: 120,
                        cellRenderer: reactCellRendererFactory(ProficiencyCellRenderer),
                        filter: reactFilterFactory(ProficiencyFilter)}
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
    var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
    return flag + " " + params.value;
}
/*
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
    '</div>';*/
/*
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
};*/
//
//var PROFICIENCY_TEMPLATE =
//    '<label style="padding-left: 4px;">' +
//    '<input type="radio" name="RANDOM"/>' +
//    'PROFICIENCY_NAME' +
//    '</label>';
//
//var PROFICIENCY_NONE = 'none';
//var PROFICIENCY_ABOVE40 = 'above40';
//var PROFICIENCY_ABOVE60 = 'above60';
//var PROFICIENCY_ABOVE80 = 'above80';
//
//var PROFICIENCY_NAMES = ['No Filter', 'Above 40%', 'Above 60%', 'Above 80%'];
//var PROFICIENCY_VALUES = [PROFICIENCY_NONE, PROFICIENCY_ABOVE40, PROFICIENCY_ABOVE60, PROFICIENCY_ABOVE80];
//
//function ProficiencyFilter() {
//}
//
//ProficiencyFilter.prototype.init = function (params) {
//    this.filterChangedCallback = params.filterChangedCallback;
//    this.selected = PROFICIENCY_NONE;
//    this.valueGetter = params.valueGetter;
//};
//
//ProficiencyFilter.prototype.getGui = function () {
//    var eGui = document.createElement('div');
//    var eInstructions = document.createElement('div');
//    eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Proficiency Filter');
//    eGui.appendChild(eInstructions);
//
//    var random = '' + Math.random();
//
//    var that = this;
//    PROFICIENCY_NAMES.forEach( function (name, index) {
//        var eFilter = document.createElement('div');
//        var html = PROFICIENCY_TEMPLATE.replace('PROFICIENCY_NAME', name).replace('RANDOM', random);
//        eFilter.innerHTML = html;
//        var eRadio = eFilter.querySelector('input');
//        if (index === 0) {
//            eRadio.checked = true;
//        }
//        eGui.appendChild(eFilter);
//
//        eRadio.addEventListener('click', function () {
//            that.selected = PROFICIENCY_VALUES[index];
//            that.filterChangedCallback();
//        });
//    });
//
//    return eGui;
//};
//
//ProficiencyFilter.prototype.doesFilterPass = function (params) {
//
//    var value = this.valueGetter(params);
//    var valueAsNumber = parseFloat(value);
//
//    switch (this.selected) {
//        case PROFICIENCY_ABOVE40 : return valueAsNumber >= 40;
//        case PROFICIENCY_ABOVE60 : return valueAsNumber >= 60;
//        case PROFICIENCY_ABOVE80 : return valueAsNumber >= 80;
//        default : return true;
//    }
//
//};
//
//ProficiencyFilter.prototype.isFilterActive = function () {
//    return this.selected !== PROFICIENCY_NONE;
//};
