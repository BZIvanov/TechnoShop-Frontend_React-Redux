import { Routes, Route } from 'react-router-dom';

import NonUserRoute from '../../components/user/route/NonUserRoute/NonUserRoute';
import ProtectedRoute from '../../components/user/route/ProtectedRoute/ProtectedRoute';
import RegisterForm from '../../components/user/auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/user/auth/LoginForm/LoginForm';
import ResetPasswordForm from '../../components/user/auth/ResetPasswordForm/ResetPasswordForm';
import NavigationLayout from '../../components/user/layouts/NavigationLayout/NavigationLayout';
import OrdersList from '../../components/order/OrdersList/OrdersList';

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
        path='/reset-password/:token'
        element={
          <NonUserRoute>
            <ResetPasswordForm />
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
        <Route path='orders' element={<OrdersList />} />
        <Route path='wishlist' element={<div>Wishlist</div>} />
        <Route path='password' element={<div>Password Update</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
