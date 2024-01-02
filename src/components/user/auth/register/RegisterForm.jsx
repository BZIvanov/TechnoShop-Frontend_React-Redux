import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useRegisterMutation } from '../../../../providers/store/services/users';
import FormProvider from '../../../../providers/form/FormProvider';
import { useForm } from '../../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../../providers/form/formFields/TextFieldAdapter';
import PasswordTextFieldAdapter from '../../../../providers/form/formFields/PasswordTextFieldAdapter';
import { EmailIcon, FaceIcon } from '../../../mui/Icons';
import { formConfig } from './registerForm.schema';

const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const formMethods = useForm(formConfig);
  const { formState } = formMethods;

  const handleFormSubmit = (values) => {
    const { username, email, password } = values;
    register({ username, email, password });
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
      <Typography variant='h5'>Register Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <TextFieldAdapter
            name='username'
            label='Username'
            icon={<FaceIcon />}
          />

          <TextFieldAdapter name='email' label='Email' icon={<EmailIcon />} />

          <PasswordTextFieldAdapter name='password' label='Password' />

          <PasswordTextFieldAdapter
            name='confirmPassword'
            label='Confirm Password'
          />

          <Button
            variant='contained'
            type='submit'
            disabled={formState.isSubmitting || isLoading}
            fullWidth={true}
            sx={{ marginTop: '20px' }}
          >
            Register
          </Button>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default RegisterForm;
