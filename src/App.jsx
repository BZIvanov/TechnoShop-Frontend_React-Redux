import Container from '@mui/material/Container';

import Header from './components/header/Header/Header';
import AppRoutes from './providers/router/AppRoutes';
import { useGetCurrentUserQuery } from './providers/store/services/users';
import ApiNotification from './components/notification/ApiNotification/ApiNotification';

const App = () => {
  // populate current user info in redux on page reload
  useGetCurrentUserQuery();

  return (
    <Container maxWidth='xl'>
      <Header />

      <AppRoutes />

      <ApiNotification />
    </Container>
  );
};

export default App;
