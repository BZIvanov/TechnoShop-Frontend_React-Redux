import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import { createStore } from './store';

const StoreProvider = ({ children, preloadedState }) => {
  return <Provider store={createStore(preloadedState)}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
  preloadedState: PropTypes.object,
};

export default StoreProvider;
