import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLoginMutation } from '../../../../providers/store/services/users';
import FormProvider from '../../../../providers/form/FormProvider';
import { useForm } from '../../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../../providers/form/formFields/TextFieldAdapter';
import PasswordTextFieldAdapter from '../../../../providers/form/formFields/PasswordTextFieldAdapter';
import { EmailIcon } from '../../../mui/Icons';
import { formConfig } from './loginForm.schema';
import ForgotPasswordDialogForm from './ForgotPasswordDialogForm';

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
          <TextFieldAdapter name='email' label='Email' icon={<EmailIcon />} />

          <PasswordTextFieldAdapter name='password' label='Password' />

          <Button
            variant='contained'
            type='submit'
            disabled={formState.isSubmitting || isLoading}
            fullWidth={true}
            sx={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </FormProvider>

        <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
          <Button color='warning' onClick={() => handleShowForgotModal(true)}>
            Forgot Password?
          </Button>
        </Box>

        <ForgotPasswordDialogForm
          showForgotPasswordModal={showForgotPasswordModal}
          handleShowForgotModal={handleShowForgotModal}
        />
      </Box>
    </Box>
  );
};

export default LoginForm;
