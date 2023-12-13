import { Routes, Route } from 'react-router-dom';

import LoginForm from '../../components/user/auth/LoginForm/LoginForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<div>Home</div>} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/shop' element={<div>Shop</div>} />
    </Routes>
  );
};

export default AppRoutes;
