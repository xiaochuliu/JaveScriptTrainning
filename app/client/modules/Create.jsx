import React, { Component } from 'react';

import ShortenedLinks from './ShortenedLinks';
import ShortenedLink from './ShortenedLink';

const checkStatus = (res) => {
  if (res.status === 200) {
    return res;
  } else if (res.status === 404) {
    const error = new Error('Please enter a valid URL');
    error.res = res
    throw error
  }
}

export default class Create extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: '',
      link: null,
      submitting: false,
      url: ''
    };
  }

  handleSubmit (e) {
    e.preventDefault();

    this.setState({
      submitting: true
    }, () => {
      fetch('/links', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: this.refs.url.value }),
        credentials: 'same-origin'
      })
        .then(checkStatus)
        .then((res) => res.json())
        .then((link) => {
          this.setState({
            link,
            submitting: false,
            url: ''
          });
        })
        .catch(({ message }) => {
          this.setState({
            submitting: false,
            error: message
          });
        });
    });
  }

  handleChange ({ target: { value }}) {
    this.setState({
      error: '',
      url: value
    });
  }

  render () {
    const { error, link, submitting, url } = this.state;

    return (
      <div>
        <form>
          <input
            className='text'
            type='text'
            ref='url'
            onChange={this.handleChange.bind(this)}
            value={ url }
          />
          <input
            type='submit'
            onClick={this.handleSubmit.bind(this)}
            value='Shorten'
          />
        </form>
        { submitting && <img className='spinner' src='/spiffygif_46x46.gif' /> }
        <div
          className={`message${error ? ' error' : ''}`}
        >
          { error }
        </div>
        { link &&
          <ShortenedLinks>
            <ShortenedLink {...link} />
          </ShortenedLinks>
        }
      </div>
    );
  }
}
