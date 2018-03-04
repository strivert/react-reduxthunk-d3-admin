const SIGNAL_R_HUB="http://tcp-signalr-hub-c44fc121b4825256.elb.eu-central-1.amazonaws.com/heartrate";

import React, { Component } from 'react';
import {Row, Col, Page} from '../components/ui/Layout';
import { HubConnection } from '@aspnet/signalr-client';

class Message extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: 'dashboard',
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {

        const hubConnection = new HubConnection(SIGNAL_R_HUB);

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
    };

    sendMessage = () => {
        this.state.hubConnection
            .invoke('send', this.state.name, this.state.message)
            .catch(err => console.error(err));

        this.setState({message: ''});
    };

    render() {
        return (
            <Page>
                <Row>
                    <Col size="12">
                        <div>
                        {this.state.messages.map((message, index) => (
                            <span style={{display: 'block'}} key={index}> {message} </span>
                        ))}
                    </div>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default Message;
