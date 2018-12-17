import React, {Component} from "react";
import {connect} from "react-redux";

import FontContext from './fontContext'

class PriceRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            convertedValue: this.applyExchangeRate(props.exchangeRate, props.value)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            convertedValue: this.applyExchangeRate(nextProps.exchangeRate, nextProps.value)
        })
    }

    render() {
        return (
            <FontContext.Consumer>
                {fontWeight => <span
                    style={{fontWeight}}> {this.props.currencySymbol}{this.state.convertedValue}</span>}
            </FontContext.Consumer>
        );
    }

    applyExchangeRate = (exchangeRate, value) => {
        return parseFloat(value * exchangeRate).toFixed(2); // simplified/naive exchange rate implementation!
    }
}

export default connect(
    (state) => {
        return {
            currencySymbol: state.currencySymbol,
            exchangeRate: state.exchangeRate
        }
    },
    null,
    null,
    {forwardRef: true} // must be supplied for react/redux when using GridOptions.reactNext
)(PriceRenderer);