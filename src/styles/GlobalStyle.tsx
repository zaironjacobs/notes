import styled, {createGlobalStyle} from 'styled-components';
import theme from 'theme';


export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.white};
    text-rendering: optimizeLegibility;
    color: ${theme.colors.greyDark};
    font-weight: 400;
    font-size: 16px;
  }

  button, input, textarea {
    font-size: 16px;
    border: none;
    outline: none;
    font-family: inherit;
  }

  body, input, textarea, button {
    font-family: ${theme.fonts.ubuntu}, sans-serif;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  ::selection {
    color: ${theme.colors.white};
    background: ${theme.colors.blueNormal};
  }

  ::-moz-selection {
    color: ${theme.colors.white};
    background: ${theme.colors.blueNormal};
  }

  a {
    color: ${theme.colors.blueNormal};
    text-decoration: underline solid transparent;
    transition: .3s ease;

    :hover {
      text-decoration: underline solid ${theme.colors.blueLight};
    }
  }

  img {
    color: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
  }
`;


export const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - ${theme.header.mobileHeight} - ${theme.footer.mobileHeight});

  ${theme.media._1200px} {
  }
`;
