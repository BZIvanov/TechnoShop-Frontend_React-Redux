import PropTypes from 'prop-types';

import { useSelector } from '../../../../providers/store/store';
import { selectUser } from '../../../../providers/store/features/user/userSlice';
import CountdownProgress from '../../../common/feedback/CountdownProgress/CountdownProgress';

const ProtectedRoute = ({
  children,
  authRedirectTo,
  roleRedirectTo,
  roles,
}) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <CountdownProgress redirectTo={authRedirectTo} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <CountdownProgress redirectTo={roleRedirectTo} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  authRedirectTo: PropTypes.string,
  roleRedirectTo: PropTypes.string,
  roles: PropTypes.array,
};

export default ProtectedRoute;
