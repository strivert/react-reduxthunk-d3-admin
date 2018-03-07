import React, {Component} from 'react';
import {Gauge, Donut} from 'gaugeJS';

export default class DonutWrapper extends React.Component {
	componentDidMount(){
		let gauge = new Donut(this.node).setOptions(this.props.options);
		gauge.maxValue = this.props.max;
    gauge.set(this.props.value);
    gauge.setMinValue(0);        
        
	}
	render(){
		return (
      <div>
          <canvas ref={node => this.node = node}  width={this.props.width} height={this.props.height} style={{
              transform: "rotate(180deg)", margin: 'auto'
          }} />
          <div className="cnt-back second font-bold">{this.props.value}</div>
      </div>
    )
	}
}