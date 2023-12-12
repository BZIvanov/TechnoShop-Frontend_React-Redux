import Container from '@mui/material/Container';

import Header from './components/header/Header/Header';
import AppRoutes from './providers/router/AppRoutes';
import { useGetCurrentUserQuery } from './providers/store/services/users';

const App = () => {
  useGetCurrentUserQuery();

  return (
    <Container maxWidth='xl'>
      <Header />

      <AppRoutes />
    </Container>
  );
};

export default App;
