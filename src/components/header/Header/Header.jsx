import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import { useLogoutMutation } from '../../../providers/store/services/users';
import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import {
  AddBusinessIcon,
  ExitToAppIcon,
  DashboardIcon,
  HomeIcon,
  LoginIcon,
  PersonAddIcon,
} from '../../mui/Icons';
import { useSelector } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';

const Header = () => {
  const user = useSelector(selectUser);

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

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
      </AppBar>

      {/* Render second toolbar so the page content won't hide behind the first ttolbar  */}
      <Toolbar />
    </>
  );
};

export default Header;
