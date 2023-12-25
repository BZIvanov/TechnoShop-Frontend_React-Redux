import PropTypes from 'prop-types';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

import { ExpandLessIcon, ExpandMoreIcon } from '../../mui/Icons';

const FilterListItem = ({ title, icon, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: '100%', marginTop: '5px' }}>
      <ListItemButton onClick={() => setOpen((prevValue) => !prevValue)}>
        <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={open} timeout='auto' unmountOnExit={false}>
        {children}
      </Collapse>
    </Box>
  );
};

FilterListItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.node,
};

export default FilterListItem;
