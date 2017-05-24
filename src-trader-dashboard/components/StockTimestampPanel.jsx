import React, {Component} from "react";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let minorStyle = {
            fontSize: 11,
            color: "#6F6F6F"
        };

        if (!this.props.timestamp) {
            return null;
        } else {
            return (
                <div>
                    <div>
                        {this.props.timestamp}
                        <div style={minorStyle}>
                            <span>{this.props.exchangeName}</span>
                            <div>Currency in USD</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}