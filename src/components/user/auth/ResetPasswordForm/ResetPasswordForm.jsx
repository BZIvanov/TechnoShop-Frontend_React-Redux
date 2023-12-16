import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useResetPasswordMutation } from '../../../../providers/store/services/users';
import FormProvider from '../../../../providers/form/FormProvider';
import { useForm } from '../../../../providers/form/hooks/useForm';
import PasswordTextFieldAdapter from '../../../../providers/form/form-fields/PasswordTextFieldAdapter/PasswordTextFieldAdapter';
import { formConfig } from './form-schema';

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleFormSubmit = (values) => {
    resetPassword({ ...values, token });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

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
      <Typography variant='h5'>Password Reset Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <Box my={1}>
            <PasswordTextFieldAdapter name='newPassword' label='New Password' />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
              name='confirmNewPassword'
              label='Confirm New Password'
            />
          </Box>

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
              disabled={formState.submitting}
            >
              Reset
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={formState.submitting || isLoading}
            >
              Reset Password
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
