import styled from "styled-components";

interface ButtonProps { 
    children: JSX.Element | string;
    bg?: string;
    color?: string; 
    border?: string;
    width?: string;
    size?: string;
    onClick?: () => void;

}
const Button = (props: ButtonProps) => {
  return (
    <ButtonWrap   
        bg={props.bg}
        border={props.border}
        width={props.width}
        size={props.size}
        color={props.color}
        onClick={props.onClick}
    >
        {props.children}
    </ButtonWrap>
  )
}

export default Button
 const size = {
  small: "30px",
  medium: "45px",
  large: "60px"
}
const ButtonWrap = styled.button<ButtonProps>`
    cursor: pointer;
    background-color: ${(props) => props.bg};
    color: ${(props) => props.color};
    border: 1px solid ${(props) => props.border};
    width: ${(props) => props.width ? props.width+"px" : "100%"};
    ${(props) =>
      props.size === "large" &&
      `
        height: 60px;
      `}
    ${(props) =>
      props.size === "medium" &&
      `
        height: 45px;
      `}
      ${(props) =>
      props.size === "small" &&
      `
        height: 30px;
      `}
  
    padding: 5px 10px;
    font-size: 16px; 
    border-radius: 5px;
    font-family: 'NanumSquareNeo-Variable'; 
    white-space: pre;
`