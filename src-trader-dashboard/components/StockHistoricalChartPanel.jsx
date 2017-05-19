import React, {Component} from "react";

import * as d3 from "d3";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltip: {display: false, data: {key: '', value: ''}},
            width: 0
        };
    }

    componentDidMount() {
        this.renderGraph()
    }

    componentDidUpdate() {
        this.renderGraph()
    }

    renderGraph() {
        if (!this.props.historicalData) {
            return;
        }

        let data = this.props.historicalData;
        let parseTime = d3.timeParse("%d-%m-%y");
        data.forEach((datum) => {
            datum.date = parseTime(datum.date);
            datum.price = +datum.price;
        });

        d3.select(this.refs.historyGraph).selectAll("svg").remove();
        let svg = d3.select(this.refs.historyGraph).append('svg');

        svg.attr('height', '250')
            .attr('width', '400');

        let margin = {top: 20, right: 20, bottom: 30, left: 0},
            width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let x = d3.scaleTime()
            .rangeRound([0, width]);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.price);
            });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain(d3.extent(data, function (d) {
            return d.price;
        }));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }

    render() {
        let containerStyle = {
            marginTop: 5,
            height: 500
        };

        if (!this.props.historicalData) {
            return null;
        } else {
            return (
                <div style={containerStyle} ref="historyGraph"></div>
            );
        }
    }
}
