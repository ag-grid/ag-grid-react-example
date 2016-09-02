import React from 'react';

export default class SimpleCellRenderer extends React.Component {
    render() {
        var params = this.props.params;

        // the class below does nothing, it's just for testing, so we can inspect the dom of
        // the result and looking for it, to validate that this cellRenderer is actually getting used.
        return (
            <span className="simple-cell-renderer">{params.value}</span>
        );
    }
}

SimpleCellRenderer.propTypes = {
    params: React.PropTypes.object
};