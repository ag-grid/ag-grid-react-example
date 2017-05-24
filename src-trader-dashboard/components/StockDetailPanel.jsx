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

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSymbol &&
            nextProps.selectedSymbol !== this.props.selectedSymbol) {
            let stockDetail = this.exchangeService.getTickerDetail(nextProps.selectedSymbol);

            this.setState({
                pricingDelta: stockDetail.pricingDelta,
                timestamp: stockDetail.timestamp,
                tickerSummary: stockDetail.tickerSummary,
                historicalData: stockDetail.historicalData
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.selectedSymbol !== this.props.selectedSymbol;
    }

    render() {
        if (!this.props.selectedSymbol) {
            return null;
        } else {
            return (
                <div>
                    <StockPriceDeltaPanel pricingDelta={this.state.pricingDelta}/>
                    <StockTimestampPanel timestamp={this.state.timestamp}
                                         exchangeName={this.props.exchangeName}/>
                    <StockSummaryPanel tickerSummary={this.state.tickerSummary}/>
                    <StockHistoricalChartPanel historicalData={this.state.historicalData}/>
                </div>
            );
        }
    }
}