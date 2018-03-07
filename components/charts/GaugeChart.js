import React, {Component} from 'react';
import ReactChartist from 'react-chartist';

import ReactSpeedometer from "react-d3-speedometer";

export default class GaugeChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactSpeedometer
                {...this.props.options}
            />
        );
    }
}
