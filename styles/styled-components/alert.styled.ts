import styled, { keyframes } from 'styled-components';
import { theme } from 'utilities/colors';

const enter = keyframes`
  0% {
    transform: scale(0.7);
  }
  45% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

const AlertWrapper = styled.div`
  --gutter-x: 1.5rem;
  --gutter-y: 2.5rem;

  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: 0;
  color: ${theme.gray[400]};
  display: flex;
  font-size: 1.0625rem;
  left: 0;
  padding: 10px;
  position: fixed;
  overflow-x: hidden;
  right: 0;
  top: 0;
  transition: opacity 0.2s ease;
  z-index: 101;

  .modal {
    &__title {
      font-weight: 500;
      font-size: 1.75rem;
      margin: 0;
    }
  }

  .content {
    margin: 0;
    padding: 2.5rem 0 3.125rem;

    p {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .button {
    border-radius: 5px;
    background: ${theme.gray[900]};

    &:hover {
      background: ${theme.gray[500]};
    }
  }
`;

const AlertIcon = styled.div`
  margin-bottom: 1em;
  .icon {
    font-size: 4.5em;
    &--danger {
      color: ${theme.red[500]};
    }
    &--warning {
      color: ${theme.warning};
    }
    &--success {
      color: ${theme.green[300]};
    }
  }
`;

const AlertBody = styled.div`
  border-radius: 5px;
  animation: ${enter} 0.3s forwards;
  background-color: ${theme.white};
  margin: auto;
  max-width: 100%;
  position: relative;
  text-align: center;
  width: 570px;
`;

const AlertHeader = styled.header`
  color: ${theme.gray[900]};
  padding: var(--gutter-y) var(--gutter-x);
`;

const AlertContent = styled.div`
  padding: 0 var(--gutter-x);
`;

const AlertFooter = styled.div`
  padding: var(--gutter-y) var(--gutter-x);
`;

export const Alert = {
  Wrapper: AlertWrapper,
  Icon: AlertIcon,
  Body: AlertBody,
  Header: AlertHeader,
  Content: AlertContent,
  Footer: AlertFooter,
}