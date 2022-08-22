import styled from 'styled-components';
import * as Animate from 'styles/styled-components/animations';
import { theme, boxShadow } from 'utilities/colors';


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


const HeaderWrapper = styled.header`
  background-color: ${theme.gray[700]};
  color: rgb(14, 30, 43);
  position: relative;
  z-index: 10;
`;

const HeaderBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  width: 100%;
`;

export const Header = {
  Wrapper: HeaderWrapper,
  Body: HeaderBody,
  Content: HeaderContent,
};

const ImageContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 99999px;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Dropdown = styled.ul`
  width: 150px;
  height: auto;
  background-color: ${theme.white};
  border-radius: 5px;
  position: absolute;
  margin: 0;
  list-style: none;
  padding: 0;
  right: 0;
  padding: 10px 5px;
  box-shadow: 0px 1px 4px ${boxShadow.primary};
  animation: ${Animate.onAppear} 200ms ease-out forwards;
  li {
    transition: 0.3s;
    &.menu__link {
      a {
        display: block;
        width: calc(100% - 23px);
        letter-spacing: 0.5px;
        font-size: 15px;
        font-weight: 400;
        color: ${theme.gray[900]};
        padding: 10px;
        &:hover {
          background-color: ${theme.gray[100]};
          border-radius: 3px;
        }
      }
    }
    &:last-child {
      border-top: 1px solid ${theme.gray[200]};
      margin-top: 5px;
    }
  }
`;

const UserButton = styled.button`
  background: transparent;
  width: 100%;
  height: auto;
  border: none;
  padding: 10px;
  text-align: start;
  transition: 0.3s;
  letter-spacing: 0.5px;
  font-size: 15px;
  font-weight: 400;
  color: ${theme.gray[900]};
  &:hover {
    background-color: ${theme.gray[100]};
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const User = {
  Container: ImageContainer,
  Image,
  Dropdown,
  Button: UserButton,
};
