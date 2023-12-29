import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useFormContext } from '../../hooks/useFormContext';

const DatePickerFieldAdapter = ({ name, label, disablePast }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...restField }, fieldState }) => {
        return (
          <FormControl sx={{ width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={label}
                onChange={(newValue) => {
                  onChange(newValue);
                }}
                slotProps={{
                  textField: {
                    variant: 'standard',
                    // the error will appear after the form is submitted, this is because react-hook-form date adapter, which will delay the validation
                    error: Boolean(fieldState.error),
                    helperText: fieldState.error?.message,
                  },
                }}
                disablePast={disablePast}
                {...restField}
              />
            </LocalizationProvider>
          </FormControl>
        );
      }}
    />
  );
};

DatePickerFieldAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  disablePast: PropTypes.bool,
};

export default DatePickerFieldAdapter;
