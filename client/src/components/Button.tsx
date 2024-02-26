import styled from "styled-components";

interface ButtonProps { 
    children: JSX.Element | string;
    bg?: string;
    color?: string; 
    border?: string;
    width?: string;
    onClick?: () => void;

}
const Button = (props: ButtonProps) => {
  return (
    <ButtonWrap   
        bg={props.bg}
        border={props.border}
        width={props.width}
        color={props.color}
        onClick={props.onClick}
    >
        {props.children}
    </ButtonWrap>
  )
}

export default Button
 

const ButtonWrap = styled.button<ButtonProps>`
    cursor: pointer;
    background-color: ${(props) => props.bg};
    color: ${(props) => props.color};
    border: 1px solid ${(props) => props.border};
    width: ${(props) => props.width+"px"};
    padding: 5px 10px;
    font-size: 16px; 
    border-radius: 5px;
    font-family: 'NanumSquareNeo-Variable'; 
    white-space: pre;
`