import React from 'react';
import Header from 'components/Header';
import { Wrapper } from 'styles/styled-components/app.styled';
import Alert from 'components/Utilities/Alert';

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Wrapper.Container>
    <Alert />
    <Header />
    <Wrapper.Main className="justify-content-between">
      {children}
    </Wrapper.Main>
  </Wrapper.Container>
);

export default App;
