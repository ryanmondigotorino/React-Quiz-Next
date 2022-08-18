import styled from 'styled-components';
import { theme } from 'utilities/colors';

const ContainerWrapper = styled.div`
  height: 100%;
  position: relative;
  z-index: 2;
`;

const MainWrapper = styled.main`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: ${theme.gray[700]} transparent;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
    &-track {
      background-color: transparent;
    }
    &-thumb {
      background-color: ${theme.gray[700]};
      border-radius: 5px;
    }
  }
`;

export const Wrapper = {
  Container: ContainerWrapper,
  Main: MainWrapper,
};

const FooterWrapper = styled.footer`
  background-color: ${theme.gray[700]};
  color: rgb(14, 30, 43);
  position: relative;
  z-index: 10;
`;

const FooterBody = styled.div`
  display: flex;
  flex-direction: row;
  height: 70px;
  justify-content: center;
  align-items: center;
`;

export const Footer = {
  Wrapper: FooterWrapper,
  Body: FooterBody,
};
