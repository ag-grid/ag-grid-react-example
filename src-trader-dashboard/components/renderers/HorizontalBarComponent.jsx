import React, {Component} from "react";

export default class HorizontalBarComponent extends Component {

    render() {
        let positiveChange = {
            fill: "green"
        };

        let negativeChange = {
            fill: "red"
        };

        let text = {
            position: "absolute",
            top: 0,
            width: "100%",
            textAlign: "right"
        };

        let pctNetChange = this.props.value;
        let pctNetChangeBar = Math.min(Math.abs(pctNetChange) * 100, 100) / 2;

        let barWidth = `${pctNetChangeBar}%`;
        let barStyle = pctNetChange >= 0 ? positiveChange : negativeChange;
        let barX = `${pctNetChange >= 0 ? '50' : 50 - pctNetChangeBar}%`;
        return (
            <div style={{position: 'relative'}}>
                <div style={{width: "50%"}}>
                    <svg width="100%" preserveAspectRatio="none">
                        <rect x={barX} y="0" width={barWidth} height="20px" rx="4" ry="4" style={barStyle}/>
                    </svg>
                </div>
                <div style={text}>{pctNetChange}</div>
            </div>
        )
    }
}

HorizontalBarComponent.propTypes = {
    params: React.PropTypes.object
};