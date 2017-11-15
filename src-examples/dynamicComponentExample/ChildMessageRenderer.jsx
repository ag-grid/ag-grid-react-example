import React, {Component} from "react";

export default class ChildMessageRenderer extends Component {
    constructor(props) {
        super(props);
    }

    invokeParentMethod = () => {
        let rowIndex = this.props.node.rowIndex;
        let headerName = this.props.colDef.headerName;

        this.props.context.componentParent.methodFromParent(`Row: ${rowIndex}, Col: ${headerName}`)
    };

    render() {
        return (
            <span><button style={{height: 20, lineHeight: 0.5}} onClick={this.invokeParentMethod} className="btn btn-info">Invoke Parent</button></span>
        );
    }
};
