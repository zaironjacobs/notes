import styled from 'styled-components';
import {Main} from '@style/GlobalStyle';


export const MainContainer = styled(Main)`
  margin-top: 15px;
`;

export const HelloMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 15px;

  .hello {
    font-size: 36px;
  }

  .name {
    font-size: 46px;
    margin-bottom: 15px;
  }
`;