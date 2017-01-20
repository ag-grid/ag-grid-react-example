import React from 'react';
import RefData from './RefData';

// Date Component to be used in the date filter
export default class MyReactDateComponent extends React.Component {

    constructor(props) {
        super(props);
        // the entire ag-Grid properties are passed as one single object inside the params
        this.state = {
            agProps: props
        };
    }


    render() {
        return (
            <span>hello world!</span>
        );
    }


}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
MyReactDateComponent.propTypes = {
    params: React.PropTypes.object
};