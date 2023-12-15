import { Routes, Route } from 'react-router-dom';

import NonUserRoute from '../../components/user/route/NonUserRoute/NonUserRoute';
import ProtectedRoute from '../../components/user/route/ProtectedRoute/ProtectedRoute';
import RegisterForm from '../../components/user/auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/user/auth/LoginForm/LoginForm';
import NavigationLayout from '../../components/user/layouts/NavigationLayout/NavigationLayout';

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
      <Route
        path='/user'
        element={
          <ProtectedRoute authRedirectTo='/login'>
            <NavigationLayout />
          </ProtectedRoute>
        }
      >
        <Route path='orders' element={<div>Order</div>} />
      </Route>
      <Route path='/shop' element={<div>Shop</div>} />
    </Routes>
  );
};

export default AppRoutes;
