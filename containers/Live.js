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
import { Button } from '../components/ui';
import ReduxOutlet from '../outlets/ReduxOutlet';
import moment from 'moment';
import ModalFactory from '../components/modals/factory';

let Factory = ModalFactory.modalFromFactory;

import LineChart from '../components/charts/LineChart';
import EasyPie from '../components/charts/EasyPie';
import ReactSpeedometer from 'react-d3-speedometer';
import HorizontalSlider from '../components/slider/HorizontalSlider';

import {Fa, I, Pager, SearchBox ,IStack} from '../components/ui/';
import '../containers/Components';
import {Panel} from '../components/ui/';
import Switch from '../components/ui/Switch';
import {Row, Col, Page} from '../components/ui/Layout';
import ProgressBar from '../components/charts/ProgressBar';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {HEARTRATES_HUB_LOAD_BALANCER, FLAG_HUB_LOAD_BALANACER, DASHBOARD_ROLE, UNITY_ROLE} from "../constants/config";
import {HubConnection} from "@aspnet/signalr-client/dist/src/index";
var shallowCompare = require('react-addons-shallow-compare');


class Live extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            chartData: {},
            flagDetails: {
                "DisplayBreathingPacer": false,
                "DisplayHeartRate": false,
                "DisplayCounter": false
            }
        }

        this.fetchHeartRate = this.fetchHeartRate.bind(this);
        this.fetchFlagHub = this.fetchFlagHub.bind(this);
        this.handleBreadingPacer = this.handleBreadingPacer.bind(this);
        this.handleCounter = this.handleCounter.bind(this);
        this.handleHeartRateDisplay = this.handleHeartRateDisplay.bind(this);
    }

    componentDidMount() {
        this.fetchHeartRate();
        this.fetchFlagHub();

    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    fetchFlagHub() {
        const flagHubConnection = new HubConnection(FLAG_HUB_LOAD_BALANACER);
        var role = UNITY_ROLE;

        this.setState({ flagHubConnection, role }, () => {
            this.state.flagHubConnection
                .start()
                .then(() => console.log('Connection started to flags hub!'))
                .catch(err => console.log('Error while establishing connection to flags hub' + err));

            this.state.flagHubConnection.on('sendFlags', (flag) => {
                //var flagDetails = {};
                console.log(flag);
                //flagDetails = { this.state.flagDetails };
                //const text = `${flag}`;
                //flags.push(flag);
                //this.state.flagDetails = flag;
                //this.setState({ flagDetails });

            });
        })
    }

    handleBreadingPacer() {

        this.state.flagDetails["DisplayBreathingPacer"] = !this.state.flagDetails["DisplayBreathingPacer"];
        this.state.flagHubConnection.invoke('sendFlags', {flagDetails: this.state.flagDetails});

    }

    handleCounter() {

        this.state.flagDetails["DisplayCounter"] = !this.state.flagDetails["DisplayCounter"];
        this.state.flagHubConnection.invoke('sendFlags', {flagDetails: this.state.flagDetails});
        console.log(this.state);
    }

    handleHeartRateDisplay() {

        this.state.flagDetails["DisplayHeartRate"] = !this.state.flagDetails["DisplayHeartRate"];
        this.state.flagHubConnection.invoke('sendFlags', {flagDetails: this.state.flagDetails});
        console.log(this.state);
    }

    fetchHeartRate() {

        const hubConnection = new HubConnection(HEARTRATES_HUB_LOAD_BALANCER);
        var role = "dashboard";
        var messagesCreatedAt = new Array();
        var seriesHeartRate = new Array();
        this.setState({ hubConnection, role }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started to heartrate hub!'))
                .catch(err => console.log('Error while establishing connection :(' + err));

            this.state.hubConnection.on('sendHeartRate', (heartrate) => {
                var messages = new Array();

                console.log(heartrate);
                const text = `${heartrate}`;

                messages.push(heartrate);
                this.setState({ messages });

                for(var i=0; i<this.state.messages.length;i++ ) {
                    var d = new Date(this.state.messages[i].createdAt);

                    messagesCreatedAt.push(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
                    seriesHeartRate.push(this.state.messages[i].heartRate);

                    this.state.chartData = {
                        'labels': messagesCreatedAt.slice(Math.max(messagesCreatedAt.length - 10)),
                        'series': [seriesHeartRate.slice(Math.max(seriesHeartRate.length - 10))]
                    }
                }

            });
        });
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
                    <Col size="8" classes={'text-center'}>
                        <Panel title="Heart Rate, bpm">

                            <LineChart data={this.state.chartData} />

                        </Panel>
                    </Col>
                    <Col size="4" classes="text-center m-b-lg">
                        <Panel title="Stress Levels (Heart Rate and pupil dialation)">
                            <ReactSpeedometer
                                maxValue={600}
                                value={473}
                                needleColor="steelblue"
                                segments={3}
                                textColor="white"
                            />
                        </Panel>

                    </Col>
                </Row>
                <Row>
                    <Col size="4" classes={'text-center'}>
                        <Panel title="Breathing Pacer">
                                <i className="fa fa-align-justify fa-5x" style={{color: '#10e322'}}></i>
                                <div>
                                    <h4 className="m-b-10"> Show the client a Breathing Pacer </h4>
                                    <Switch on={this.state.flagDetails["DisplayBreathingPacer"]} classes={'m-r-lg'} name="DisplayBreathingPacer" onChange={this.handleBreadingPacer} />
                                </div>
                        </Panel>
                    </Col>
                    <Col size="4" classes={'text-center'}>
                        <Panel title="Counter">
                            <EasyPie
                                    size={100}
                                    barColor={'#36a9ae'}
                                    trackColor={'#fbfbfb'}
                                    lineWidth={15}
                                    percent={1}
                                    fontSize='16px'
                                    theme="honeycomb_light"
                                />
                            <div>
                                <h4 className="m-b-none">Make the counter visibile to client</h4>
                                <Switch on={this.state.flagDetails["DisplayCounter"]} name="DisplayCounter" classes={'m-r-lg'} onChange={this.handleCounter} />
                            </div>
                        </Panel>

                    </Col>
                    <Col size="4" classes={'text-center'}>
                        <Panel title="Show Heart Rate">
                            <i className="fa fa-heartbeat fa-5x" style={{color: '#e04949'}}></i>
                            <div>
                                <h4>Show Client its heart rate</h4>
                                <Switch on={this.state.flagDetails["DisplayHeartRate"]} name="displayHeartRate" classes={'m-r-lg'} onChange={this.handleHeartRateDisplay} />
                            </div>
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col size="12" classes={'text-center'}>
                        <Panel title="Client Assessment">

                            <textarea rows="4" cols="50">
                                Client self-declaration etc.
                            </textarea>

                        </Panel>
                        <Button type="submit" label="Capture" color="btn-success" />
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

let Comp = ({title, children, style, classes}) => (
    <div>
        <section className="panel panel-default">
            {title ? <header className="panel-heading">{title}<hr/></header> : null}
            <section className="panel-body text-center" style={style}>
                {children}
            </section>
        </section>
    </div>
)

export default connect(mapStateToProps)(Live);

