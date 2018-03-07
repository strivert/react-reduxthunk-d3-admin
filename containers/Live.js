/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Charts
 */

import React,{ Component, ReactDOM } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button } from '../components/ui';
import ReduxOutlet from '../outlets/ReduxOutlet';
import moment from 'moment';
import ModalFactory from '../components/modals/factory';

let Factory = ModalFactory.modalFromFactory;

import LineChart from '../components/charts/LineChart';
import EasyPie from '../components/charts/EasyPie';
import DonutChart from '../components/charts/DonutChart';
import GaugeChart from '../components/charts/GaugeChart';
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
            },
            shouldGaugeUpdate: false,
            gaugePanelHeight: 330
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
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    updateDimensions() {
        this.setState({
          shouldGaugeUpdate: true
        }, ()=>{
          if (window.innerWidth > 590 && window.innerWidth < 990) {
            this.setState({
              gaugePanelHeight: 470,
              shouldGaugeUpdate: false
            })
          } else  {
            this.setState({
              gaugePanelHeight: 330,
              shouldGaugeUpdate: false
            })
          }
        });
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
                    <Col size={8} classes={'no-padder-col'}>
                        <Panel classes={'no-padder'}>
                            <div className="cnt-panel">
                                <h4 className={'font-semibold'}>Heart Rate, BPS</h4>
                            </div>

                            <div className="separator" />
                            <div className="cnt-panel">

                            <LineChart data={this.state.chartData} />

                            </div>
                        </Panel>

                    </Col>
                    <Col size={4} classes={'no-padder-col'}>
                        <Panel classes={'no-padder'}>
                            <div className="cnt-panel">
                                <h4 className={'font-semibold'}>Stress Levels (RR intervals, pupil dilation) </h4>
                            </div>

                            <div className="separator" />

                            <div className="cnt-panel">
                                <div style={{
                                    height: `${this.state.gaugePanelHeight}px`,
                                    marginTop: "-75px"
                                }}>
                                    <GaugeChart
                                        options = {{
                                            forceRender: this.state.shouldGaugeUpdate,
                                            fluidWidth: true,
                                            minValue: 0,
                                            maxValue: 100,
                                            value: 92.45,
                                            needleColor: "#464646",
                                            startColor: "#9fdd00",
                                            endColor: "#f54500",
                                            ringWidth: 80,
                                            segments: 100,
                                            textColor: "#ffffff"
                                        }}
                                    />
                                </div>
                                <div className="separator" style={{marginTop: '40px'}} />
                                <h3 style={{margin: 0, marginTop: '12px', textAlign: 'center'}}>92.45%</h3>
                            </div>
                        </Panel>
                    </Col>
                </Row>
                <Row>

                    <Col size={4} classes={'no-padder-col'}>
                        <Panel classes={'no-padder'}>
                            <div className="cnt-panel">
                                <div className="flex justify-content-between">
                                    <h4 className={'font-semibold'}>Breathing Stabilizer</h4>
                                    <Switch on={this.state.flagDetails["DisplayBreathingPacer"]} className="switch-custom" name="DisplayBreathingPacer" onChange={this.handleBreadingPacer} />
                                </div>
                            </div>

                            <div className="separator" />

                            <div className="cnt-panel">
                                <div className="cnt-panel-center">
                                    <div className="cnt-back first"></div>
                                    <div className="cnt-back second"></div>
                                    <div className="cnt-back third"></div>
                                </div>
                                <div className="cnt-panel-desc">
                                    <p>Show the client a<br /> Breathing Stabilizer</p>
                                </div>
                            </div>
                        </Panel>
                    </Col>
                    <Col size={4} classes={'no-padder-col'}>
                        <Panel classes={'no-padder'}>
                            <div className="cnt-panel">
                                <div className="flex justify-content-between">
                                    <h4 className={'font-semibold'}>Counter</h4>
                                    <Switch on={this.state.flagDetails["DisplayCounter"]} className="switch-custom" name="DisplayCounter" onChange={this.handleCounter} />
                                </div>
                            </div>

                            <div className="separator" />

                            <div className="cnt-panel">
                                <div className="cnt-panel-center counter">
                                    <div className="cnt-panel-center" style={{display: 'flex', justifyContent: 'center'}}>
                                        <DonutChart height="90" options={{
                                            angle: 0.5,
                                            lineWidth: 0.1,
                                            radiusScale: 0.9,
                                            pointer: {
                                                length: 0.6,
                                                strokeWidth: 0.035,
                                                color: '#000000'
                                            },
                                            limitMax: false,
                                            limitMin: false,
                                            colorStart: '#ea5a39',
                                            colorStop: '#ea5a39',
                                            strokeColor: '#eff0f5',
                                            generateGradient: true,
                                            highDpiSupport: true,
                                        }} max="100" value="4"/>
                                    </div>
                                </div>
                                <div className="cnt-panel-desc">
                                    <p>Make the Counter visible<br /> to client</p>
                                </div>
                            </div>
                        </Panel>
                    </Col>


                    <Col size={4} classes={'no-padder-col'}>
                        <Panel classes={'no-padder'}>
                            <div className="cnt-panel">
                                <div className="flex justify-content-between">
                                    <h4 className={'font-semibold'}>Show Heart Rate</h4>
                                    <Switch on={this.state.flagDetails["DisplayHeartRate"]} name="displayHeartRate" className="switch-custom" onChange={this.handleHeartRateDisplay} />
                                </div>
                            </div>

                            <div className="separator" />

                            <div className="cnt-panel">
                                <div className="cnt-panel-center heart">
                                    <div className="cnt-back first">
                                    </div>
                                </div>
                                <div className="cnt-panel-desc">
                                    <p>Show client its<br />Heart Rate</p>
                                </div>
                            </div>
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col size={12} classes={'no-padder-col'}>
                        <Panel classes={'no-padder'}>
                            <div className="cnt-panel">
                                <div className="flex justify-content-between">
                                    <h4 className={'font-semibold'}>Client Assessment</h4>
                                </div>
                            </div>

                            <div className="separator" />

                            <div className="cnt-panel capture">
                                <textarea name="clientAssessment" rows="5"></textarea>
                                <div>
                                    <button className="btn btn-danger capture"><span className="text">CAPTURE</span></button>
                                </div>
                            </div>
                        </Panel>
                    </Col>
                </Row>

                <footer id="footer">
                    <div className="bg-dark dker wrapper">
                        <div className="container text-center m-t-lg">
                            <div className="m-t-xl m-b-xl">
                                <h4>Absolute Marmot</h4>
                                <p>&copy;Copyright Absolute Marmot 2018-present. All rights reserved.</p>
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

