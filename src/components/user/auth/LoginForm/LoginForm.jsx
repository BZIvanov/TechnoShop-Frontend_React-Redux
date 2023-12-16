import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLoginMutation } from '../../../../providers/store/services/users';
import FormProvider from '../../../../providers/form/FormProvider';
import { useForm } from '../../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../../providers/form/form-fields/TextFieldAdapter/TextFieldAdapter';
import PasswordTextFieldAdapter from '../../../../providers/form/form-fields/PasswordTextFieldAdapter/PasswordTextFieldAdapter';
import { EmailIcon } from '../../../mui/Icons';
import { formConfig } from './form-schema';
import ForgotPasswordDialog from '../ForgotPasswordDialog/ForgotPasswordDialog';

const LoginForm = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const formMethods = useForm(formConfig);
  const { formState } = formMethods;

  const handleFormSubmit = (values) => {
    login(values);
  };

  const handleShowForgotModal = (shouldShow) => {
    setShowForgotPasswordModal(shouldShow);
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
      <Typography variant='h5'>Login Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='email' label='Email' icon={<EmailIcon />} />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter name='password' label='Password' />
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Button
              variant='contained'
              type='submit'
              disabled={formState.submitting || isLoading}
              fullWidth={true}
            >
              Login
            </Button>
          </Box>
        </FormProvider>

        <Box sx={{ marginTop: '30px', textAlign: 'right' }}>
          <Button color='warning' onClick={() => handleShowForgotModal(true)}>
            Forgot Password?
          </Button>
        </Box>

        <ForgotPasswordDialog
          showForgotPasswordModal={showForgotPasswordModal}
          handleShowForgotModal={handleShowForgotModal}
        />
      </Box>
    </Box>
  );
};

export default LoginForm;
