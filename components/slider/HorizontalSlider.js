import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

export default class HorizontalSlider extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            horizontal: 10,
            vertical: 50
        }
    }

    handleChangeHorizontal = value => {
        this.setState({
            horizontal: value
        })
    };

    handleChangeVertical = value => {
        this.setState({
            vertical: value
        })
    };

    render () {
        const { horizontal, vertical } = this.state
        const horizontalLabels = {
            0: 'Low',
            50:'Medium',
            100:'High'
        }

        const formatkg = value => value
        const formatPc = p => p + '%'

        return (
            <div className='slider custom-labels'>
                <div className='value'>Control stress factor x</div>
                <div className='value'>{formatPc(horizontal)}</div>
                <hr />
                <Slider
                    value={horizontal}
                    orientation='horizontal'
                    format={formatPc}
                    labels={horizontalLabels}
                    handleLabel={horizontal}
                    format={formatPc}

                    onChange={this.handleChangeHorizontal}
                />

            </div>
        )
    }
}
