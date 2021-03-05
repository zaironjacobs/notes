import styled from 'styled-components';
import theme from 'theme';
import {Form} from 'formik';
import {Main} from "@style/GlobalStyle";


export const MainContainer = styled(Main)`
`;


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  padding: 0 10px 0 10px;

  .login-no-account {
    margin-top: 20px;
  }
`;


export const SignUpForm = styled(Form)`
  max-width: 375px;
  display: flex;
  width: 100%;
  flex-direction: column;

  .login-title {
    text-align: center;
  }

  .login-input {
    width: 100%;
    height: 45px;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #636363;
    margin-top: 20px;

    :first-of-type {
      margin-top: 0;
    }
  }

  .login-label {
    font-size: 18px;
    font-weight: 400;
    align-self: flex-start;
    margin-bottom: 3px;
    margin-top: 10px;
  }

  .login-form-error {
    color: ${theme.colors.imperialRed};
    font-size: 14px;
    margin-top: 5px;

    :before {
      content: '\\00a0';
    }
  }

  .login-server-error {
    margin-top: 20px;
    text-align: center;
    color: ${theme.colors.imperialRed};
    margin-bottom: 5px;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  color: ${theme.colors.white};
  background-color: ${theme.colors.royalBlueLight};
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  transition: .3s;

  :hover {
    background-color: ${theme.colors.starCommandBlue};
  }
`;