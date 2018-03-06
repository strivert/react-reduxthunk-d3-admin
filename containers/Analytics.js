/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Dashboard
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import ReduxOutlet from '../outlets/ReduxOutlet';
import moment from 'moment';
import ModalFactory from '../components/modals/factory';
import Switch from 'react-toggle-switch';

import LineChart from '../components/charts/LineChart';
import EasyPie from '../components/charts/EasyPie';
import ProgressBar from '../components/charts/ProgressBar';
import DropDownButton from '../components/ui/DropDownButton';
import ReactSpeedometer from "react-d3-speedometer";

import {I, Panel, Button} from '../components/ui/';
import {Row, Col, Page} from '../components/ui/Layout';

import 'react-toggle-switch/dist/css/switch.min.css';

let Factory = ModalFactory.modalFromFactory;
var shallowCompare = require('react-addons-shallow-compare');


class Analytics extends Component {
  state = {
    flagDetails: {
      displayBreathingPacer: false,
      displayHeartRate: false,
      displayCounter: false
    },
    shouldGaugeUpdate: false,
    gaugePanelHeight: 330
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
  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }


  render() {
    const { dispatch } = this.props;
    let i = 0;
    return (
      <Page>
        
        <Row>
          <Col size={8} classes={'no-padder-col'}>
              <Panel classes={'no-padder'}>
                <div className="cnt-panel">
                  <h4 className={'font-semibold'}>Heart Rate, DPM</h4>
                </div>
                
                <div className="separator" />
                <div className="cnt-panel">
                  <LineChart data={{labels: ['20:15:7', '20:15:8', '20:15:9', '20:15:7', '20:15:10', '20:15:11', '20:15:12', '20:15:13', '20:15:10', '20:15:12'],
                    series: [
                    [70, 80, 75, 85, 90, 80, 80, 85, 75, 95]
                    ]}} />
                </div>
              </Panel>            
          </Col>
          <Col size={4} classes={'no-padder-col'}>
              <Panel classes={'no-padder'}>
                <div className="cnt-panel">
                  <h4 className={'font-semibold'}>Heart Rate, DPM</h4>
                </div>
                
                <div className="separator" />

                <div className="cnt-panel">
                  <div style={{                      
                      height: `${this.state.gaugePanelHeight}px`,
                      marginTop: "-75px"
                  }}>
                      <ReactSpeedometer
                        forceRender={this.state.shouldGaugeUpdate}
                        fluidWidth={true}
                        minValue={0}
                        maxValue={100}
                        value={92.45}
                        needleColor="#464646"
                        startColor="#9fdd00"
                        endColor="#f54500"
                        ringWidth={80}
                        segments={60}
                        textColor="#ffffff"
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
                    <Switch onClick={()=>{
                        this.setState({
                          flagDetails: {
                            ...this.state.flagDetails,
                            displayBreathingPacer: !this.state.flagDetails.displayBreathingPacer
                          }
                        });
                      }}
                      on={this.state.flagDetails.displayBreathingPacer}
                      className="switch-custom"
                    />
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
                    <Switch onClick={()=>{
                        this.setState({
                          flagDetails: {
                            ...this.state.flagDetails,
                            displayHeartRate: !this.state.flagDetails.displayHeartRate
                          }
                        });
                      }}
                      on={this.state.flagDetails.displayHeartRate}
                      className="switch-custom"
                    />
                  </div>
                </div>
                
                <div className="separator" />

                <div className="cnt-panel">
                  <div className="cnt-panel-center counter">
                    <div className="cnt-back first">
                      <div className="red-circle">
                      </div>
                    </div>
                    <div className="cnt-back second font-bold">1</div>
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
                    <Switch onClick={()=>{
                        this.setState({
                          flagDetails: {
                            ...this.state.flagDetails,
                            displayCounter: !this.state.flagDetails.displayCounter
                          }
                        });
                      }}
                      on={this.state.flagDetails.displayCounter}
                      className="switch-custom"
                    />
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
		);
	}
}


function mapStateToProps(state) {
  return {
    token: state.app.token,
    user: state.user
  };
}

export default connect(mapStateToProps)(Analytics);

