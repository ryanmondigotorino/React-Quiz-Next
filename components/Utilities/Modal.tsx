import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { toggleModal } from 'redux/appSlice';
import { Direction, Text } from 'styles/styled-components/global.styled';
import { ModalWrapper, Modal } from 'styles/styled-components/modal.styled';

const ModalComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state.systemApp);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent | KeyboardEvent) => {
      if (e.code === 'Escape') {
        dispatch(toggleModal({ isVisible: false, header: '', children: null }));
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (modal?.isVisible) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modal?.isVisible, onKeyDown]);

  return (
    <ModalWrapper>
      <Modal.Body>
        <Direction.Row className="justify-content-between">
          <Text.Title>{modal?.header || ''}</Text.Title>
          <span
            className="btn__close"
            tabIndex={-1}
            role="button"
            onClick={() =>
              dispatch(
                toggleModal({ isVisible: false, header: '', children: null })
              )
            }
            onKeyDown={onKeyDown}
          >
            Close
          </span>
        </Direction.Row>
        <Modal.Content>{modal?.children}</Modal.Content>
      </Modal.Body>
    </ModalWrapper>
  );
};

export default ModalComponent;
