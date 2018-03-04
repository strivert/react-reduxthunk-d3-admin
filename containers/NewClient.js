const API_URL="http://marmotloadbalancer-220520586.eu-central-1.elb.amazonaws.com/api/";
import React, { Component } from 'react';
import Input from '../components/ui/Input';
import {Fa, I, Pager, SearchBox ,IStack, Button} from '../components/ui/';
import '../containers/Components';
import {Panel} from '../components/ui';
import {Row, Col, Page} from '../components/ui/Layout';
import DropDownButton from '../components/ui/DropDownButton';
import axios from 'axios';

var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/theme/monokai.css');

const sourceCode = `import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';`;


var shallowCompare = require('react-addons-shallow-compare');

class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clientId: '',
            clientName: '',
            email: '',
            gender: '',
            dateOfBirth: '',
            weight: 0,
            height: 0,
            healthStatus: '',
            scenario: ''
        };

        this.state = {showForm: true};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getClientIDs = this.getClientIDs.bind(this);
    }

     getClientIDs() {
        // GUID is set on the server
        this.setState({clientId: "00000000-0000-0000-0000-000000000000"});
        var body = JSON.stringify(this.state);
        delete body["showForm"];
        return axios.post(API_URL + 'Client', body,
             {
                 headers: {
                     //'x-access-token': token
                     'Content-Type': 'application/json'
                 }
             })
            .then((response) => {
             if (response.status == 200) {
                 console.log("User was created");
                 this.setState({showForm: !this.state.showForm});
             }})
            .catch((error) => {
                 console.log(error);
             });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getClientIDs();
        //this.createNewClient(JSON.stringify(this.state));
        //console.log(JSON.stringify(this.state));
        //postClient(this.state);
    }

    render() {
        return (
            <Page>
                <Row>
                    <Col size={12}>
                        <Panel title="New User Details">
                            {this.state.showForm ?
                            <form role="form" onSubmit={this.handleSubmit} className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-lg-2"> Name </label>
                                    <Input classes={'col-lg-10'} icon="fa fa-user" placeholder="First and Last Name" name="clientName" onChange={this.handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">Email</label>
                                    <Input classes={'col-lg-10'} icon="fa fa-at" name="email" onChange={this.handleInputChange} placeholder="claudia@absolutemarmot.com" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">Gender</label>
                                    <div className="col-lg-10" onChange={this.handleInputChange}>
                                        <label className="radio-inline"><input value="Male" name="gender" type="radio" /> Male </label>
                                        <label className="radio-inline"><input value="Female" name="gender" type="radio" /> Female</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">Date of Birth</label>
                                    <Input format="date" classes={'col-lg-10'} name="dateOfBirth" onChange={this.handleInputChange} icon="fa fa-birthday-cake" placeholder="dd/mm/yy" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">Weight</label>
                                    <Input classes={'col-lg-10'} name="weight" icon="fa fa-balance-scale" onChange={this.handleInputChange} placeholder="weight in stones" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2">Height</label>
                                    <Input classes={'col-lg-10'} name="height" icon="fa fa-male" onChange={this.handleInputChange} placeholder="height in feet" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">Health Status / Medication </label>
                                    <div className="col-lg-10"><textarea onChange={this.handleInputChange} name="healthStatus" className="message" rows="4" /></div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2">Scenario</label>
                                    <div className="col-lg-10">
                                        <select name="scenario" onChange={this.handleInputChange}>
                                            <option value="Acrophobia"> Acrophobia </option>
                                            <option value="Agorophobia"> Agorophobia </option>
                                            <option value="Claustrophobia"> Claustrophobia </option>
                                            <option value="Fear of animals"> Fear of animals </option>
                                            <option value="Fear of flying"> Fear of flying </option>
                                            <option value="Social phobia"> Social phobia </option>
                                            <option value="Exam / Test anxiety"> Exam / Test anxiety </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-lg-offset-2 col-lg-10">
                                        <Button type="submit" label="Submit" color="btn-success" />
                                    </div>
                                </div>
                            </form> :
                                <Comp title="Success">
                                    <IStack icon="check_circle" color="#ffffff" size={24} bg="green" />
                                    <div className="d-b"><strong className="h4">{this.state.clientName} was created successfully. </strong></div>
                                    <br/>
                                    <a href="/client" className="btn btn-success"><i className="m-r-xs fa fa-rocket"></i>
                                        <span class="text">Client Page</span>
                                    </a>
                                    <br/>
                                </Comp>
                                }
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
        );
    }
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

export default RegisterForm;

