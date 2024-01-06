import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const ConfirmDialogContext = createContext();

export const ConfirmDialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });

  const openDialog = ({ text, onConfirm }) => {
    setDialogConfig({
      open: true,
      text,
      onConfirm,
    });
  };

  const closeDialog = () => {
    setDialogConfig({
      open: false,
      text: '',
      onConfirm: () => {},
    });
  };

  return (
    <ConfirmDialogContext.Provider
      value={{ dialogConfig, openDialog, closeDialog }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};

ConfirmDialogProvider.propTypes = {
  children: PropTypes.node,
};
