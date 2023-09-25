import React from 'react';
import * as PropTypes from 'prop-types';

// Header component to be used as default for all the columns.
export default class HeaderGroupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: null
        };
    }

    componentDidMount() {
        this.props.columnGroup.getProvidedColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
        this.onExpandChanged();
    }

    render() {
        let arrowClassName = "customExpandButton " + (this.state.expanded ? " expanded" : " collapsed");

        return <div>
            <div className="customHeaderLabel"> {this.props.displayName}</div>
            <div onClick={this.expandOrCollapse.bind(this)} className={arrowClassName}><i
                className="fa fa-arrow-right"/></div>
        </div>
    }

    expandOrCollapse() {
        this.props.setExpanded(!this.state.expanded);
    };

    onExpandChanged() {
        this.setState({
            expanded: this.props.columnGroup.getProvidedColumnGroup().isExpanded()
        })
    }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
HeaderGroupComponent.propTypes = {
    params: PropTypes.object
};
