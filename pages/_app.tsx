import '../styles/global.scss';
import 'react-circular-progressbar/dist/styles.css';
import 'rc-slider/assets/index.css';

import React from 'react';
import { Provider } from 'react-redux';
import store from 'utils/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
