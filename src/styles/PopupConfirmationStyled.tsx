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
`;


export const Popup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  padding: 10px;
  max-width: 325px;
  width: 100%;
  height: 145px;
  border-radius: 20px;
  font-weight: 500;
  background: white;

  .confirmation-text {
    text-align: center;
    margin-bottom: 25px;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-evenly;
  }

  .confirmation-button {
    cursor: pointer;
    border: none;
    height: 35px;
    max-width: 75px;
    width: 100%;
    border-radius: 4px;
    outline: none;
    transition: 0.3s;
    font-size: 18px;
    font-weight: 400;
    background-color: ${theme.colors.greyLight};

    a {
      color: ${theme.colors.greyDark};
      text-decoration: none;
    }

    :hover {
      box-shadow: rgba(149, 157, 165, 0.25) 0 8px 24px;
    }
  }
`;
