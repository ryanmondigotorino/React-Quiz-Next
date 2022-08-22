/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'utilities/colors';

const CheckboxWrapper = styled.div`
  align-items: center;
  display: flex;
  outline: none;
  margin-bottom: 1.5rem;
  span {
    color: ${theme.gray[900]};
  }
`;

type Props = {
  isChecked?: boolean;
  data?: any;
  hideBordersWhenChecked?: boolean;
  label?: string;
  onToggle?: (v: boolean) => void;
};

const Box = styled.div<Props>`
  border: 1px
    ${({ isChecked, hideBordersWhenChecked }) => (hideBordersWhenChecked ? (isChecked ? 'hidden' : 'solid') : 'solid')};
  border-color: ${theme.gray[500]};
  background-color: ${theme.white};
  border-radius: 3px;
  height: 20px;
  margin-right: 15px;
  position: relative;
  overflow: hidden;
  transition: border 0.2s ease;
  width: 20px;
  cursor: pointer;
  &:before {
    background-image: url('/icons/check-solid.svg');
    background-size: cover;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: transform 0.2s ease;
    transform: ${({ isChecked }) => (isChecked ? 'scale(1)' : 'scale(0)')};
    width: 100%;
  }
`;

const Checkbox: React.FC<Props> = ({ isChecked = false, data, onToggle, label, hideBordersWhenChecked = false }) => {
  const [checked, toggleCheckbox] = useState(isChecked);
  const onCheckboxToggle = () => {
    if (onToggle) onToggle(!data ? !isChecked : isChecked);
    toggleCheckbox(!checked);
  };

  return (
    <CheckboxWrapper
      className="CheckboxWrapper"
    >
      <Box
        isChecked={data ? !isChecked : isChecked}
        hideBordersWhenChecked={hideBordersWhenChecked}
        onClick={() => onCheckboxToggle()}
        tabIndex={-1}
        role="checkbox"
        aria-checked={checked}
      />
      <span>{label}</span>
    </CheckboxWrapper>
  );
};

export default Checkbox;
