import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from 'utilities/colors';

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const ShowBox = styled.div`
  &.showbox {
    &--full {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 100vh;
    }
  }
`;

type LoaderProps = {
  center: boolean;
  size: number | string;
};

const Loader = styled("div")<LoaderProps>`
  position: relative;
  margin: ${(props) => (props.center ? "0 auto" : "0")};
  width: ${(props) => `${props.size}px`};
  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const SVG = styled.svg`
  animation: 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Circle = styled.circle`
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke: ${(props) => props.theme};
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: square;
`;

type ChildrenWrapperProps = {
  center: boolean | string;
};

const ChildrenWrapper = styled("div")<ChildrenWrapperProps>`
  ${(props) => props.center && "text-align: center"}
`;

type Props = {
  full?: boolean;
  center?: boolean;
  color?: string;
  children?: string | React.ReactChild;
  size: number;
};

const Spinner = ({
  full = false,
  center = false,
  children,
  size = 50,
  color = theme.gray[900],
}: Props) => (
  <ShowBox className={full ? "showbox--full" : "showbox"}>
    <Loader center={center} size={size}>
      <SVG viewBox="25 25 50 50">
        <Circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          theme={color}
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </SVG>
    </Loader>
    {children && <ChildrenWrapper center={center}>{children}</ChildrenWrapper>}
  </ShowBox>
);

export default Spinner;
