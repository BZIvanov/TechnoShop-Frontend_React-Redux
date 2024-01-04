import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const HeaderNavLink = ({ toLink, icon, linkText, onClick }) => {
  const theme = useTheme();

  const linkContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginInline: '16px',
        cursor: 'pointer',
        color: (theme) => (onClick ? theme.palette.common.black : 'inherit'),
      }}
      onClick={onClick}
      role='link'
    >
      {icon}
      <Typography variant='caption'>{linkText}</Typography>
    </Box>
  );

  return (
    <>
      {onClick ? (
        linkContent
      ) : (
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive
                ? theme.palette.common.white
                : theme.palette.common.black,
              textDecoration: 'none',
            };
          }}
          to={toLink}
        >
          {linkContent}
        </NavLink>
      )}
    </>
  );
};

HeaderNavLink.propTypes = {
  toLink: PropTypes.string,
  icon: PropTypes.element,
  linkText: PropTypes.string,
  onClick: PropTypes.func,
};

export default HeaderNavLink;
