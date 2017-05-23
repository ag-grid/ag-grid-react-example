import React, {Component} from "react";

import FxDataService from "../services/FxDataService.jsx";
import FxQuoteMatrix from "./FxQuoteMatrix.jsx";
import TopMoversGrid from "./TopMoversGrid.jsx";

export default class extends Component {
    constructor(props) {
        super(props);

        this.fxDataService = new FxDataService();
    }

    render() {
        return (
            <div>
                <div style={{float: "left", marginRight: 25}}>
                    <FxQuoteMatrix fxDataService={this.fxDataService}/>
                </div>
                <div style={{float: "left"}}>
                    <TopMoversGrid fxDataService={this.fxDataService}/>
                </div>
            </div>
        );
    }
};
