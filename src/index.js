import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './App.css';

import Stocks from './modules/stocks';
import store from './redux/store';


ReactDOM.render(
  <Provider store={store}>
    <Stocks />
  </Provider>,
  document.getElementById('root')
);