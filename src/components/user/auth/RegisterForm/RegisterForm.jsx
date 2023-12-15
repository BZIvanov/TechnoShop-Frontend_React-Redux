import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useRegisterMutation } from '../../../../providers/store/services/users';
import FormProvider from '../../../../providers/form/FormProvider';
import { useForm } from '../../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../../providers/form/form-fields/TextFieldAdapter/TextFieldAdapter';
import PasswordTextFieldAdapter from '../../../../providers/form/form-fields/PasswordTextFieldAdapter/PasswordTextFieldAdapter';
import { EmailIcon, FaceIcon } from '../../../mui/Icons';
import { formConfig } from './form-schema';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleFormSubmit = async (values) => {
    const { username, email, password } = values;
    await register({ username, email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [navigate, isSuccess]);

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
          <Box my={1}>
            <TextFieldAdapter
              name='username'
              label='Username'
              icon={<FaceIcon />}
            />
          </Box>

          <Box my={1}>
            <TextFieldAdapter name='email' label='Email' icon={<EmailIcon />} />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter name='password' label='Password' />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
              name='confirmPassword'
              label='Confirm Password'
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
              Register
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default RegisterForm;
