import React from 'react';
import RefData from './RefData';

// Date Component to be used in the date filter
export default class MyReactDateComponent extends React.Component {

    constructor(props) {
        super(props);
        // the entire ag-Grid properties are passed as one single object inside the params
        this.state = {
            agProps: props
        };
    }


    onDateChanged () {
        if (this.refs.dd.value === '' || this.refs.mm.value === '' || this.refs.yyyy.value === '') {
            return;
        }

        try {
            var day = Number(this.refs.dd.value);
            var month = Number(this.refs.mm.value);
            var year = Number(this.refs.yyyy.value);

            var date = new Date(year, month - 1, day);
            if (date){
                this.setState({
                    date:date
                }, this.notifyAgGrid.bind(this))
            }
        } catch (e){
            console.info("ignoring invalid date")
        }
    }

    notifyAgGrid (){
        this.props.onDateChanged();
    }

    getDate (){
        return this.state.date;
    }

    setDate (date){
        this.setState({
            date:date
        })
    }

    render() {
        return (
            <div>
                <input onInput = {this.onDateChanged.bind(this)} ref="dd" placeholder="dd"/>
                <input onInput = {this.onDateChanged.bind(this)} ref="mm" placeholder="mm"/>
                <input onInput = {this.onDateChanged.bind(this)} ref="yyyy" placeholder="yyyy"/>
            </div>
        );
    }


}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
MyReactDateComponent.propTypes = {
    params: React.PropTypes.object
};