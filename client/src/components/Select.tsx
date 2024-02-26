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
  size?: number;
  onChange?: (e: Option) => void;
}
const customStyles = (props: SelectProps): StylesConfig<Option, false> => ({
  control: (provided) => ({
    ...provided,
    width: `${props.size ? props.size+"px" :"100%"}`, // 동적으로 너비 설정
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
        onChange={props.onChange}
        defaultValue={props.selectOptions[0]}
        styles={customStyles(props)}
      /> 
    </SelectItem>
  )
}

export default Select
const sizes = {
  desktop: "1200px",
  tablet: "768px",
  mobile: "375px"
}; 
// 미디어 쿼리를 위한 도우미 함수
const media = {
desktop: `(max-width: ${sizes.desktop})`,
tablet: `(max-width: ${sizes.tablet})`,
mobile: `(max-width: ${sizes.mobile})`,
}; 

const SelectItem = styled.div`
  display: inline-block; 
  &>div {
    &>div { 
      font-weight: normal;
      font-size: 16px;
    }
  }
  @media ${media.tablet}{  
    &>div {
      &>div { 
        /* max-width: 100px; */
        font-size: 14px;
      }
    }
  }
`