import styled from 'styled-components';
import {Main as M, PageWrapper as PW} from '@style/GlobalStyle';
import theme from 'theme';


export const Main = styled(M)`
  .notes-loading {
    text-align: center;
    font-size: 16px;

    ${theme.media._480px} {
      font-size: 24px;
    }
  }

  .notes-server-error {
    text-align: center;
    font-size: 16px;
    color: ${theme.colors.redLight};

    ${theme.media._480px} {
      font-size: 24px;
    }
  }
`;


export const PageWrapper = styled(PW)`
  max-width: 800px;
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

    ${theme.media._768px} {
      font-size: 32px;
    }
  }

  .notes-header-one-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    .notes-trash {
      text-align: center;
      align-self: flex-end;
      font-size: 26px;
      transition: .3s;
      color: ${theme.colors.redNormal};
      cursor: pointer;

      :after {
        content: 'delete';
        display: block;
        font-size: 14px;
      }

      :hover {
        color: ${theme.colors.redLight};
      }

      ${theme.media._768px} {
        font-size: 32px;
      }
    }

    .note-upload {
      text-align: center;
      font-size: 30px;
      cursor: pointer;
      transition: .3s;
      margin-left: 15px;
      color: ${theme.colors.greyDark};

      ::after {
        content: 'upload';
        display: block;
        font-size: 14px;
      }

      :hover {
        color: ${theme.colors.greyNormal};
      }

      ${theme.media._768px} {
        font-size: 36px;
      }
    }

    .note-new {
      text-align: center;
      font-size: 30px;
      cursor: pointer;
      transition: .3s;
      margin-left: 15px;
      color: ${theme.colors.greenNormal};

      ::after {
        content: 'new';
        display: block;
        font-size: 14px;
      }

      :hover {
        color: ${theme.colors.greenLight};
      }

      ${theme.media._768px} {
        font-size: 38px;
      }
    }
  }

  #input-note-upload {
    display: none;
  }
`;


export const NotesHeaderTwo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  margin-bottom: 10px;

  .notes-checkbox {
    cursor: pointer;
    margin-right: 25px;
  }

  .notes-name {
    font-size: 18px;
    font-weight: 600;
    padding: 8px 3px 8px 3px;

    ${theme.media._768px} {
      font-size: 20px;
    }
  }
`;


export const UserNote = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  height: 45px;
  border-bottom: 1px solid ${theme.colors.greyDark};
  margin-bottom: 20px;
  transition: .1s ease-in-out;

  :hover {
    background-color: ${theme.colors.greyLighter};
  }

  .note-checkbox {
    margin-right: 25px;
    cursor: pointer;
  }

  .note-name {
    width: 100%;
    padding: 8px 3px 8px 3px;
    cursor: pointer;

    ${theme.media._768px} {
      font-size: 20px;
    }
  }
`;