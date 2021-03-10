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
  align-items: center;
  flex-direction: column;
  position: absolute;
  padding: 10px;
  max-width: 325px;
  width: 100%;
  height: 175px;
  border-radius: 20px;
  font-weight: 500;
  background: white;

  .create-text {
    text-align: center;
    margin-bottom: 15px;
  }

  .input-note-name {
    box-shadow: rgba(0, 0, 0, 0.07) 0 2px 4px 0 inset;
    border: 1px solid ${theme.colors.greyLight};
    border-radius: ${theme.borderRadius};
    padding: 10px;
    margin-bottom: 25px;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
`;

