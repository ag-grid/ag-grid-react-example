import React, {Component} from "react";

export default class PartialMatchFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.valueGetter = this.props.valueGetter;
    }

    isFilterActive() {
        return this.state.text !== null && this.state.text !== undefined && this.state.text !== '';
    }

    doesFilterPass(params) {
        return this.state.text.toLowerCase()
            .split(" ")
            .every((filterWord) => {
                return this.valueGetter(params.node).toString().toLowerCase().indexOf(filterWord) >= 0;
            });
    }

    getModel() {
        return {value: this.state.text};
    }

    setModel(model) {
        this.state.text = model ? model.value : '';
    }

    componentDidMount() {
        this.focus();
    }

    focus() {
        setTimeout(() => {
            if (this.refs.input) {
                this.refs.input.focus();
            }
        })
    }

    componentMethod(message) {
        alert(`Alert from PartialMatchFilterComponent ${message}`);
    }

    onChange = (event) => {
        let newValue = event.target.value;
        if (this.state.text !== newValue) {
            this.setState({
                text: newValue
            }, () => {
                // wait for the state to be applied, then let the grid know about the change
                this.props.filterChangedCallback();
            });

        }
    };

    render() {
        console.log("render");
        let style = {
            border: "2px solid #22ff22",
            borderRadius: "5px",
            backgroundColor: "#bbffbb",
            width: "200px",
            height: "50px"
        };

        return (
            <div style={style}>
                Filter: <input style={{height: "20px"}}
                               ref="input"
                               value={this.state.text}
                               onChange={this.onChange}
                               className="form-control"/>
            </div>
        );
    }
};
