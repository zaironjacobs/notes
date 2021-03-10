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
  height: 40px;

  .my-notes {
    font-size: 20px;
    font-weight: 600;
  }

  .notes-header-one-left {
    display: flex;
    justify-content: center;
    align-items: center;

    .notes-trash {
      align-self: flex-end;
      font-size: 26px;
      margin-right: 6px;
      transition: .3s;
      color: ${theme.colors.redNormal};
      cursor: pointer;

      :hover {
        color: ${theme.colors.redLight};
      }
    }

    .new-note {
      font-size: 30px;
      cursor: pointer;
      transition: .3s;
      margin-left: 15px;
      color: ${theme.colors.greenNormal};

      :hover {
        color: ${theme.colors.greenLight};
      }
    }
  }
`;


export const Note = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  height: 45px;
  border-bottom: 1px solid ${theme.colors.greyDark};
  margin-bottom: 20px;
  transition: .1s ease-in-out;

  :hover {
    background-color: ${theme.colors.greyLight};
  }

  .note-checkbox {
    margin-right: 25px;
    cursor: pointer;
  }

  .note-name {
    width: 100%;
    padding: 8px 3px 8px 3px;
    cursor: pointer;
  }
`;