import styled from "styled-components";

interface CheckboxProps{
    type?: string;
    label: string;
    id: string;
    value: string | number;
    name: string;
    className?: string;
    onChange: () => void;
}
const CheckBox = (props: CheckboxProps) => {
  return (
    <>
    {
      (() => {
          switch(props.type) {
            case "round":
              return (
                <InputItem className={props.className} >
                  <input 
                    type="checkbox"
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                  /> 
                   <label htmlFor={props.id}>{props.label}</label>
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
  margin-left: 30px;
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
      &+label::before{
        position: absolute;
        content: '';
        width: 2px;
        height: 7px;
        background-color: #fff;
        top: 51%;
        transform: translateY(-50%) rotate(-40deg);
        left: -24px;
        border-radius: 5px;
      }
      &+label::after{
        position: absolute;
        content: '';
        width: 2px;
        height: 10px;
        background-color: #fff;
        top: 50%;
        transform: translateY(-50%) rotate(40deg);
        left: -19px;
        border-radius: 5px;
      }
    }
    &::before {
      position: absolute;
      content: '';
      width: 20px;
      height: 20px;
      left: -30px;
      top: 50%;
      transform: translateY(-50%); 
      background-color: #bdbdbd;
      border-radius: 50%;
    } 
    &.active{ 
      &::before{
        background-color: #f56400;
      } 
    }
    label {
      cursor: pointer;
    }
` 