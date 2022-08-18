import styled from 'styled-components';
import { theme } from 'utilities/colors';
import { enter } from './animations';

export const ModalWrapper = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: 0;
  display: flex;
  left: 0;
  padding: 10px;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 0.2s ease;
  z-index: 100;
`;

const ModalBody = styled.div`
  border-radius: 5px;
  animation: ${enter} 0.3s forwards;
  background-color: ${theme.white};
  margin: auto;
  max-width: 100%;
  padding: 35px 70px;
  position: relative;
  width: 770px;
  @media (max-width: 767px) {
    padding: 30px 50px;
  }
  .btn__close {
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s ease;
    outline: none;
    &:hover {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  border-top: 1px solid ${theme.gray[500]};
  padding-top: 20px;
  overflow: scroll;
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

export const Modal = {
  Body: ModalBody,
  Content: ModalContent,
};
