import React, {Component} from 'react';
import ReactChartist from 'react-chartist';

import ReactSpeedometer from "react-d3-speedometer";

export default class GaugeChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let options = {
            width: '300px',
            donut: true,
            donutWidth: 30,
            donutSolid: true,
            segments: 3,
            needleTransition: "easeElastic",
            startAngle: 270,
            total: 200,
            showLabel: false
        };

        return (
            <ReactSpeedometer />
        );
    }
}
