import styled from 'styled-components';
import theme from 'theme';


export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${theme.header.mobileHeight};
  background-color: ${theme.colors.starCommandBlue};

  .logo {
    font-family: ${theme.fonts.audiowide}, sans-serif;
    color: ${theme.colors.white};
    font-size: 32px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
`;

