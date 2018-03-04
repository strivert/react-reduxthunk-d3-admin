/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule signup
 */

import React, {Component} from 'react';
import {API_URL} from '../../constants/config';
import Input from '../ui/Input';
import axios from "axios";

export default class Signup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
            phoneNumber: '',
			password: '',
			password2 : '',
			error:''
	    };
	}

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }

	handleEmailChange(e) {
    	this.setState({ email: e.target.value });
  	}

	handlePassChange(e) {
    	this.setState({ password: e.target.value });
  	}

  handlePass2Change(e) {
      this.setState({ password2: e.target.value });
    }

	handleRegister(e) {
        this.setState({coachId: "00000000-0000-0000-0000-000000000000"});
        var body = JSON.stringify(this.state);
        return axios.post(API_URL + 'Coach', body,
            {
                headers: {
                    //'x-access-token': token
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status == 200) {
                    console.log("A new coach was created");
                }})
            .catch((error) => {
                console.log(error);
            });
		//this.props.onLogin(this.state.email, this.state.password);
	}

	render() {
		return (
			<section className="wrapper-md animated fadeInUp">
        <form role="form">
            <div className="form-group"><Input ref="nameRef" autoComplete={'off'} format="name" icon="fa fa-user" required={true} errorMessage="Please verify your name" placeholder="name" value={this.state.name} onFieldChange={(e)=>this.handleNameChange(e)} /></div>
            <div className="form-group"><Input ref="emailRef" autoComplete={'off'} format="email" icon="fa fa-user" required={true} errorMessage="Please verify your email" placeholder="email" value={this.state.email} onFieldChange={(e)=>this.handleEmailChange(e)} /></div>
            <div className="form-group"><Input ref="phoneRef" autoComplete={'off'} format="phone" icon="fa fa-phone" required={true} errorMessage="Please verify your phone" placeholder="phone" value={this.state.phoneNumber} onFieldChange={(e)=>this.handlePhoneChange(e)} /></div>
			<div className="form-group"><Input ref="loginRef" autoComplete={'off'} format="password" icon="fa fa-lock" required={true} errorMessage="Password is required" placeholder="password" value={this.state.password} onFieldChange={(e)=>this.handlePassChange(e)} /></div>
            <div className="form-group"><Input ref="loginRef" autoComplete={'off'} format="password" icon="fa fa-lock" required={true} errorMessage="Passwords must match" placeholder="re-enter password" value={this.state.password2} onFieldChange={(e)=>this.handlePass2Change(e)} /></div>
            <p className="help-block">{this.props.errorMessage ? this.props.errorMessage.message : ''}</p>
            <div className="form-group">
                <button type="button" onClick={(e)=>this.handleRegister(e)} className="btn btn-info btn-block w-pad">Register</button>
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
