import styled from "styled-components"
import Button from "./Button";

interface PopupProps {
    children?: JSX.Element; 
    title?: string;
    onClick?: () => void;
}

const Popup = (props: PopupProps) => {
  return (
    <PopupDiem> 
        <PopupWrap>
            <Header>
                <div>
                    {props.title}
                </div>
                <Button onClick={props.onClick}>
                    <i className="icon" />
                </Button>
            </Header>
            <Body>
                {props.children}
            </Body>
        </PopupWrap>
    </PopupDiem>
  )
}

export default Popup

const PopupDiem = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgb(0 0 0 / 52%);
    left: 0;
    top: 0;
    z-index: 6;
`
const PopupWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    width: 100%;
    max-width: 480px;
    border-radius: 10px;
    height: 100%;
    overflow: hidden;
    max-height: 700px;
`
const Header = styled.div`
    border-bottom: 1px solid #f1f1f1;
    background-color: #f56400; 
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px 10px 0 0;
    padding: 0 20px;
    color: #fff;
    button {
        padding: 0;
        border: 0;
        .icon {
            filter: invert(1);
            display: block;
            background: url('/images/icon-close.svg') no-repeat;
            width: 20px;
            height: 20px;
            background-size: 100%;
        }
    }
`
const Body = styled.div`
    height: calc( 100% - 50px );
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
        width: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-clip: padding-box;
        background-color: #f56400;
        border-radius: 15px;
        border: 2px solid transparent;
    }
`