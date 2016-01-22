//import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';

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
            <div style={{width: '100%', height: '400px'}}
                 id="myGrid"
                 //class="ag-fresh ag-basic"
            >
            </div>
        </div>;
    }
}

//ReactDOM.render(
//    <MyApp />,
//    document.body
//);