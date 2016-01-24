import ReactDOM from 'react-dom';
import React from 'react';
import AgGrid from 'ag-grid';
import ComponentUtil from './ComponentUtil';

export default class AgGridReact extends React.Component {

    componentDidMount() {
        var domNode = ReactDOM.findDOMNode(this);
        this.gridOptions = ComponentUtil.copyAttributesToGridOptions(this.props.gridOptions, this.props);
        AgGrid(domNode, this.gridOptions);

        this.api = this.gridOptions.api;
        this.columnApi = this.gridOptions.columnApi;
        this.api.addGlobalListener(this.globalEventListener.bind(this));
    }

    // this method is duplicated, taken from gridOptionsWrapper
    getCallbackForEvent(eventName) {
        if (!eventName || eventName.length < 2) {
            return eventName;
        } else {
            return 'on' + eventName[0].toUpperCase() + eventName.substr(1);
        }
    }

    // duplicated, taken from gridOptionsWrapper
    globalEventListener(eventName, event) {
        var callbackMethodName = this.getCallbackForEvent(eventName);
        var callbackFromProps = this.props[callbackMethodName];
        if (callbackFromProps) {
            callbackFromProps(event);
        }
    }

    shouldComponentUpdate () {
        // we want full control of the dom, as ag-Grid doesn't use React internally,
        // so for performance reasons we tell React we don't need render called after
        // property changes.
        return false;
    }

    componentWillReceiveProps(nextProps) {
        // keeping consistent with web components, put changing
        // values in currentValue and previousValue pairs and
        // not include items that have not changed.
        var changes = {};
        ComponentUtil.ALL_PROPERTIES.forEach( (propKey)=> {
            if (this.props[propKey]!==nextProps[propKey]) {
                changes[propKey] = {
                    previousValue: this.props[propKey],
                    currentValue: nextProps[propKey]
                };
            }
        });
        ComponentUtil.processOnChange(changes, this.gridOptions, this.api, this.columnApi);
    }

    componentWillUnmount() {
        this.api.destroy();
    }

    render() {
        return <div style={this.props.style} className={this.props.className} />;
    }
}

AgGridReact.propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    gridOptions: React.PropTypes.object

    // we should iterate through all the properties and add them here
    //onRowSelected: React.PropTypes.func,
    //showToolPanel: React.PropTypes.bool
};

ComponentUtil.SIMPLE_BOOLEAN_PROPERTIES
    .concat(ComponentUtil.WITH_IMPACT_BOOLEAN_PROPERTIES)
    .forEach( (propKey)=> {
        AgGridReact.propTypes[propKey] = React.PropTypes.bool;
    });

//ComponentUtil.SIMPLE_PROPERTIES
//    .concat(ComponentUtil.WITH_IMPACT_STRING_PROPERTIES)
//    .forEach( (propKey)=> {
//        AgGridReact.propTypes[propKey] = React.PropTypes.bool;
//    });

    //.concat(ComponentUtil.)
    //.concat(ComponentUtil.SIMPLE_NUMBER_PROPERTIES)
    //.concat(ComponentUtil.WITH_IMPACT_OTHER_PROPERTIES)
    //.concat(ComponentUtil.WITH_IMPACT_NUMBER_PROPERTIES)
    //.concat(ComponentUtil.CALLBACKS),


var i = new AgGridReact();
console.log(i);
