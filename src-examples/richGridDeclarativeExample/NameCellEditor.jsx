import React from 'react';
import * as PropTypes from 'prop-types';

const KEY_BACKSPACE = 'Backspace';
const KEY_DELETE = 'Delete';
const KEY_F2 = 'F2';

// cell renderer for the proficiency column. this is a very basic cell editor,
export default class NameCellEditor extends React.Component {

    constructor(props) {
        super(props);
        // the entire AG Grid properties are passed as one single object inside the params
        this.state = this.createInitialState(props);
    }

    // work out how to present the data based on what the user hit. you don't need to do any of
    // this for your AG Grid cellEditor to work, however it makes sense to do this so the user
    // experience is similar to Excel
    createInitialState(props) {

        let startValue;
        const putCursorAtEndOnFocus = false;
        const highlightAllOnFocus = false;

        if (props.eventKey === KEY_BACKSPACE || props.eventKey === KEY_DELETE) {
            // if backspace or delete pressed, we clear the cell
            startValue = '';
        } else if (props.charPress) {
            // if a letter was pressed, we start with the letter
            startValue = props.charPress;
        } else {
            // otherwise we start with the current value
            startValue = props.value;
            if (props.eventKey === KEY_F2) {
                this.putCursorAtEndOnFocus = true;
            } else {
                this.highlightAllOnFocus = true;
            }
        }

        return {
            value: startValue,
            putCursorAtEndOnFocus: putCursorAtEndOnFocus,
            highlightAllOnFocus: highlightAllOnFocus
        }
    }

    render() {
        return (
            <input ref="textField" value={this.state.value} onChange={this.onChangeListener.bind(this)}/>
        );
    }

    onChangeListener(event) {
        // if doing React, you will probably be using a library for managing immutable
        // objects better. to keep this example simple, we don't use one.
        const newState = {
            value: event.target.value,
            putCursorAtEndOnFocus: this.state.putCursorAtEndOnFocus,
            highlightAllOnFocus: this.state.highlightAllOnFocus
        };
        this.setState(newState);
    }

    // called by AG Grid, to get the final value
    getValue() {
        return this.state.value;
    }

    // cannot use componentDidMount because although the component might be ready from React's point of
    // view, it may not yet be in the browser (put in by AG Grid) so focus will not work
    afterGuiAttached() {
        // get ref from React component
        const eInput = this.refs.textField;

        eInput.focus();

        if (this.highlightAllOnFocus) {
            eInput.select();
        } else {
            // when we started editing, we want the caret at the end, not the start.
            // this comes into play in two scenarios: 
            //   a) when user hits F2 
            //   b) when user hits a printable character
            const length = eInput.value ? eInput.value.length : 0;
            if (length > 0) {
                eInput.setSelectionRange(length, length);
            }
        }
    }

    // if we want the editor to appear in a popup, then return true.
    isPopup() {
        return false;
    }

    // return true here if you don't want to allow editing on the cell.
    isCancelBeforeStart() {
        return false;
    }

    // just to demonstrate, if you type in 'cancel' then the edit will not take effect
    isCancelAfterEnd() {
        if (this.state.value && this.state.value.toUpperCase() === 'CANCEL') {
            return true;
        } else {
            return false;
        }
    }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
NameCellEditor.propTypes = {
    params: PropTypes.object
};
