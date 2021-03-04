import styled from 'styled-components';
import theme from 'theme';


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${theme.footer.mobileHeight};
  background-color: ${theme.colors.lightGrey};

  .built-by {
    a {
      color: ${theme.colors.darkGrey};

      :hover {
        color: ${theme.colors.royalBlueLight};
      }
    }
  }

  .github-icon-wrapper {
    margin-bottom: 10px;

    .github-icon {
      color: ${theme.colors.darkGrey};
      font-size: 25px;
      transition: .3s;

      :hover {
        color: ${theme.colors.royalBlueLight};
      }
    }
  }
`;

