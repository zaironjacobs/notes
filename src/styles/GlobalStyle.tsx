import { createGlobalStyle } from 'styled-components'
import { theme } from '@theme'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.white};
    text-rendering: optimizeLegibility;
    color: ${theme.colors.grayDark};
    font-weight: 400;
    font-size: 16px;
    font-family: ${theme.fonts.openSans}, sans-serif;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  ::selection, ::-moz-selection {
    color: ${theme.colors.white};
    background: ${theme.colors.blueNormal};
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.grayDark};
  }
`
