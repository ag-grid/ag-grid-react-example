import concat from "lodash/concat";
import remove from "lodash/remove";
import uniq from "lodash/uniq";
import find from "lodash/find";
import sampleSize from "lodash/sampleSize";
import keys from "lodash/keys";

export default class {
    constructor() {
        this.subscribers = {};

        this.exchanges = [
            {name: 'Nasdaq Stock Market', symbol: 'NASDAQ', supportedStocks: NASDAQ_SYMBOLS},
            {name: 'London Stock Exchange', symbol: 'LSE', supportedStocks: LSE_SYMBOLS},
            {name: 'Japan Exchange Group', symbol: 'JSE', supportedStocks: JSE_SYMBOLS},
            {name: 'Deutsche Börse', symbol: 'DE', supportedStocks: DE_SYMBOLS}
        ];

        this.initialiseTickerData();
    }

    initialiseTickerData() {
        this.tickerData = {};

        const allSymbols = uniq(concat(NASDAQ_SYMBOLS, LSE_SYMBOLS, JSE_SYMBOLS, DE_SYMBOLS));
        allSymbols.forEach((symbol) => {
            this.tickerData[symbol] = this.generateTickerRow(symbol);
        });
    }

    generateTickerRow(symbol) {
        let price = this.random(10, 600);
        return {
            symbol,
            price,
            bid: price - this.random(1, 3),
            ask: price + this.random(1, 3)
        }
    }

    random(min, max) {
        return parseFloat((Math.random() * (max - min + 1) + min))
    }

    addSubscriber(subscriber, symbol) {
        if (!this.subscribers[symbol]) {
            this.subscribers[symbol] = [];
        }
        this.subscribers[symbol].push(subscriber);

        if (!this.updateInterval) {
            this.updateInterval = setInterval(this.applyDeltasToTickerData.bind(this), 500);
        }
    }

    applyDeltasToTickerData() {
        let symbols = keys(this.subscribers);
        let properties = ['price', 'bid', 'ask'];

        let symbolsToAlter = sampleSize(symbols, symbols.length / 4);
        let propertyToAlter = sampleSize(properties, 1);

        symbolsToAlter.forEach((symbol) => {
            this.tickerData[symbol] = {
                symbol,
                price: this.tickerData[symbol].price,
                bid: this.tickerData[symbol].bid,
                ask: this.tickerData[symbol].ask,
            };

            this.tickerData[symbol][propertyToAlter] = +this.tickerData[symbol][propertyToAlter] + this.random(-2, 2);
        });

        symbols.forEach((symbol) => {
            this.subscribers[symbol].forEach((subscriber) => {
                subscriber(this.tickerData[symbol]);
            });
        });
    }

    removeSubscriber(subscriber, symbol) {
        remove(this.subscribers[symbol], subscriber);
    }

    getTicker(symbol) {
        return this.tickerData[symbol];
    }

    getExchanges() {
        return this.exchanges;
    }

    getExchangeInformation(exchangeName) {
        return find(this.exchanges, (exchange) => {
            return exchange.symbol === exchangeName;
        })
    }
}

const NASDAQ_SYMBOLS = [
    "SNCL.L",
    "RNK.L",
    "SWJ.L",
    "JDT.L",
    "UANC.L",
    "SDP.L",
    "HSBA.L",
    "XPL.L",
    "KLR.L",
    "SSE.L",
    "JSI.L",
    "UBMN.L",
    "WPC.L",
    "VTC.L",
    "UTG.L",
    "DOR.L",
    "44RS.L",
    "GPOR.L",
    "ASL.L",
    "40JP.L",
    "133716",
    "PJF.L",
    "MLC.L",
    "137817",
    "GHE.L",
    "PML.L",
    "SBRY.L",
    "LEN.L",
    "STS.L",
    "138654",
    "PTEC.L"
];

const LSE_SYMBOLS = [
    "PVG.L",
    "SN.L,",
    "SWJ.L",
    "JDT.L",
    "UANC.L",
    "SDP.L",
    "HSBA.L",
    "XPL.L",
    "KLR.L",
    "SSE.L",
    "JSI.L",
    "UBMN.L",
    "DLN.L",
    "SIR.L",
    "SEC.L",
    "DOR.L",
    "44RS.L",
    "GPOR.L",
    "ASL.L",
    "40JP.L",
    "133716",
    "PJF.L",
    "MLC.L",
    "137817",
    "GHE.L",
    "PML.L",
    "SBRY.L",
    "LEN.L",
    "MAV4.L",
    "GLEN.L",
    "EDGD.L",
];

const JSE_SYMBOLS = [
    "ECV.L",
    "MHN.L",
    "SWJ.L",
    "JDT.L",
    "UANC.L",
    "PLAZ.L",
    "CLDN.L",
    "XPL.L",
    "KLR.L",
    "SSE.L",
    "JSI.L",
    "UBMN.L",
    "WPC.L",
    "VTC.L",
    "UTG.L",
    "DOR.L",
    "44RS.L",
    "GPOR.L",
    "ASL.L",
    "40JP.L",
    "133716",
    "CRW.L",
    "JPR.L",
    "UTLC.L",
    "GHS.L",
    "PML.L",
    "SBRY.L",
    "LEN.L",
    "STS.L",
    "138654",
    "RWS.L"
];

const DE_SYMBOLS = [
    "ECV.L",
    "MHN.L",
    "SWJ.L",
    "JDT.L",
    "UANC.L",
    "SDP.L",
    "KBC.L",
    "VM.L,",
    "KLR.L",
    "SSE.L",
    "JSI.L",
    "UBMN.L",
    "WPC.L",
    "VTC.L",
    "UTG.L",
    "DOR.L",
    "44RS.L",
    "GPOR.L",
    "ASL.L",
    "40JP.L",
    "133716",
    "PJF.L",
    "MLC.L",
    "DPV6.L",
    "LMIN.L",
    "PML.L",
    "SBRY.L",
    "LEN.L",
    "STS.L",
    "BKIR.L",
    "AFMF.L",
];