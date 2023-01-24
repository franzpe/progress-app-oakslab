import { confirmAlert } from 'react-confirm-alert';

import { ReactConfirmAlertPropsExtended } from './ConfirmAlert';
import ConfirmAlert from './ConfirmAlert';

interface BasicConfirmAlertOptions {
  title: string;
  message?: string;
  onConfirm: () => void;
  onDismiss?: () => void;
}

export const showBasicConfirmAlert = (options: BasicConfirmAlertOptions) => {
  const { onConfirm, onDismiss, ...caOptions } = options;

  showConfirmAlert({
    buttons: [
      { label: 'Confirm', onClick: onConfirm },
      { label: 'Cancel', asLink: true, onClick: onDismiss }
    ],
    ...caOptions
  } as ReactConfirmAlertPropsExtended);
};

export const showConfirmAlert = (options: ReactConfirmAlertPropsExtended) => {
  const { buttons, ...caOptions } = options;

  confirmAlert({ ...caOptions, customUI: cu => ConfirmAlert({ ...cu, ...options }) });
};
