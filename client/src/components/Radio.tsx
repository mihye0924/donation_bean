import styled from "styled-components"

interface RadioProps {
    label: string;
    value: string;
    name: string;
    id: string;
    imgUrl: string;
    onChange?: (e:any) => void;
}

const Radio = (props: RadioProps) => { 
  return (
    <RadioItem>
        <label htmlFor={props.id}>
            <input 
                type="radio" 
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={() => props.onChange}
            />
            <i className={props.imgUrl} />
            {props.label}
        </label>
    </RadioItem>
  )
}

export default Radio

const RadioItem = styled.div`
    label {
        border: 1px solid #ddd;
        border-radius: 20px;
        padding: 8px 6px;
    }
  }
`