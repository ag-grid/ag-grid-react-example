import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);

        this.onExchangeChanged = this.onExchangeChanged.bind(this);
    }

    onExchangeChanged(event) {
        this.props.onExchangeChanged(event.target.value);
    }

    render() {
        return (
            <div>
                <span style={{marginRight: 15}}>Control Panel</span>
                <select value={this.props.selectedExchange.symbol} onChange={this.onExchangeChanged}>
                    {
                        this.props.exchanges.map((exchange) => {
                            return <option key={exchange.symbol} value={exchange.symbol}>{exchange.name}</option>
                        })
                    }
                </select>
            </div>
        );
    }
};
