import MenuList from '@mui/material/MenuList';

import { useSelector } from '../../../../providers/store/store';
import { selectUser } from '../../../../providers/store/features/user/userSlice';
import { DashboardIcon, ListAltIcon, PasswordIcon } from '../../../mui/Icons';
import SidebarMenuLink from '../SidebarMenuLink/SidebarMenuLink';

const userLinks = [
  {
    toLink: 'orders',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'wishlist',
    icon: <ListAltIcon fontSize='small' />,
    linkText: 'Wishlist',
  },
  {
    toLink: 'password',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Password',
  },
];

const adminLinks = [
  {
    toLink: 'orders',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'password',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Password',
  },
];

const SidebarMenu = () => {
  const user = useSelector(selectUser);

  const links = user.role === 'admin' ? adminLinks : userLinks;

  return (
    <MenuList sx={{ width: 240, maxWidth: '100%', marginRight: 1 }}>
      {links.map((link) => {
        return <SidebarMenuLink key={link.toLink} {...link} />;
      })}
    </MenuList>
  );
};

export default SidebarMenu;
