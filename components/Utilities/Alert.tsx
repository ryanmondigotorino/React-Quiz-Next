import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { ReactComponent as DangerIcon } from 'styles/assets/exclamation-o.svg';
import { ReactComponent as SuccessIcon } from 'styles/assets/check-o.svg';
import { Alert } from 'styles/styled-components/alert.styled';

const status = {
  danger: {
    icon: <DangerIcon className="icon icon--danger" />,
  },
  warning: {
    icon: <DangerIcon className="icon icon--warning" />,
  },
  success: {
    icon: <SuccessIcon className="icon icon--success" />,
  },
};

const AlertDialog = () => {
  const { alert } = useSelector((state: RootState) => state.systemApp);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  if (!alert?.isVisible) return null;

  return (
    <Alert.Wrapper>
      <Alert.Body ref={bodyRef} style={{ maxWidth: 435 }}>
        <Alert.Header>
          {status[alert?.icon || 'success'] && <Alert.Icon>{status[alert.icon || 'success'].icon}</Alert.Icon>}

          <h2 className="modal__title">
            {alert.header}
          </h2>
        </Alert.Header>

        <Alert.Content>
          <React.Fragment>
            {alert.message}
          </React.Fragment>
        </Alert.Content>

        <Alert.Footer>
          {!!alert.btn && alert.btn}
        </Alert.Footer>
      </Alert.Body>
    </Alert.Wrapper>
  );
};

export default AlertDialog;
