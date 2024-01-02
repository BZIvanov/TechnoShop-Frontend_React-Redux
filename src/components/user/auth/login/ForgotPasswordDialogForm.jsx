import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useForgotPasswordMutation } from '../../../../providers/store/services/users';
import FormProvider from '../../../../providers/form/FormProvider';
import { useForm } from '../../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../../providers/form/form-fields/TextFieldAdapter/TextFieldAdapter';
import { EmailIcon } from '../../../mui/Icons';
import { formConfig } from './forgotPasswordDialogForm.schema';

const ForgotPasswordDialog = ({
  showForgotPasswordModal,
  handleShowForgotModal,
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [forgotPassword, { data, isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleFormSubmit = (values) => {
    forgotPassword(values);
    handleShowForgotModal(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEmailSent(true);
      reset();
    }
  }, [isSuccess, reset]);

  const handleCloseAlert = () => {
    setIsEmailSent(false);
  };

  return (
    <>
      <Dialog
        open={showForgotPasswordModal}
        onClose={() => handleShowForgotModal(false)}
      >
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To reset your password provide your e-mail for reset password
              link.
            </DialogContentText>

            <TextFieldAdapter name='email' label='Email' icon={<EmailIcon />} />
          </DialogContent>
          <DialogActions>
            <Button
              color='secondary'
              type='button'
              onClick={() => handleShowForgotModal(false)}
              disabled={formState.submitting || isLoading}
            >
              Cancel
            </Button>
            <Button
              color='secondary'
              type='submit'
              disabled={formState.submitting || isLoading}
            >
              Send
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <Snackbar
        open={isEmailSent}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity='success'>
          {data?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

ForgotPasswordDialog.propTypes = {
  showForgotPasswordModal: PropTypes.bool,
  handleShowForgotModal: PropTypes.func,
};

export default ForgotPasswordDialog;
