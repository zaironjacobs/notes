import styled from 'styled-components';
import theme from 'theme';


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${theme.footer.mobileHeight};
  background-color: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.greyLight};

  .built-by {
    a {
      color: ${theme.colors.greyDark};
      text-decoration: none;
    }
  }

  .github-icon-wrapper {
    margin-bottom: 10px;

    .github-icon {
      color: ${theme.colors.greyDark};
      font-size: 25px;
      transition: .3s;
    }
  }
`;

