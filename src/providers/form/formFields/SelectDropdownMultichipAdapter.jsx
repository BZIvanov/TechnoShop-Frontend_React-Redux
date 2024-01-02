import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { useFormContext } from '../hooks/useFormContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectDropdownMultichipAdapter = ({
  name,
  label,
  isDisabled,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            sx={{ width: '100%' }}
            error={Boolean(fieldState.error)}
            disabled={isDisabled || options.length < 1}
            variant='standard'
          >
            <InputLabel>{label}</InputLabel>

            <Select
              data-testid={name}
              {...field}
              multiple={true}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {options
                      .filter((option) => selected.includes(option._id))
                      .map((option) => (
                        <Chip key={option._id} label={option.name} />
                      ))}
                  </Box>
                );
              }}
              MenuProps={MenuProps}
            >
              {options.map((option) => {
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

SelectDropdownMultichipAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  options: PropTypes.array,
};

export default SelectDropdownMultichipAdapter;
