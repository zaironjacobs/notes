import styled from 'styled-components';
import {Main} from '@style/GlobalStyle';
import theme from 'theme';


export const MainContainer = styled(Main)`
  margin-top: 20px;
  padding: 0 15px 0 15px;
`;

export const NotesHeaderOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px 0 10px;
  margin-bottom: 25px;

  .my-notes {
    font-size: 20px;
    font-weight: 600;
  }

  .new-note {
    font-size: 30px;
    cursor: pointer;
    transition: .3s;
    color: green;

    :hover {
      
    }
  }
`;


export const NotesHeaderTwo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px 0 10px;
  margin-bottom: 10px;
  height: 32px;

  .notes-trash {
    align-self: flex-end;
    font-size: 22px;
    margin-right: 8px;
    color: red;
    cursor: pointer;
  }
`;


export const Note = styled.div`
  display: flex;
  width: 100%;
  font-size: 18px;
  border-bottom: 1px solid ${theme.colors.darkGrey};
  margin-bottom: 20px;
  transition: .1s ease-in-out;

  :hover {
    background-color: #cae3ff;
  }

  .note-checkbox {
    margin-right: 25px;
    cursor: pointer;
  }

  .note-name {
    width: 100%;
    padding: 8px 3px 8px 3px;
    cursor: pointer;
    margin-top: -5px;
  }
`;
