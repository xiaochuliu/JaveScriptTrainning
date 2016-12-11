import App from '../modules/App';
import router from 'react-router';

let that;

export default function getLinks (prevState, nextState, replace) {
  if (this instanceof App) {
    that = this;
  }

  // if initial load of App component or coming back to root route
  if (!prevState && !nextState && !replace ||
      nextState && nextState.location && nextState.location.pathname === '/') {
    fetch('/links', {
      credentials: 'same-origin'
    })
      .then((res) => res.json())
      .then((links) => {
        that.updateLinks(links)
      });
  }
};
