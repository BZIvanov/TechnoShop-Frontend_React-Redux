import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

const SidebarMenuLink = ({ toLink, icon, linkText }) => {
  const theme = useTheme();

  return (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.common.black,
          textDecoration: 'none',
        };
      }}
      to={toLink}
    >
      <MenuItem>
        <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
        <ListItemText>{linkText}</ListItemText>
      </MenuItem>
      <Divider />
    </NavLink>
  );
};

SidebarMenuLink.propTypes = {
  toLink: PropTypes.string,
  icon: PropTypes.element,
  linkText: PropTypes.string,
};

export default SidebarMenuLink;
