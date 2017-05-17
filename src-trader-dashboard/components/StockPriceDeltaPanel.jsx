import React, {Component} from "react";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let containerStyle = {
            display: "inline-block"
        };

        let priceStyle = {
            fontSize: "2.6em",
            fontWeight: "bold",
            marginRight: 10
        };

        let deltaStyle = {
            fontWeight: "normal",
            fontSize: "1.8em",
            verticalAlign: "bottom"
        };

        let negativeSwingStyle = {
            color: "#d14836",
            marginRight: 5
        };

        let positiveSwingStyle = {
            color: "#093",
            marginRight: 5
        };

        return (
            <div>
                <span style={priceStyle}>
                    155.47
                </span>
                <div style={containerStyle}>
                    <span style={deltaStyle}>
                        <span style={negativeSwingStyle}>-0.23</span>
                        <span style={negativeSwingStyle}>(-0.15%)</span>
                    </span>
                </div>
            </div>
        );
    }
}