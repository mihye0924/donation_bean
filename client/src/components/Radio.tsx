import { useCallback, useEffect, useState } from "react";
import styled from "styled-components"


interface RadioProps {
    label: string;
    value: string;
    name: string;
    id: string;
    imgUrl: string; 
    onChange?: () => void;
}

const Radio = (props: RadioProps) => { 
  const [radioActive, setRadioActive] = useState<string>("");
  const handleRadioChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioActive(event.target.value);
    console.log(radioActive, event.target.value)
    props.onChange;
  }, []);
  useEffect(() => {

  }, [radioActive])
  return (
      <RadioItem htmlFor={props.id} className={radioActive === props.value ? "active" : ""}>
          <input 
              type="radio" 
              id={props.id}
              name={props.name}
              value={props.value}
              onChange={handleRadioChange}
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