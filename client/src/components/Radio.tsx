import styled from "styled-components"


interface RadioProps {
    label: string;
    value: string;
    name: string;
    id: string;
    imgUrl: string; 
    className: string
    onChange: () => void;
}

const Radio = (props: RadioProps) => { 
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
}

export default Radio

const RadioItem = styled.label`
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 8px 6px;
      &.active {
        border-color: blue;
      }
  }
`