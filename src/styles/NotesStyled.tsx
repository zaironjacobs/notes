import styled from 'styled-components';
import {Main} from '@style/GlobalStyle';
import theme from 'theme';


export const MainContainer = styled(Main)`
  margin-top: 10px;
  padding: 0 15px 0 15px;
`;

export const NotesHeaderOne = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 10px;
  margin-bottom: 25px;

  .my-notes {
    font-size: 20px;
    font-weight: 600;
  }
`;

export const Note = styled.div`
  display: flex;
  width: 100%;
  font-size: 18px;
  border-bottom: 1px solid ${theme.colors.darkGrey};
  padding: 8px 3px 8px 3px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: .3s ease-in-out;
  border-radius: 5px;

  :hover {
    background-color: #cae3ff;
  }

  .note-checkbox {
    margin-right: 10px;
  }
`;
