import styled, {css} from  'styled-components';

// custom button have three options: 
// className={`${inverted ? 'inverted': ''} ${
//     isGoogleSignIn ? 'google-sign-in': ''
//     } custom-button`} 
//     {...otherProps}
//     >
//     {children}
// we can easily fix this:
const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
`;

const googleSignInStyles = css`
background-color: #4285f4;
    color: white;

    &:hover {
      background-color: #357ae8;
      border: none;
    }
`;

// we call a function

const getButtonStyles = (props) => {
    if (props.isGoogleSignIn){
        return googleSignInStyles;
    } else {
        return props.inverted ?
        invertedButtonStyles
        :
        buttonStyles;
    }
}


export const CustomButtonContainer = styled.button`
min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  // we just call the getbuttonstyles option:
  ${getButtonStyles}
`