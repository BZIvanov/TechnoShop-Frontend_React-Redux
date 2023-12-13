import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';
import {
  AddBusinessIcon,
  ExitToAppIcon,
  HomeIcon,
  LoginIcon,
} from '../../mui/Icons';
import { useSelector } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';

const Header = () => {
  const user = useSelector(selectUser);

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
                {user ? (
                  <HeaderNavLink
                    toLink='/logout'
                    linkText='Logout'
                    icon={<ExitToAppIcon />}
                  />
                ) : (
                  <HeaderNavLink
                    toLink='/login'
                    linkText='Login'
                    icon={<LoginIcon />}
                  />
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
