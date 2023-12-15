import { Routes, Route } from 'react-router-dom';

import NonUserRoute from '../../components/user/route/NonUserRoute/NonUserRoute';
import RegisterForm from '../../components/user/auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/user/auth/LoginForm/LoginForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<div>Home</div>} />
      <Route
        path='/register'
        element={
          <NonUserRoute>
            <RegisterForm />
          </NonUserRoute>
        }
      />
      <Route
        path='/login'
        element={
          <NonUserRoute>
            <LoginForm />
          </NonUserRoute>
        }
      />
      <Route path='/shop' element={<div>Shop</div>} />
    </Routes>
  );
};

export default AppRoutes;
