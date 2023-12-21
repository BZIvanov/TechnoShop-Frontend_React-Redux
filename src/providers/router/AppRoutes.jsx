import { Routes, Route } from 'react-router-dom';

import NonUserRoute from '../../components/user/route/NonUserRoute/NonUserRoute';
import ProtectedRoute from '../../components/user/route/ProtectedRoute/ProtectedRoute';
import RegisterForm from '../../components/user/auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/user/auth/LoginForm/LoginForm';
import ResetPasswordForm from '../../components/user/auth/ResetPasswordForm/ResetPasswordForm';
import NavigationLayout from '../../components/user/layouts/NavigationLayout/NavigationLayout';
import OrdersList from '../../components/order/OrdersList/OrdersList';
import PasswordUpdateForm from '../../components/user/auth/PasswordUpdateForm/PasswordUpdateForm';
import ManageCategory from '../../components/category/ManageCategory/ManageCategory';
import ManageSubcategory from '../../components/subcategory/ManageSubcategory/ManageSubcategory';
import ManageProduct from '../../components/product/ManageProduct/ManageProduct';
import Products from '../../components/product/Products/Products';

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
        <Route path='password' element={<PasswordUpdateForm />} />
      </Route>
      <Route
        path='/admin'
        element={
          <ProtectedRoute
            authRedirectTo='/login'
            roleRedirectTo='/'
            roles={['admin']}
          >
            <NavigationLayout />
          </ProtectedRoute>
        }
      >
        <Route path='orders' element={<OrdersList />} />
        <Route path='category' element={<ManageCategory />} />
        <Route path='subcategory' element={<ManageSubcategory />} />
        <Route path='product' element={<ManageProduct />} />
        <Route path='product/:productId' element={<ManageProduct />} />
        <Route path='products-list' element={<Products />} />
        <Route path='password' element={<PasswordUpdateForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
