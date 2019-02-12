import React, {Component} from "react";

export default class PriceRenderer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>{this.props.value}</span>
        );
    }
}
