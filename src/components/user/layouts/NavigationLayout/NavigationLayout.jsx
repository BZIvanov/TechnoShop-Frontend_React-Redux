import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const NavigationLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <div>Sidebar</div>

      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavigationLayout;
