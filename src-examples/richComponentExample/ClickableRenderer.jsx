import React, {Component} from "react";

export default class ClickableRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cell: {
                row: this.props.value,
                col: this.props.colDef.headerName
            }
        };
    }

    clicked = () => {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    };

    render() {
        let buttonStyle = {
            lineHeight: 0.5,
            width: "98%"
        };
          return (
            <button style={buttonStyle} onClick={this.clicked} className="btn btn-info">Click Me</button>
        );
    }
}