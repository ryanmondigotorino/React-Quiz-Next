import styled from 'styled-components';
import { theme } from 'utilities/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  .error-text {
    margin: 5px 0 0 0;
    color: ${theme.red[500]};
    font-family: "Open Sans";
    font-size: 12px;
  }
`;

const Field = styled.div`
  border: 1px solid ${theme.gray[500]};
  border-radius: 3px;
  &.active {
    border: 1px solid ${theme.darkTeal[900]};
  }
  &.disabled {
    border: 1px solid ${theme.gray[200]};
  }
  &.error {
    border: 1px solid ${theme.red[500]};
  }
  .input-border {
    border-bottom: 2px solid ${theme.gray[500]};

    &___active {
      border-bottom: 2px solid ${theme.darkTeal[900]};
    }

    &___disabled {
      border-bottom: 2px solid ${theme.gray[200]};
    }

    &___error {
      border-bottom: 2px solid ${theme.red[500]};
    }
  }
`;

export const Container = {
  Wrapper,
  Field,
};

const InputElement = styled.input`
  width: -webkit-fill-available;
  margin: 0;
  padding: 0;
  border: none;
  padding: 15px;
  font-size: 16px;
  font-family: "Open Sans";
  font-weight: 400;
  &:disabled {
    background-color: ${theme.white};
  }
  &:focus-visible {
    outline: none;
  }
`;

const TextAreaElement = styled.textarea`
  width: -webkit-fill-available;
  margin: 0;
  padding: 0;
  border: none;
  padding: 15px;
  font-size: 16px;
  font-family: "Open Sans";
  font-weight: 400;
  &:disabled {
    background-color: ${theme.white};
  }
  &:focus-visible {
    outline: none;
  }
`;

const InputSelect = styled.select`
  margin-bottom: 1.5rem;
  padding: 15px;
  border-bottom: 2px solid;
  font-size: 16px;
`;

export const Input = {
  Element: InputElement,
  Select: InputSelect,
  TextArea: TextAreaElement,
};
