import styled from "styled-components";
import ReactSelect, { StylesConfig } from 'react-select'

interface Option {
  value: string;
  label: string;
}
interface SelectProps {
  selectOptions: Option[];
  color?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
  size: number;
  onChange?: (selectedOption: Option) => void;
}
const customStyles = (props: SelectProps): StylesConfig<Option, false> => ({
  control: (provided) => ({
    ...provided,
    width: `${props.size}px`, // 동적으로 너비 설정
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
});

const Select = (props: SelectProps) => { 
  return (
    <SelectItem>
      <ReactSelect 
        options={props.selectOptions}
        closeMenuOnSelect={true}
        onChange={() => props.onChange}
        defaultValue={props.selectOptions[0]}
        styles={customStyles(props)}
      /> 
    </SelectItem>
  )
}

export default Select

const SelectItem = styled.div`
  display: inline-block
`