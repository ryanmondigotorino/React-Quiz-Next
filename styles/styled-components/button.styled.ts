import styled from 'styled-components';
import { theme } from 'utilities/colors';

export default styled.button`
  width: 100%;
  padding: 15px 0;
  background: ${theme.gray[900]};
  color: ${theme.white};
  font-weight: 500;
  font-family: "Open Sans";
  text-transform: uppercase;
  letter-spacing: 1.6px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid ${theme.gray[700]};
  outline: none;
  outline-color: transparent;
  &:hover {
    background: ${theme.gray[500]};
    color: ${theme.white};
  }
  &:active {
    background: ${theme.gray[700]};
    color: ${theme.white};
  }
  &:disabled {
    background: ${theme.gray[500]};
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
    outline-color: transparent;
  }
`;
