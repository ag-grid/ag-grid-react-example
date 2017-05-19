import React, {Component} from "react";

import ExchangeService from "../services/ExchangeService.jsx";

import StockPriceDeltaPanel from "./StockPriceDeltaPanel.jsx";
import StockTimestampPanel from "./StockTimestampPanel.jsx";
import StockSummaryPanel from "./StockSummaryPanel.jsx";
import StockHistoricalChartPanel from "./StockHistoricalChartPanel.jsx";

export default class extends Component {
    constructor(props) {
        super(props);

        this.exchangeService = new ExchangeService();

        this.state = {
            priceDelta: null,
            timestamp: null,
            tickerSummary: null,
            historicalData: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.selectedSymbol !== this.props.selectedSymbol;
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.selectedSymbol !== this.props.selectedSymbol) {
            let stockDetail = this.exchangeService.getTickerDetail(nextProps.selectedSymbol);

            this.setState({
                pricingDelta: stockDetail.pricingDelta,
                timestamp: stockDetail.timestamp,
                tickerSummary: stockDetail.tickerSummary,
                historicalData: stockDetail.historicalData
            })
        }
    }

    render() {
        return (
            <div>
                <StockPriceDeltaPanel pricingDelta={this.state.pricingDelta}/>
                <StockTimestampPanel timestamp={this.state.timestamp}
                                     exchangeName={this.props.exchangeName}/>
                <StockSummaryPanel tickerSummary={this.state.tickerSummary}/>
                <StockHistoricalChartPanel historicalData={this.state.historicalData} />
            </div>
        );
    }
}