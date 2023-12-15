import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from '../../../../providers/store/store';
import { selectUser } from '../../../../providers/store/features/user/userSlice';

const NonUserRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      const customNavigateTo = location.state?.customNavigateTo;
      if (customNavigateTo) {
        return navigate(customNavigateTo);
      }

      if (user.role === 'admin') {
        return navigate('/admin/orders');
      }

      return navigate('/user/orders');
    }
  }, [location, navigate, user]);

  return children;
};

export default NonUserRoute;
