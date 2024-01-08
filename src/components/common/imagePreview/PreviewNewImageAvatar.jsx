import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { CloseOutlinedIcon } from '../../mui/Icons';

const PreviewNewImageAvatar = ({ image, handleRemoveImage }) => {
  const [preview, setPreview] = useState();

  useEffect(() => {
    const previewUrl = URL.createObjectURL(image);
    setPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image]);

  return (
    <Badge
      badgeContent={
        <CloseOutlinedIcon
          sx={{ cursor: 'pointer' }}
          htmlColor={'red'}
          onClick={() => {
            handleRemoveImage(image.name);
          }}
        />
      }
    >
      <Avatar
        alt='product preview'
        src={preview}
        sx={{ width: 90, height: 90 }}
      />
    </Badge>
  );
};

PreviewNewImageAvatar.propTypes = {
  image: PropTypes.object,
  handleRemoveImage: PropTypes.func,
};

export default PreviewNewImageAvatar;
