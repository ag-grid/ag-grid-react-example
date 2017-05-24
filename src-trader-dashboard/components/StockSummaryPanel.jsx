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
            borderCollapse: "collapse"

        };

        let keyStyle = {
            color: "#666"
        };

        let valueStyle = {
            textAlign: "right"
        };

        if (!this.props.tickerSummary) {
            return null;
        } else {
            return (
                <div style={containerStyle}>
                    <table style={tableStyle}>
                        <tbody>
                        <tr>
                            <td style={keyStyle}>Range</td>
                            <td style={valueStyle}>{this.props.tickerSummary.range}</td>
                        </tr>
                        <tr>
                            <td style={keyStyle}>52 week</td>
                            <td style={valueStyle}>{this.props.tickerSummary.fiftyTwoWeek}</td>
                        </tr>
                        <tr>
                            <td style={keyStyle}>Open</td>
                            <td style={valueStyle}>{this.props.tickerSummary.open}</td>
                        </tr>
                        <tr>
                            <td style={keyStyle}>Vol / Avg.</td>
                            <td style={valueStyle}>{this.props.tickerSummary.vol}/{this.props.tickerSummary.avg}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table style={tableStyle}>
                        <tbody>
                        <tr>
                            <td style={keyStyle}>Div/yield</td>
                            <td style={valueStyle}>{this.props.tickerSummary.dividend}/{this.props.tickerSummary.yld}</td>
                        </tr>
                        <tr>
                            <td style={keyStyle}>EPS</td>
                            <td style={valueStyle}>{this.props.tickerSummary.eps}</td>
                        </tr>
                        <tr>
                            <td style={keyStyle}>Shares</td>
                            <td style={valueStyle}>{this.props.tickerSummary.shares}</td>
                        </tr>
                        <tr>
                            <td style={keyStyle}>Market Cap</td>
                            <td style={valueStyle}>{this.props.tickerSummary.marketCap}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}