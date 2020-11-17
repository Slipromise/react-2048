import '../styles/global.scss';

import React from 'react';
import { Provider } from 'react-redux';

import store from '../utils/Store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
