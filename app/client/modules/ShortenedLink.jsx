import React, { Component } from 'react';

export default class ShortenedLink extends Component {
  render () {
    const { baseUrl, code, title, url, visits } = this.props;

    return (
      <div className="link">
        <img src='/redirect_icon.png' />
        <div className='info'>
          <div className='visits'>
            <span className='count'>{ visits }</span>Visits
          </div>
          <div className='title'>
            { title }
          </div>
          <div className='original'>
            { url }
          </div>
          <a href={`${baseUrl}/${code}`}>{`${baseUrl}/${code}`}</a>
        </div>
      </div>
    );
  }
}
