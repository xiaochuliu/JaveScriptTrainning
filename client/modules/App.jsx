import React, { Component } from 'react';

import Message from './Message';
import ChatForm from './ChatForm';
import Spinner from './Spinner';

let intervalId;

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSubmitting: false,
      messages: [],
      username: ''
    }
  }

  componentDidMount () {
    const username = (prompt('What is your name?') || 'anonymous');
    fetch('/classes/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(({ status }) => {
        if (status === 201) {
          this.setState({ username });
        }
      });

    intervalId = setInterval(() => {
      fetch('/classes/messages')
        .then((res) => res.json())
        .then((messages) => this.setState({ messages }));
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(intervalId);
  }

  sendMessage (text) {
    this.setState({
      isSubmitting: true
    }, () => {
      fetch('/classes/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, username: this.state.username })
      })
        .then((res) => {
          if (res.status === 201) {
            this.setState({ isSubmitting: false });
          }
        });
    })
  }

  render () {
    const { isSubmitting, messages } = this.state;

    return (
      <div>
        <div id="main">
          <h1>chatter<em>box</em></h1>
          {isSubmitting && <Spinner />}
          <ChatForm sendMessage={this.sendMessage.bind(this)} />
        </div>
        <div id="chats">
          {
            messages.map((message) => <Message {...message} key={message.id} />)
          }
        </div>
      </div>
    );
  }
}
