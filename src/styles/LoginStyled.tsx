import styled from 'styled-components';
import theme from 'theme';
import {Form} from 'formik';
import {Main as M} from "@style/GlobalStyle";


export const Main = styled(M)``;


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  padding: 0 10px 0 10px;

  .login-no-account {
    margin: 20px 0 20px 0;
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
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.greyDark};
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
    color: ${theme.colors.redLight};
    font-size: 14px;
    margin-top: 5px;

    :before {
      content: '\\00a0';
    }
  }

  .login-server-error {
    margin-top: 20px;
    text-align: center;
    color: ${theme.colors.redLight};
    margin-bottom: 5px;
  }
`;