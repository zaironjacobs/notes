import styled from 'styled-components';
import theme from 'theme';
import {Main} from '@style/GlobalStyle';


export const MainContainer = styled(Main)`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - ${theme.footer.height});
`;


export const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  margin-bottom: 25px;

  .not-found-404 {
    font-size: 100px;
    line-height: 1;
    text-transform: uppercase;

    ${theme.media._768px} {
      font-size: 140px;
    }

    ${theme.media._1200px} {
      font-size: 160px;
    }
  }

  .not-found-page {
    font-size: 20px;
    text-transform: uppercase;

    ${theme.media._768px} {
      font-size: 24px;
    }

    ${theme.media._1200px} {
      font-size: 26px;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  height: 45px;
  max-width: 100px;
  width: 100%;
  border-radius: ${theme.borderRadius};
  outline: none;
  transition: 0.3s;
  font-size: 18px;
  
  a {
    color: ${theme.colors.greyDark};
    text-decoration: none;
  }

  :hover {
    box-shadow: rgba(149, 157, 165, 0.18) 0 8px 24px;
  }

  ${theme.media._768px} {
    max-width: 135px;
    height: 50px;
    font-size: 24px;
    padding-bottom: 3px;
  }
`;
