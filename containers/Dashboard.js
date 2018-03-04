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
import Profile from '../components/widgets/Profile';

import { selectApp, logout } from '../actions';

import ReduxOutlet from '../outlets/ReduxOutlet';
import moment from 'moment';
import ModalFactory from '../components/modals/factory';

let Factory = ModalFactory.modalFromFactory;

import LineChart from '../components/charts/LineChart';
import EasyPie from '../components/charts/EasyPie';
import ProgressBar from '../components/charts/ProgressBar';


import {I, Panel, Button} from '../components/ui/';
import {Row, Col, Page} from '../components/ui/Layout';

var shallowCompare = require('react-addons-shallow-compare');

class Dashboard extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { dispatch } = this.props;
    let i = 0;
    return (
      <Page>

        <Row>
          <Col size={6}>
              <a href="/newclient">
                <Panel classes={'text-center'}>
                    <i className="fa fa-user-plus fa-5x"></i>
                    <h4 className="m-b-none">New User </h4>
                    <small>Enter Details</small>
                </Panel>
              </a>
          </Col>
          <Col size={6}>
            <a href="/client">
                <Panel classes={'text-center'}>
                    <i className="fa fa-search fa-5x"></i>
                    <h4 className="m-b-none">Existing User</h4>
                    <small>Search by id / email </small>
                </Panel>
            </a>
          </Col>
        </Row>

          <Row>
              <Col size={12}>
                  <Panel classes={'text-center'}>
                      <i className="fa fa-line-chart fa-5x"></i>
                      <h4 className="m-b-none">Analytics</h4>
                      <small> Coming soon </small>
                  </Panel>
              </Col>
          </Row>

          <Row>
              <Col size={12}>
                  <Panel classes={'no-padder'}>

                      <div className="col-md-3 summaryItem">
                          <h1 style={{color: '#42f4f1'}}> - </h1>
                          <p> CLIENTS </p>
                      </div>
                      <div className="col-md-3 summaryItem">
                          <h1 style={{color: '#42f4f1'}}> 1 </h1>
                          <p> VR SCENARIOS </p>
                      </div>
                      <div className="col-md-3 summaryItem">
                          <h1 style={{color: '#42f4f1'}}> - </h1>
                          <p> CLIENTS TREATED </p>
                      </div>

                      <div className="col-md-3 summaryItem">
                          <h1 style={{color: '#42f4f1'}}> - </h1>
                          <p> RETURNING CLIENTS </p>
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
    user: state.user,
    app:state.app
  };
}

export default connect(mapStateToProps)(Dashboard);

