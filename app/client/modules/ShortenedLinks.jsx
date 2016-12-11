import React, { Component } from 'react';

export default class ShortenedLinks extends Component {
  render() {
    return (
      <div className="links">
        { this.props.children }
      </div>
    );
  }
}
