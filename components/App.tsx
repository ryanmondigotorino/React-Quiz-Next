import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Header from 'components/Header';
import { Wrapper } from 'styles/styled-components/app.styled';
import Modal from 'components/Utilities/Modal';

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { modal } = useSelector((state: RootState) => state.systemApp);
  return (
    <Wrapper.Container>
      {modal?.isVisible && <Modal />}
      <Header />
      <Wrapper.Main className="justify-content-between">
        {children}
      </Wrapper.Main>
    </Wrapper.Container>
  );
};

export default App;
