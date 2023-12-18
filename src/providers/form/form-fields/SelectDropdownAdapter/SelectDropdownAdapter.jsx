import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext } from '../../hooks/useFormContext';

const SelectDropdownAdapter = ({ name, label, options, extendedOnChange }) => {
  const { control } = useFormContext();

  // const loading = useSelector((state) => state.apiCall.loading);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...rest } = field;

        const handleOnChange = (event) => {
          onChange(event);
          extendedOnChange && extendedOnChange(event);
        };

        return (
          <FormControl
            sx={{ width: '100%' }}
            variant='standard'
            error={Boolean(fieldState.error)}
            // disabled={loading}
          >
            <InputLabel>{label}</InputLabel>

            <Select data-testid={name} {...rest} onChange={handleOnChange}>
              {options.map((option) => {
                if (typeof option === 'string') {
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  );
                }

                return (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                );
              })}
            </Select>

            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

SelectDropdownAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  extendedOnChange: PropTypes.func,
};

export default SelectDropdownAdapter;
