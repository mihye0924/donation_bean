import styled from "styled-components";

interface ButtonProps { 
    children: JSX.Element | string;
    bg?: string;
    color?: string; 
    onClick?: () => void;

}
const Button = (props: ButtonProps) => {
  return (
    <ButtonWrap   
        bg={props.bg}
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
    padding: 5px 10px;
    border: 0;
    border-radius: 5px;
    font-family: 'NanumSquareNeo-Variable';
`