import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { CloseOutlinedIcon } from '../../mui/Icons';

const PreviewExistingImageAvatar = ({ image, handleRemoveImage }) => {
  return (
    <Badge
      badgeContent={
        <CloseOutlinedIcon
          sx={{ cursor: 'pointer' }}
          htmlColor={'red'}
          onClick={() => {
            handleRemoveImage(image.publicId);
          }}
        />
      }
    >
      <Avatar
        alt='product preview'
        src={image.imageUrl}
        sx={{ width: 90, height: 90 }}
      />
    </Badge>
  );
};

PreviewExistingImageAvatar.propTypes = {
  image: PropTypes.object,
  handleRemoveImage: PropTypes.func,
};

export default PreviewExistingImageAvatar;
