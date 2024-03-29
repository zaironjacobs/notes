import styled from 'styled-components';
import theme from 'theme';


export const Content = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${theme.footer.mobileHeight};
  background-color: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.greyLight};
  padding: 15px 15px 15px 15px;

  .built-by {
    a {
      color: ${theme.colors.greyDark};
      text-decoration: none;

      :hover {
        color: ${theme.colors.blueLight};
      }
    }
  }

  .github-icon-wrapper {
    margin-bottom: 10px;

    .github-icon {
      color: ${theme.colors.greyDark};
      font-size: 25px;
      transition: .3s;

      :hover {
        color: ${theme.colors.blueLight};
      }
    }
  }
`;

