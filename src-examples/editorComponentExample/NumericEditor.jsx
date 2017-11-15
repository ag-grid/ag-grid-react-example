import React, {Component} from "react";

export default class NumericEditor extends Component {
    constructor(props) {
        super(props);

        // if the character pressed to start editing isn't numeric we set this flag, which will mean editing wont be initiated
        this.cancelBeforeStart = this.props.charPress && ('1234567890'.indexOf(this.props.charPress) < 0);

        let value = this.props.value;
        if (!this.cancelBeforeStart && this.props.charPress) {
            value = value + this.props.charPress;
        }

        this.state = {
            value
        };
    }

    componentDidMount() {
        this.refs.input.addEventListener('keydown', this.onKeyDown);
        this.focus();
    }

    componentWillUnmount() {
        this.refs.input.removeEventListener('keydown', this.onKeyDown);
    }

    // componentDidUpdate() {
    //     this.focus();
    // }

    focus() {
        if (!this.cancelBeforeStart) {
            setTimeout(() => {
                this.refs.input.focus();
                this.refs.input.setSelectionRange(this.refs.input.value.length, this.refs.input.value.length);
            })
        }
    }

    getValue() {
        return this.state.value;
    }

    isCancelBeforeStart() {
        return this.cancelBeforeStart;
    }

    // will reject the number if it greater than 1,000,000
    // not very practical, but demonstrates the method.
    isCancelAfterEnd() {
        return this.state.value > 1000000;
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    onKeyDown = (event) => {
        // allow back and forth navigation, as well as editing
        if (NumericEditor.isAllowableKeypress(event)) {
            event.stopPropagation();
            return;
        }

        // if not a numeral, then reject the keypress
        if (!NumericEditor.isKeyPressedNumeric(event)) {
            if (event.preventDefault) event.preventDefault();
        }
    };

    static isAllowableKeypress(event) {
        // left, right, backspace & delete
        return [37, 39, 46, 8].indexOf(event.keyCode) > -1;
    }

    static getCharCodeFromEvent(event) {
        event = event || window.event;
        return (typeof event.which === "undefined") ? event.keyCode : event.which;
    }

    static isCharNumeric(charStr) {
        return !!/\d/.test(charStr);
    }

    static isKeyPressedNumeric(event) {
        const charCode = NumericEditor.getCharCodeFromEvent(event);
        const charStr = event.key ? event.key : String.fromCharCode(charCode);
        return this.isCharNumeric(charStr);
    }

    render() {
        return (
            <input ref="input"
                   value={this.state.value}
                   onChange={this.handleChange}
                   style={{width: "100%",padding:0,margin:-1}}
            />
        );
    }
}