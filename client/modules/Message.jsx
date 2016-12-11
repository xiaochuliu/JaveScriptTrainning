import React, { Component } from 'react';

export default class Message extends Component {
  render () {
    const { id, text, username } = this.props;

    return (
      <div className="chat" data-id={ id }>
        <div className="user">{ username }</div>
        <div className="text">{ text }</div>
      </div>
    );
  }
}
