import styled from "styled-components"
 
interface RadioProps {
    label: string;
    value: string | number;
    name: string;
    id: string;
    imgUrl?: string; 
    className: string
    onChange: () => void;
    type?: string;
}

const Radio = (props: RadioProps) => { 
  return ( 
      <>
      {(()=>{ 
        switch(props.type) {
          case "image":
            return ( 
              <RadioItem htmlFor={props.id} className={props.className}>
                  <input 
                      type="radio" 
                      id={props.id}
                      name={props.name}
                      value={props.value}
                      onChange={props.onChange}
                  />
                  <i className={props.imgUrl} />
                  {props.label}
              </RadioItem>
            )
          case "round":
            return(
              <RadioRound className={props.className}>
                <input 
                    type="radio" 
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />  
                <label htmlFor={props.id}>{props.label}</label>
            </RadioRound>
            )
          default: 
           break;
        }
      })()}
    </>
  )
}

export default Radio

const RadioItem = styled.label`
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 8px 6px;
    &.active {
      border-color: blue;
    } 
`
const RadioRound = styled.div`
  position: relative; 
  margin-left: 30px;
  input{ 
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
      &+label::after{
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        left: -25px; 
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