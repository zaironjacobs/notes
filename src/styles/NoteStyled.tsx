import styled from 'styled-components';
import {Main as M, PageWrapper as PW} from '@style/GlobalStyle';
import theme from 'theme';


export const Main = styled(M)`
  .loading {
    text-align: center;
    font-size: 16px;
    padding-top: 20px;

    ${theme.media._480px} {
      font-size: 24px;
    }
  }
`;


export const PageWrapper = styled(PW)`
  max-width: 1300px;

  .note-max-length {
    padding: 5px 10px 10px 5px;
    text-align: right;
    font-size: 14px;
  }
`;


export const NoteHeaderOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 10px;
  margin-bottom: 20px;
  height: 40px;

  .back {
    font-size: 30px;
    color: ${theme.colors.blueNormal};
    cursor: pointer;
    transition: .3s;

    :hover {
      color: ${theme.colors.blueLight};
    }

    ${theme.media._768px} {
      font-size: 38px;
    }
  }

  .note-options-wrapper {
    display: flex;
    justify-content: end;
    position: relative;
  }

  .note-edit {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    transition: .3s;
    margin-left: 25px;
    color: ${theme.colors.greyDark};

    :hover {
      color: ${theme.colors.greyNormal};
    }

    :after {
      content: 'edit';
      display: block;
      font-size: 14px;
    }

    ${theme.media._768px} {
      font-size: 32px;
    }
  }

  .note-save {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    right: 0;
    color: ${theme.colors.greenNormal};
    cursor: pointer;
    transition: .3s;
    margin-left: 25px;

    :after {
      content: 'save';
      display: block;
      font-size: 14px;
    }

    :hover {
      color: ${theme.colors.greenLight}
    }

    ${theme.media._768px} {
      font-size: 32px;
    }
  }

  .note-trash {
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    right: 10px;
    margin-left: 25px;
    transition: .3s;
    color: ${theme.colors.redNormal};
    cursor: pointer;

    :after {
      content: 'delete';
      display: block;
      font-size: 14px;
    }

    :hover {
      color: ${theme.colors.redLight}
    }

    ${theme.media._768px} {
      font-size: 32px;
    }
  }
`;


export const NoteHeaderTwo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  .note-name-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;