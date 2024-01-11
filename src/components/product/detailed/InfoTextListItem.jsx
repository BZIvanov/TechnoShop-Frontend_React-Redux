import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const InfoTextListItem = ({ itemKey, itemValue }) => {
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
      <Typography variant='body1'>{itemValue}</Typography>
    </Box>
  );
};

InfoTextListItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  itemValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default InfoTextListItem;
