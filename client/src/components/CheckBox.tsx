import styled from "styled-components"; 

export interface CheckboxProps{
    id?: number;
    type?: string;
    label?: string;
    htmlId?: string;
    value: string | number;
    name: string; 
    checked: boolean;
    icon?: boolean;
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
                <InputItem className={`round${props.checked ? " active" : ""}`} > 
                  <input 
                    type="checkbox" 
                    id={props.htmlId}
                    name={props.name}
                    value={props.value}
                    checked={props.checked}
                    onChange={props.onChange}
                  />  
                  <label htmlFor={props.htmlId}>
                    {
                      props.icon &&
                      <i className="icon" />
                    }
                    {
                      props.label &&
                      <span>{props.label}</span>
                    }
                  </label>
                </InputItem>
              )
              case "square":
                return (
                  <InputItem className={`square${props.checked ? " active" : ""}`} > 
                    <input 
                      type="checkbox" 
                      id={props.htmlId}
                      name={props.name}
                      value={props.value}
                      checked={props.checked}
                      onChange={props.onChange}
                    /> 
                    <label htmlFor={props.htmlId}>
                      {
                        props.icon &&
                        <i className="icon" />
                      }
                      {
                        props.label &&
                        <span>{props.label}</span>
                      }
                    </label> 
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
    label {
      cursor: pointer;  
      display: flex; 
      .icon {
        position: relative;
        display: inline-block;
        margin-right: 10px;
        width: 25px;
        height:25px;
        border-radius: 50%;
      &::before{ 
        position: absolute;
        content: '';
        width: 2px;
        height: 9px;
        z-index: 1;
        background-color: #fff;
        top: 56%;
        transform: translateY(-50%) rotate(-40deg);
        left: 8px;
        border-radius: 5px;
      }
      &::after{  
        position: absolute;
        content: '';
        z-index: 1;
        display: inline-block;
        width: 2px;
        height: 11px;
        background-color: #fff;
        top: 53%;
        transform: translateY(-50%) rotate(40deg);
        left: 14px;
        border-radius: 5px;
      } 
      }
      span {
        flex: 1;
      }
    } 
    &.active{ 
      .icon {
        background-color: #f56400 !important;
        z-index: 1;
      } 
    }
    &.round { 
      padding: 10px 0;
      .icon {   
        background-color: #bdbdbd;
      } 
    } 
    &.square {  
      .icon { 
        margin-right: 0; 
        border: 1px solid #f56400; 
        border-radius: 5px;
        &::before{  
          background-color: #f56400 !important; 
        }
        &::after{  
          background-color: #f56400  !important;  
        } 
      } 
      &.active{ 
        .icon {  
          &::before{  
            background-color: #fff !important;  
          }
          &::after{  
            background-color: #fff !important;  
          } 
        } 
      }
    }
` 