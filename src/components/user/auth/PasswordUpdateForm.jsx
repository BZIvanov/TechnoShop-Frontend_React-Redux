import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useUpdatePasswordMutation } from '../../../providers/store/services/users';
import FormProvider from '../../../providers/form/FormProvider';
import { useForm } from '../../../providers/form/hooks/useForm';
import PasswordTextFieldAdapter from '../../../providers/form/formFields/PasswordTextFieldAdapter';
import { formConfig } from './passwordUpdateForm.schema';

const PasswordUpdateForm = () => {
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const [updatePassword, { isLoading, isSuccess }] =
    useUpdatePasswordMutation();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleFormSubmit = (values) => {
    const { newPassword, oldPassword } = values;
    updatePassword({ newPassword, oldPassword });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsPasswordUpdated(true);
      reset();
    }
  }, [isSuccess, reset]);

  const handleCloseAlert = () => {
    setIsPasswordUpdated(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '10px', sm: '20px', md: '40px' },
      }}
    >
      <Typography variant='h5'>Password Update Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <PasswordTextFieldAdapter name='oldPassword' label='Old Password' />

          <PasswordTextFieldAdapter name='newPassword' label='New Password' />

          <PasswordTextFieldAdapter
            name='confirmNewPassword'
            label='Confirm New Password'
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '20px',
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={() => reset()}
              disabled={formState.isSubmitting || isLoading}
            >
              Reset Form
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={formState.isSubmitting || isLoading}
            >
              Update Password
            </Button>
          </Box>
        </FormProvider>
      </Box>

      <Snackbar
        open={isPasswordUpdated}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity='success'>
          Password Updated Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PasswordUpdateForm;
