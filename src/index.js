import React from 'react';
import { render } from 'react-dom';
import './styles/main.scss';
import App  from './App';
import {Provider} from 'react-redux';
import reduxsStore from './redux/store';

render(
  <React.StrictMode>
    <Provider store={reduxsStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
