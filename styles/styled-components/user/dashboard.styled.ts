import styled from 'styled-components';
import { theme } from 'utilities/colors';

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  width: calc(100% - 40px);
  height: 100%;
`;

const DetailsWrapper = styled.div`
  padding: 30px;
  border-radius: 10px;
  border: 2px solid ${theme.white};
  background-color: transparent;
`;

const HighlightWrapper = styled.div`
  border-radius: 10px;
  border: 2px solid ${theme.white};
  background-color: ${theme.gray[300]};
  padding: 13px;
  &.clickable {
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
  ul {
    li {
      padding: 10px 20px;
      &:first-child {
        background-color: ${theme.gray[100]};
        border-radius: 10px;
      }
    }
  }
`;

export const Wrapper = {
  Container: ContainerWrapper,
  Content: ContainerContent,
  Details: DetailsWrapper,
  Highlight: HighlightWrapper,
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
`;

export const Content = {
  Wrapper: ContentWrapper,
};
