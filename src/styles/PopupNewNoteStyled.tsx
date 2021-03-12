import styled from 'styled-components';
import theme from 'theme';
import {Form} from 'formik';


export const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;


export const Popup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  padding: 20px;
  max-width: 325px;
  width: 100%;
  height: auto;
  border-radius: 20px;
  font-weight: 500;
  background: white;
  z-index: 9999;

  .create-text {
    text-align: center;
    margin-bottom: 15px;
  }
`;


export const CreateNoteForm = styled(Form)`
  display: flex;
  flex-direction: column;

  .create-note-input {
    box-shadow: rgba(0, 0, 0, 0.07) 0 2px 4px 0 inset;
    border: 1px solid ${theme.colors.greyLight};
    border-radius: ${theme.borderRadius};
    padding: 10px;
    margin-bottom: 10px;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 10px;
  }

  .create-note-form-error {
    color: ${theme.colors.redLight};
    text-align: center;
    margin: 5px 0 5px;
  }

  .create-note-server-error {
    text-align: center;
    color: ${theme.colors.redLight};
    margin: 5px 0 5px;
  }
`;

