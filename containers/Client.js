import { API_URL_LOAD_BALANCER, HEARTRATES_HUB} from '../constants/config';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HubConnection } from '@aspnet/signalr-client';
import { Button } from '../components/ui';
import Input from '../components/ui/Input';
import PropTypes from 'prop-types';
import {Fa, I, Pager, SearchBox ,IStack} from '../components/ui/';
import '../containers/Components';
import {Panel} from '../components/ui/';
import {Row, Col, Page} from '../components/ui/Layout';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import axios from "axios";
import {browserHistory, Router} from 'react-router';;
import { withRouter } from 'react-router-dom';
import {syncHistoryWithStore} from "react-router-redux";
import configureStore from "../store/configureStore";

var shallowCompare = require('react-addons-shallow-compare');

import {Route, Link, IndexRoute } from "react-router";
const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

class Client extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            fetchUser: {
                name: "",
                gender: "",
                clientId: ""
            },
            bluetooth: {
                service: "",
                device: ""
            },
            pin: '',
            role: 'dashboard',
            messages: [],
            hubConnection: null
        };



        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleSubmitPin = this.handleSubmitPin.bind(this);

        this.fetchUser = this.fetchUser.bind(this);
        this.fetchHeartRate = this.fetchHeartRate.bind(this);
    }



  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    fetchHeartRate() {
        /*var client = new signalr.client(SIGNAL_R_HUB);
        client.handlers.testhub = {
            broadcastMessage: function(name, message) {
                console.log("recv => " + name + ":" + message);
            }
        }*/
        const hubConnection = new HubConnection(HEARTRATES_HUB);
        var role = "dashboard";
        this.setState({ hubConnection, role }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :(' + err));

            this.state.hubConnection.on('sendHeartRate', (heartrate) => {
                const text = `${heartrate}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        });
    }

    fetchUser() {
        var url = API_URL_LOAD_BALANCER + 'Client/' + this.state.email;

        return axios.get(url,
            {
                headers: {
                    //'x-access-token': token
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data);
                this.setState({fetchUser: {
                        name: response.data[0].clientName,
                        gender: response.data[0].gender,
                        clientId: response.data[0].clientId
                    }
                });
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    checkPin() {
        var url = API_URL_LOAD_BALANCER + 'SessionPin/' + this.state.pin;

        return axios.get(url,
            {
                headers: {
                    //'x-access-token': token
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data);
                if(response.status == 200) {

                    // START SESSION PROPERLY
                    // coachId from login cookie

                    var sessionBody = {
                        coachId: "a28c0a9b-4e06-473b-b5e8-16b694db35ff",
                        clientId: this.state.fetchUser.clientId,
                        roomId: response.data.roomId,
                        scenario: response.data.scenario
                    };
                    console.log(sessionBody);
                    return axios.post(API_URL_LOAD_BALANCER + 'Session', sessionBody,
                        {
                            headers: {
                                //'x-access-token': token
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {
                            if (response.status == 200) {
                                console.log("Session was created");
                            }})
                        .catch((error) => {
                            console.log(error);
                        });


                    history.push("/live");
                }
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSubmitPin(event) {
        event.preventDefault();
        this.checkPin();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.fetchUser();
    }

  render() {

    let i = 0;
      const horizontalLabels = {
          0: '1',
          50:'Medium',
          100:'High'
      }

    return (
      <Page>
          <Row>
              <Col size="12">
                  <Panel title="Search by client email">

                      <form role="form" onSubmit={this.handleSubmit} className="form-horizontal">
                          <div className="form-group">
                              <label className="control-label col-lg-2">Email</label>
                              <Input classes={'col-lg-10'} icon="fa fa-at" name="email" onChange={this.handleInputChange} placeholder="claudia@absolutemarmot.com" />
                          </div>

                          <div className="form-group">
                              <div className="col-lg-offset-2 col-lg-10">
                                  <Button type="submit" label="Find" color="btn-success" />
                              </div>
                          </div>
                      </form>

                  </Panel>
                  { this.state.fetchUser.name && (

                      <div>
                      <Panel title="Client Details">

                          <article className="comment-item">
                              <section className="comment-body">
                                  <header>
                                      <strong>
                                          <i className="fa fa-user" style={{color: '#f59393'}}></i> Name: {this.state.fetchUser.name} </strong>
                                  </header>
                              </section>
                          </article>

                          <article className="comment-item">
                              <section className="comment-body">
                                  <header>
                                      <strong>
                                          <i className="fa fa-genderless" style={{color: '#f59393'}}></i> Gender: {this.state.fetchUser.gender} </strong>
                                  </header>
                              </section>
                          </article>

                          <Button label="Connect to Heart Rate Monitor" icon="fa-bluetooth-b" size="btn-default" onClick={this.fetchHeartRate} classes={'m-r-sm m-b-sm'} color="btn-info" />

                          {this.state.bluetooth.device && (
                              <div className="alert alert-info">
                                  <b>Connected to: {this.state.bluetooth.device} </b>
                              </div>
                          )}
                          <div>
                              {this.state.messages.map((message, index) => (
                                  <span style={{display: 'block'}} key={index}> {message} </span>
                              ))}
                          </div>

                      </Panel>

                          <Panel title="Pin to Enter Experience ">
                              <div>You are now at {location.pathname}</div>
                              <form role="form" onSubmit={this.handleSubmitPin} className="form-horizontal">
                                  <div className="form-group">
                                      <label className="control-label col-lg-2">Enter Pin</label>
                                      <Input classes={'col-lg-6'} icon="fa fa-gamepad" name="pin" onChange={this.handleInputChange} placeholder="" />
                                  </div>

                                  <div className="form-group">
                                      <div className="col-lg-offset-2 col-lg-6">
                                          <Button type="submit" label="Enter" color="btn-success" />
                                      </div>
                                  </div>
                              </form>
                          </Panel>

                      </div>

                  )}

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

export default connect(mapStateToProps)(Client);

