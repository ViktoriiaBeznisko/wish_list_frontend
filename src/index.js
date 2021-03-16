import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// This function is fired when the final values for any of the metrics have finished calculating on the page. You can use it to log any of the results to the console or send to a particular endpoint
import reportWebVitals from './reportWebVitals';
// allows us to set up our store, add thunk, add chrome dev tools
import { createStore, applyMiddleware, compose } from 'redux';
// Gives us redux
import { Provider } from 'react-redux';
// adds ability to make asynchronous actions for Redux
import thunk from 'redux-thunk';
// Gives us Router
import { BrowserRouter as Router } from 'react-router-dom';
// We build this:
import { reducer } from './redux/reducer';




const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();





