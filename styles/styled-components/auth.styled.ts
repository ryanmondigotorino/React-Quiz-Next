import styled from 'styled-components';
import { theme } from 'utilities/colors';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const FormContainer = styled.div`
  width: 458px;
  margin: 0 auto;
`;

export const Container = {
  Auth: AuthContainer,
  Form: FormContainer,
};

const LeftSection = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/static/quiz-bg.jpg");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const RightSection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: ${theme.white};
`;

export const Section = {
  Left: LeftSection,
  Right: RightSection,
};
