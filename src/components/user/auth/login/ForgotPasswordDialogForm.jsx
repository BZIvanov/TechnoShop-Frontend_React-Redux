import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { useDispatch } from '@/providers/store/store';
import { useForgotPasswordMutation } from '@/providers/store/services/users';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import FormProvider from '@/providers/form/FormProvider';
import { useForm } from '@/providers/form/hooks/useForm';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import { EmailIcon } from '@/components/mui/Icons';
import { formConfig } from './forgotPasswordDialogForm.schema';

const ForgotPasswordDialog = ({
  showForgotPasswordModal,
  handleShowForgotModal,
}) => {
  const dispatch = useDispatch();

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
      dispatch(
        showNotification({
          type: 'success',
          message: data?.message,
        })
      );
      reset();
    }
  }, [dispatch, isSuccess, reset, data?.message]);

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
              disabled={formState.isSubmitting || isLoading}
            >
              Cancel
            </Button>
            <Button
              color='secondary'
              type='submit'
              disabled={formState.isSubmitting || isLoading}
            >
              Send
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

ForgotPasswordDialog.propTypes = {
  showForgotPasswordModal: PropTypes.bool,
  handleShowForgotModal: PropTypes.func,
};

export default ForgotPasswordDialog;
