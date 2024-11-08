import { Routes, Route } from 'react-router-dom';

import NonUserRoute from '../../components/user/route/NonUserRoute';
import ProtectedRoute from '../../components/user/route/ProtectedRoute';
import Home from '../../components/home/Home';
import Shop from '../../components/shop/Shop';
import CartProducts from '../../components/cart/products/CartProducts';
import RegisterForm from '../../components/user/auth/register/RegisterForm';
import LoginForm from '../../components/user/auth/login/LoginForm';
import PasswordResetForm from '../../components/user/auth/PasswordResetForm';
import NavigationLayout from '../../components/user/navigation/NavigationLayout';
import OrdersList from '../../components/order/OrdersList';
import WishList from '../../components/wishlist/WishList';
import UserProfile from '@/components/manage/common/profile/UserProfile';
import ManageCategory from '@/components/manage/admin/categories/ManageCategory';
import ManageSubcategory from '@/components/manage/admin/subcategories/ManageSubcategory';
import ManageProduct from '../../components/product/ManageProduct';
import ManageProducts from '../../components/product/ManageProducts';
import ProductDetailed from '../../components/product/detailed/ProductDetailed';
import ManageCoupon from '@/components/manage/admin/coupons/ManageCoupon';
import CategoryProducts from '../../components/category/CategoryProducts';
import SubcategoryProducts from '../../components/subcategory/SubcategoryProducts';
import Checkout from '../../components/checkout/Checkout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/cart' element={<CartProducts />} />
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
            <PasswordResetForm />
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
        <Route path='wishlist' element={<WishList />} />
        <Route path='profile' element={<UserProfile />} />
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
        <Route path='products' element={<ManageProducts />} />
        <Route path='coupon' element={<ManageCoupon />} />
        <Route path='profile' element={<UserProfile />} />
      </Route>
      <Route path='/product/:productId' element={<ProductDetailed />} />
      <Route path='/category/:categoryId' element={<CategoryProducts />} />
      <Route
        path='/subcategory/:subcategoryId'
        element={<SubcategoryProducts />}
      />
      <Route
        path='/checkout'
        element={
          <ProtectedRoute authRedirectTo='/login'>
            <Checkout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
