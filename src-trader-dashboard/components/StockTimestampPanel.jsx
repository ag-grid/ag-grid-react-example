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

        let minorStyle = {
            fontSize: 11,
            color: "#6F6F6F"
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
                <div id="ref_304466804484872_elt">
                    May 17, 6:17am GMT-4
                    <div style={minorStyle}>
                        <span>NASDAQ</span>
                        <div>Currency in USD</div>
                    </div>
                </div>
            </div>
        );
    }
}