import { ReactNode } from 'react';
import clsx from 'clsx';
import ButtonWrapper from 'styles/styled-components/button.styled';
import { Direction } from 'styles/styled-components/global.styled';
import Spinner from 'components/Utilities/Spinner';

type Props = {
  type: 'button' | 'submit';
  styles?: React.CSSProperties;
  children?: ReactNode;
  disabled?: boolean;
  noSpinner?: boolean;
  isClear?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  disabled,
  type,
  styles,
  noSpinner,
  children,
  isClear,
  onClick,
}: Props) => {
  return (
    <ButtonWrapper
      type={type}
      style={styles}
      disabled={disabled}
      className={clsx({ 'clear': isClear })}
      onClick={onClick}
    >
      {disabled ? (
        <Direction.Row className="justify-content-center">
          {!noSpinner && (
            <div className="mr-10">
              <Spinner center size={20} />
            </div>
          )}
          {children}
        </Direction.Row>
      ) : (
        children
      )}
    </ButtonWrapper>
  );
};

export default Button;
