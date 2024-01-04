import { Link } from 'react-router-dom';
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
  const { formState, reset } = formMethods;

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
              sx={{ flexGrow: 1, marginLeft: 1 }}
            >
              Register
            </Button>
          </Box>

          <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant='body2'>
              Already have an account? <Link to='/login'>Login</Link>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default RegisterForm;
