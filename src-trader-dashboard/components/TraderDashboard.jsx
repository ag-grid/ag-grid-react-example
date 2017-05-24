import React, {Component} from "react";

import ExchangeService from "../services/ExchangeService.jsx";

import ControlPanel from "./ControlPanel.jsx";
import StockPanel from "./StockPanel.jsx";


export default class TraderDashboard extends Component {
    constructor(props) {
        super(props);

        this.exchangeService = new ExchangeService();

        this.state = {
            selectedExchange: this.exchangeService.getExchangeInformation("NASDAQ"),
            exchanges: this.exchangeService.getExchanges()
        };

        this.onExchangeChanged = this.onExchangeChanged.bind(this);
    }

    onExchangeChanged(selectedExchange) {
        this.setState({
            selectedExchange: this.exchangeService.getExchangeInformation(selectedExchange)
        });
    }

    render() {
        return (
            <div>
                <div style={{marginTop: 25, marginBottom: 25}}>
                    <ControlPanel
                        exchanges={this.state.exchanges}
                        selectedExchange={this.state.selectedExchange}
                        onExchangeChanged={this.onExchangeChanged}>
                    </ControlPanel>
                </div>
                <StockPanel selectedExchange={this.state.selectedExchange}/>
            </div>
        );
    }
};
