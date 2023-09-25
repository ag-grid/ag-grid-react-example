import React from 'react';

const PROFICIENCY_NAMES = ['No Filter', 'Above 40%', 'Above 60%', 'Above 80%'];

// the proficiency filter component. this demonstrates how to integrate
// a React filter component with AG Grid.
export default class ProficiencyFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: PROFICIENCY_NAMES[0]
        };
    }

    // called by agGrid
    doesFilterPass(params) {
        const value = this.props.valueGetter(params);
        const valueAsNumber = parseFloat(value);

        switch (this.state.selected) {
            case PROFICIENCY_NAMES[1] :
                return valueAsNumber >= 40;
            case PROFICIENCY_NAMES[2] :
                return valueAsNumber >= 60;
            case PROFICIENCY_NAMES[3] :
                return valueAsNumber >= 80;
            default :
                return true;
        }
    };

    // called by agGrid
    isFilterActive() {
        return this.state.selected !== PROFICIENCY_NAMES[0];
    };

    onButtonPressed(name) {
        const newState = {selected: name};
        // set the state, and once it is done, then call filterChangedCallback
        this.setState(newState, this.props.filterChangedCallback);
    }


    getModel() {
        return ''
    }

    setModel(model) {
    }

    render() {
        const rows = [];
        PROFICIENCY_NAMES.forEach((name) => {
            const selected = this.state.selected === name;
            rows.push(
                <div key={name} style={{marginTop: 3}}>
                    <label style={{paddingLeft: 4}}>
                        <input type="radio" checked={selected} name={Math.random()}
                               onChange={this.onButtonPressed.bind(this, name)}/>
                        {name}
                    </label>
                </div>
            );
        });

        return (
            <div>
                <div style={{
                    textAlign: 'center',
                    background: 'lightgray',
                    width: '100%',
                    display: 'block',
                    borderBottom: '1px solid grey'
                }}>
                    <b>Custom Proficiency Filter</b>
                </div>
                {rows}
            </div>
        );
    }

    // these are other method that agGrid calls that we
    // could of implemented, but they are optional and
    // we have no use for them in this particular filter.
    //getApi() {}
    //afterGuiAttached(params) {}
    //onNewRowsLoaded() {}
    //onAnyFilterChanged() {}
}
