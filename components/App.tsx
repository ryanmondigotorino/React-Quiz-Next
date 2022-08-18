import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Wrapper, Footer } from 'styles/styled-components/app.styled';
import { Text } from 'styles/styled-components/global.styled';
import Modal from 'components/Utilities/Modal';

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { modal } = useSelector((state: RootState) => state.systemApp);

  return (
    <Wrapper.Container>
      {modal?.isVisible && <Modal />}
      <Wrapper.Main>
        {children}
        {!(router.pathname === '/' || router.pathname === '/sign-up') && (
          <Footer.Wrapper>
            <Footer.Body>
              <Text.SubTitle className="light">
                Copyright &copy; Ryan M. Torino {format(new Date(), 'yyyy')}
              </Text.SubTitle>
            </Footer.Body>
          </Footer.Wrapper>
        )}
      </Wrapper.Main>
    </Wrapper.Container>
  );
};

export default App;
