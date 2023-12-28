import Container from '@mui/material/Container';

import Header from './components/header/Header/Header';
import AppRoutes from './providers/router/AppRoutes';
import { useGetCurrentUserQuery } from './providers/store/services/users';
import CartDrawer from './components/cart/CartDrawer/CartDrawer';
import ApiNotification from './components/common/feedback/ApiNotification/ApiNotification';

const App = () => {
  // populate current user info in redux on page reload
  useGetCurrentUserQuery();

  return (
    <Container maxWidth='xl'>
      <Header />

      <AppRoutes />

      <CartDrawer />

      <ApiNotification />
    </Container>
  );
};

export default App;
