import styled from 'styled-components';
import { theme } from 'utilities/colors';

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  &.wrap {
    flex-wrap: wrap;
  }
  &.alert-wrap {
    justify-content: space-between;
    padding: 0 50px;
  }
`;

export const Direction = {
  Col,
  Row,
};



export const Tag = styled.div`
  padding: 5px;
  width: max-content;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
  outline: none;
  color: ${theme.gray[700]};
  &.danger {
    background: ${theme.red[300]};
  }
  &.success {
    background: ${theme.green[300]};
  }
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  .icon--tag {
    font-size: 16px;
  }
`;

const Title = styled.h1`
  height: 33px;
  color: ${theme.grayTeal[500]};
  font-weight: 500;
  font-size: 28px;
  line-height: 30px;
  &.light {
    color: ${theme.white};
  }
  &.heading {
    font-size: 18px;
    line-height: 20px;
    font-weight: 700;
  }
  &.lg {
    font-size: 48px;
    line-height: 55px;
  }
  &.label {
    margin-top: 13px;
    margin-right: 12px;
  }
`;

const SubTitle = styled.p`
  height: 20px;
  color: ${theme.gray[500]};
  font-weight: 400;
  font-size: 17px;
  &.light {
    color: ${theme.white};
    a {
      color: ${theme.white};
    }
  }
  &.heading {
    font-weight: 700;
  }
  &.dark {
    color: ${theme.grayTeal[500]};
  }
  &.center {
    text-align: center;
  }
`;

export const Text = {
  Title,
  SubTitle,
};


const TransparentButton = styled.button`
  background: transparent;
  width: 100%;
  height: auto;
  border: none;
  transition: 0.3s;
  color: ${theme.white};
  font-size: 17px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const Button = {
  Transparent: TransparentButton,
};
