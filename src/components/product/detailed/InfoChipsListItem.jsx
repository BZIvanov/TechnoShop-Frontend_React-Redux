import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const InfoChipsListItem = ({ linkType, itemKey, itemValues }) => {
  const navigate = useNavigate();

  const values = Array.isArray(itemValues) ? itemValues : [itemValues];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
        alignItems: 'center',
      }}
    >
      <Typography variant='body1'>{itemKey}:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {values.map((value) => (
          <Chip
            key={value._id}
            label={value.name}
            variant='outlined'
            onClick={() => navigate(`/${linkType}/${value._id}`)}
            size='small'
            sx={{ margin: 0.2 }}
          />
        ))}
      </Box>
    </Box>
  );
};

InfoChipsListItem.propTypes = {
  linkType: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  itemValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};

export default InfoChipsListItem;
