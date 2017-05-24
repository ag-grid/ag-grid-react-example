import React, {Component} from "react";

import isEqual from "lodash/isEqual";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPrice: null,
            delta: null,
            deltaPercentage: null
        };

    }

    componentDidMount() {
        this.updatePriceDelta(this.props.pricingDelta);
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (!isEqual(this.props.pricingDelta, nextProps.pricingDelta)) {
            this.updatePriceDelta(nextProps.pricingDelta);
        }
    }

    updatePriceDelta(pricingDelta) {
        let delta = pricingDelta.currentPrice - pricingDelta.previousPrice;
        let deltaPercentage = (pricingDelta.currentPrice - pricingDelta.previousPrice) / pricingDelta.currentPrice;

        this.setState({
            currentPrice: pricingDelta.currentPrice,
            delta,
            deltaPercentage
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props.pricingDelta, nextProps.pricingDelta) ||
            !isEqual(this.state, nextState);
    }

    numberFormatter(input) {
        return input ? input.toFixed(2) : null;
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

        let swingStyle = this.state.delta >= 0 ? positiveSwingStyle : negativeSwingStyle;

        if(!this.props.pricingDelta) {
            return null;
        } else {
            return (
                <div>
                    <span style={priceStyle}>
                        {this.numberFormatter(this.state.currentPrice)}
                    </span>
                    <div style={containerStyle}>
                        <span style={deltaStyle}>
                            <span style={swingStyle}>{this.numberFormatter(this.state.delta)}</span>
                            <span
                                style={swingStyle}>({this.numberFormatter(this.state.deltaPercentage)}%)</span>
                        </span>
                    </div>
                </div>
            );
        }
    }
}