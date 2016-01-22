import ReactDOM from 'react-dom';
import React from 'react';
import AgGrid from 'ag-grid';

export class AgGridReact extends React.Component {

    componentDidMount() {
        var domNode = ReactDOM.findDOMNode(this);
        AgGrid(domNode, this.props.gridOptions);
    }

    componentWillUnmount() {
        //console.log('componentWillUnmount');
    }

    render() {
        return <div style={this.props.style} className={this.props.className} />;
    }
}

AgGridReact.propTypes = {
    'style': React.PropTypes.object,
    'className': React.PropTypes.string,
    'gridOptions': React.PropTypes.object
};
