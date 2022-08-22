import React from 'react';
import { Container, Section } from 'styles/styled-components/auth.styled';
import { Text } from 'styles/styled-components/global.styled';

const AuthWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <Container.Auth>
    <Section.Left>
      <Text.Title className="light lg">Toptal Quiz App</Text.Title>
    </Section.Left>
    <Section.Right>{children}</Section.Right>
  </Container.Auth>
);

export default AuthWrapper;
