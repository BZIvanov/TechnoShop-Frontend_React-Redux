import PropTypes from 'prop-types';

import StoreProvider from './store/StoreProvider';
import BrowserRouterProvider from './router/BrowserRouterProvider';
import MuiThemeProvider from './theme/MuiThemeProvider';
import { ConfirmDialogProvider } from '../contexts/ConfirmDialogContext';

const AppProviders = ({ children }) => {
  return (
    <StoreProvider>
      <BrowserRouterProvider>
        <MuiThemeProvider>
          <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
        </MuiThemeProvider>
      </BrowserRouterProvider>
    </StoreProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node,
};

export default AppProviders;
