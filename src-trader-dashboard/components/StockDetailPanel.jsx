import React, {Component} from "react";

import StockPriceDeltaPanel from "./StockPriceDeltaPanel.jsx";
import StockTimestampPanel from "./StockTimestampPanel.jsx";
import StockSummaryPanel from "./StockSummaryPanel.jsx";
import StockHistoricalChartPanel from "./StockHistoricalChartPanel.jsx";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StockPriceDeltaPanel />
                <StockTimestampPanel />
                <StockSummaryPanel />
                <StockHistoricalChartPanel />
            </div>
        );
    }
}