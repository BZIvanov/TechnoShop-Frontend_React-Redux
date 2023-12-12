import PropTypes from 'prop-types';

import StoreProvider from './store/StoreProvider';
import BrowserRouterProvider from './router/BrowserRouterProvider';
import MuiThemeProvider from './theme/MuiThemeProvider';

const AppProviders = ({ children }) => {
  return (
    <StoreProvider>
      <BrowserRouterProvider>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </BrowserRouterProvider>
    </StoreProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node,
};

export default AppProviders;
