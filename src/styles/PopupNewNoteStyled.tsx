import styled from 'styled-components';
import theme from 'theme';


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
  z-index: 99999999999999999;

  .popup {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    padding: 10px;
    max-width: 325px;
    width: 100%;
    height: 200px;
    border-radius: 20px;
    font-weight: 500;
    background: white;

    .create-text {
      text-align: center;
      margin-bottom: 15px;
    }

    .note-name {
      box-shadow: rgba(0, 0, 0, 0.07) 0 2px 4px 0 inset;
      margin-bottom: 15px;
    }

    .button {
      cursor: pointer;
      border: none;
      height: 35px;
      max-width: 85px;
      width: 100%;
      border-radius: 4px;
      outline: none;
      transition: 0.3s;
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 15px;
      
      :last-of-type {
        margin-bottom: 0;
      }

      a {
        color: ${theme.colors.darkGrey};
        text-decoration: none;
      }

      :hover {
        box-shadow: rgba(149, 157, 165, 0.25) 0 8px 24px;
      }
    }
  }
`;

