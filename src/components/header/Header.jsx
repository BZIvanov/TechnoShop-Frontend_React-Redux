import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import LinearProgress from '@mui/material/LinearProgress';

import { useSelector } from '../../providers/store/store';
import { selectUser } from '../../providers/store/features/user/userSlice';
import { selectCart } from '../../providers/store/features/cart/cartSlice';
import { useLogoutMutation } from '../../providers/store/services/users';
import {
  AddBusinessIcon,
  AddShoppingCartIcon,
  ExitToAppIcon,
  DashboardIcon,
  HomeIcon,
  LoginIcon,
  PersonAddIcon,
} from '../mui/Icons';
import HeaderNavLink from './HeaderNavLink';
import HeaderSearch from './HeaderSearch';
import { useIsApiRequestPending } from '../../hooks/useIsApiRequestPending';

const Header = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  const isApiLoading = useIsApiRequestPending();

  return (
    <>
      <AppBar position='fixed'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters={true}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <HeaderNavLink toLink='/' linkText='Home' icon={<HomeIcon />} />
                <HeaderNavLink
                  toLink='/shop'
                  linkText='Shop'
                  icon={<AddBusinessIcon />}
                />
                <HeaderNavLink
                  toLink='/cart'
                  linkText='Cart'
                  icon={
                    <Badge
                      badgeContent={Object.keys(cart).length}
                      color='secondary'
                    >
                      <AddShoppingCartIcon />
                    </Badge>
                  }
                />
              </Box>

              <Box sx={{ display: 'flex' }}>
                <HeaderSearch />

                {user ? (
                  <>
                    <HeaderNavLink
                      toLink={`/${
                        user.role === 'admin' ? 'admin' : 'user'
                      }/orders`}
                      linkText='Orders'
                      icon={<DashboardIcon />}
                    />
                    <HeaderNavLink
                      linkText='Logout'
                      icon={<ExitToAppIcon />}
                      onClick={handleLogout}
                    />
                  </>
                ) : (
                  <>
                    <HeaderNavLink
                      toLink='/register'
                      linkText='Register'
                      icon={<PersonAddIcon />}
                    />
                    <HeaderNavLink
                      toLink='/login'
                      linkText='Login'
                      icon={<LoginIcon />}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>

        {isApiLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant='indeterminate'
              color='secondary'
              sx={{ height: '2px' }}
            />
          </Box>
        )}
      </AppBar>

      {/* Render second toolbar so the page content won't hide behind the first ttolbar  */}
      <Toolbar />
    </>
  );
};

export default Header;
