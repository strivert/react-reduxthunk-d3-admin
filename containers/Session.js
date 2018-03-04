/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Charts
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import ReduxOutlet from '../outlets/ReduxOutlet';
import moment from 'moment';
import ModalFactory from '../components/modals/factory';

let Factory = ModalFactory.modalFromFactory;

import LineChart from '../components/charts/LineChart';

import {Fa, I, Pager, SearchBox ,IStack} from '../components/ui/';
import '../containers/Components';
import {Panel} from '../components/ui/';
import {Row, Col, Page} from '../components/ui/Layout';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
var shallowCompare = require('react-addons-shallow-compare');


class Session extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {

        const { dispatch } = this.props;
        let i = 0;
        const horizontalLabels = {
            0: '1',
            50:'Medium',
            100:'High'
        }

        return (
            <Page>
                <Row>
                    <Col size="6">
                        <Panel title="30 Jan 2018 @ 17:51">
                            Duration : --
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col size="8">
                        <Panel title="Heart Rate Variability, 1 - 100">
                            <LineChart data={{labels: ['15:51:37', '15:51:38', '15:51:39', '15:51:40', '15:51:41', '15:51:42', '15:51:43', '15:51:44', '15:51:45', '15:51:46','15:51:47', '15:51:48', '15:51:49'],
                                series: [
                                    [89, 89, 87, 85, 82, 79, 79, 81, 82, 84, 84, 86, 87]
                                ]}} />
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col size="8">
                        <Panel title="RR Intervals, ms">
                            <LineChart data={{labels: ['15:51:37', '15:51:38', '15:51:39', '15:51:40', '15:51:41', '15:51:42', '15:51:43', '15:51:44', '15:51:45', '15:51:46','15:51:47', '15:51:48', '15:51:49'],
                                series: [
                                    [89, 89, 87, 85, 82, 79, 79, 81, 82, 84, 84, 86, 87]
                                ]}} />
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col size="8">
                        <Panel title="Heart Rate, bpm">
                            <LineChart data={{labels: ['15:51:37', '15:51:38', '15:51:39', '15:51:40', '15:51:41', '15:51:42', '15:51:43', '15:51:44', '15:51:45', '15:51:46','15:51:47', '15:51:48', '15:51:49'],
                                series: [
                                    [89, 89, 87, 85, 82, 79, 79, 81, 82, 84, 84, 86, 87]
                                ]}} />
                        </Panel>
                    </Col>
                </Row>

                <footer id="footer">
                    <div className="bg-dark dker wrapper">
                        <div className="container text-center m-t-lg">
                            <div className="m-t-xl m-b-xl">
                                <h4>Absolute Marmot</h4>
                                <p>&copy;Copyright Absolute Marmot 2018. All rights reserved.</p>
                                <p>
                                    <a href="#top" className="btn btn-icon btn-rounded btn-dark b-dark bg-empty m-sm text-muted">
                                        <i className="fa fa-angle-up"></i></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </Page>
        )
    }
}


function mapStateToProps(state) {
    return {
        token: state.app.token,
        user: state.user,
        apps:state.apps,
        app:state.app
    };
}

export default connect(mapStateToProps)(Session);

