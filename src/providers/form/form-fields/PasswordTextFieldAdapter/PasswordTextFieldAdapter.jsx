import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import {
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../../../components/mui/Icons';
import { useFormContext } from '../../hooks/useFormContext';

const PasswordTextFieldAdapter = ({ name, label }) => {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ width: '100%' }}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              inputProps={{ ...field }}
              label={label}
              variant='standard'
              error={fieldState.isTouched && Boolean(fieldState.error)}
              helperText={fieldState.isTouched && fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

PasswordTextFieldAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default PasswordTextFieldAdapter;
