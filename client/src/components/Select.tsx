import styled from "styled-components"


interface SelectProps {
    label: string;
    value: string;
    name: string;
    id: string;
    imgUrl: string; 
    className: string
    onChange: () => void;
}

const Select = (props: SelectProps) => { 
  return (
      <SelectItem htmlFor={props.id} className={props.className}>
          <input 
              type="select" 
              id={props.id}
              name={props.name}
              value={props.value}
              onChange={props.onChange}
          />
          <i className={props.imgUrl} />
          {props.label}
      </SelectItem>
  )
}

export default Select

const SelectItem = styled.label`
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 8px 6px;
      &.active {
        border-color: blue;
      }
  }
`