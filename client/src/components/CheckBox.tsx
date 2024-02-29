import styled from "styled-components";

export interface CheckboxProps{
    id?: number;
    type?: string;
    label?: string;
    htmlId?: string;
    value: string | number;
    name: string; 
    checked: boolean;
    onChange?: () => void;
}
const CheckBox = (props: CheckboxProps) => {
  return (
    <>
    {
      (() => {
          switch(props.type) {
            case "round":
              return (
                <InputItem className={`round ${props.checked ? "active" : ""}`} > 
                  <input 
                    type="checkbox" 
                    id={props.htmlId}
                    name={props.name}
                    value={props.value}
                    checked={props.checked}
                    onChange={props.onChange}
                  /> 
                  <div className="icon"></div> 
                  { 
                    props.label &&
                    <label htmlFor={props.htmlId}>{props.label}</label>
                  }
                </InputItem>
              )
              case "square":
                return (
                  <InputItem className={`square ${props.checked ? "active" : ""}`} > 
                    <input 
                      type="checkbox" 
                      id={props.htmlId}
                      name={props.name}
                      value={props.value}
                      checked={props.checked}
                      onChange={props.onChange}
                    /> 
                    <div className="icon"></div> 
                    { 
                      props.label &&
                      <label htmlFor={props.htmlId}>{props.label}</label>
                    }
                  </InputItem>
                )
          }
      })()
    }
    </>
  )
}

export default CheckBox

const InputItem = styled.div` 
    position: relative;  
    padding: 15px 0;
    input{ 
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0; 
    }
    &.round { 
      &::before {
        position: absolute; 
        content: ''; 
        width: 20px;
        height: 20px;
        left: 0;
        top: 50%;
        transform: translateY(-50%); 
        background-color: #bdbdbd;
        border-radius: 50%;
      } 
    }
    .icon::before{
      position: absolute; 
      content: '';
      width: 2px;
      height: 7px;
      z-index: 1;
      background-color: #fff;
      top: 51%;
      transform: translateY(-50%) rotate(-40deg);
      left: 6px;
      border-radius: 5px;
    }
    .icon::after{
      position: absolute;
      content: '';
      z-index: 1;
      display:inline-block;
      width: 2px;
      height: 10px;
      background-color: #fff;
      top: 50%;
      transform: translateY(-50%) rotate(40deg);
      left: 11px;
      border-radius: 5px;
    } 
    &.active{ 
      &.round::before{
        background-color: #f56400;
        z-index: 1;
      } 
    }
    label {
      cursor: pointer;
      margin-left: 30px;
    }
    &.square {
      width: 15px;
      height: 15px; 
      .icon::before{
        position: absolute; 
        content: '';
        width: 2px;
        height: 7px;
        z-index: 1;
        background-color: #fff;
        top: 51%;
        transform: translateY(-50%) rotate(-40deg);
        left: 7px;
        border-radius: 5px;
      }
      .icon::after{
        position: absolute;
        content: '';
        z-index: 1;
        display:inline-block;
        width: 2px;
        height: 10px;
        background-color: #fff;
        top: 50%;
        transform: translateY(-50%) rotate(40deg);
        left: 12px;
        border-radius: 5px;
      } 
      &::before {
        position: absolute; 
        content: ''; 
        width: 20px;
        height: 20px;
        left: 0;
        top: 50%;
        transform: translateY(-50%); 
        border: 1px solid #f56400; 
        border-radius: 5px;
      }
      &.active {
        &::before {
          background-color: #f56400;
        }
      }    
    }
` 