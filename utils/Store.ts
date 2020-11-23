import reducers from 'reducers';
import { applyMiddleware, createStore } from 'redux';

const { composeWithDevTools } =
  process.env.NODE_ENV === 'production'
    ? require('redux-devtools-extension/logOnlyInProduction')
    : require('redux-devtools-extension');

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

// const preloadState: PreloadedState<rootState> = {
//   matrix: [],
//   baseCount: 4,
//   baseValue: 2,
//   generateCount: 2,
// };

const store = createStore(
  reducers,
  // preloadState,
  composeEnhancers(applyMiddleware()),
);

export default store;

export type rootState = ReturnType<typeof reducers>;
