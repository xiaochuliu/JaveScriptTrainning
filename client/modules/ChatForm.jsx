import React, { Component } from 'react';

export default class ChatForm extends Component {
  handleClick (e) {
    e.preventDefault();
    this.props.sendMessage(this.refs.message.value.trimRight());
    this.refs.message.value = '';
  }

  render () {
    return (
      <form>
        <input type="text" ref="message" id="message" />
        <input
          type="submit"
          name="submit"
          className="submit"
          onClick={this.handleClick.bind(this)}
        />
      </form>
    );
  }
}
