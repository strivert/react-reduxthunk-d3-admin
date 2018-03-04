/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Login
 */

import React, {Component} from 'react';

import Input from '../ui/Input';
import axios from "axios";
import {API_URL_LOAD_BALANCER} from "../../constants/config";
import {syncHistoryWithStore} from "react-router-redux";
import {browserHistory} from "react-router";
import configureStore from "../../store/configureStore";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default class Login extends Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
	      email: '',
	      password: '',
	      error:''
	    };

	}

	handleEmailChange(e) {
    	this.setState({ email: e.target.value });
  	}

	handlePassChange(e) {
    	this.setState({ password: e.target.value });
  	}

  	handleLogin(e) {
  		//this.props.onLogin(this.state.email, this.state.password);
        const history = this.props;
        var body = JSON.stringify(this.state);
        return axios.post(API_URL_LOAD_BALANCER + 'Login', body,
            {
                headers: {
                    //'x-access-token': token
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data._id);
                    console.log("Login was successful");
                    history.push('/');
                    // set cookie with coachID
                    sessionStorage.set("coachId", "a28c0a9b-4e06-473b-b5e8-16b694db35ff");
                }})
            .catch((error) => {
                console.log(error);
            });
  	}

	render() {
		return (
			<section className="wrapper-md animated fadeInUp">
        <form role="form">
            <div className="form-group"><Input ref="emailRef" autoComplete={'off'} format="email" icon="fa fa-user" required={true} errorMessage="Please verify your email" placeholder="email" value={this.state.email} onFieldChange={(e)=>this.handleEmailChange(e)} /></div>
            <div className="form-group"><Input ref="loginRef" autoComplete={'off'} format="password" icon="fa fa-lock" required={true} errorMessage="Password is required" placeholder="password" value={this.state.password} onFieldChange={(e)=>this.handlePassChange(e)} /></div>
            <p className="help-block">{this.props.errorMessage ? this.props.errorMessage.message : ''}</p>
            <div className="form-group">
                <button type="button" onClick={(e)=>this.handleLogin(e)} className="btn btn-info btn-block w-pad">Login</button>
            </div>
            <div className="form-group">
              <p>{this.state.error}</p>
            </div>
            <div className="text-center">
              <a href="javascript:;" onClick={()=>this.props.onForgot()} className="w-login">Forgot your password?</a>
            </div>
        </form>
      </section>
		);
	}
}
