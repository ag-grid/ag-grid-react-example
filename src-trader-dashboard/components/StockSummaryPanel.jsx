import React, {Component} from "react";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let containerStyle = {
            fontSize: 13
        };

        let tableStyle = {
            display: "inline-block",
            verticalAlign: "top",
            borderCollapse:"collapse"

    };

        let keyStyle = {
            color: "#666"
        };

        let valueStyle = {
            textAlign: "right"
        };

        return (
            <div style={containerStyle}>
                <table style={tableStyle}>
                    <tbody>
                    <tr>
                        <td style={keyStyle}>Range
                        </td>
                        <td style={valueStyle}>154.72 - 156.06
                        </td>
                    </tr>
                    <tr>
                        <td style={keyStyle}>52 week
                        </td>
                        <td style={valueStyle}>91.50 - 156.65
                        </td>
                    </tr>
                    <tr>
                        <td style={keyStyle}>Open
                        </td>
                        <td style={valueStyle}>155.94
                        </td>
                    </tr>
                    <tr>
                        <td style={keyStyle}>
                            Vol / Avg.
                        </td>
                        <td style={valueStyle}>15,931.00/24.94M
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table style={tableStyle}>
                    <tbody>
                    <tr>
                        <td style={keyStyle}>
                            Div/yield
                        </td>
                        <td style={valueStyle}>0.63/1.62
                        </td>
                    </tr>
                    <tr>
                        <td style={keyStyle}>
                            EPS
                        </td>
                        <td style={valueStyle}>8.55
                        </td>
                    </tr>
                    <tr>
                        <td style={keyStyle}>
                            Shares
                        </td>
                        <td style={valueStyle}>5,213.84M
                        </td>
                    </tr>
                    <tr>
                        <td style={keyStyle}>
                            Mkt cap
                        </td>
                        <td style={valueStyle}>808,518.60M
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}