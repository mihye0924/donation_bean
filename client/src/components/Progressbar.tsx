import styled from "styled-components"


interface ProgressbarProps {
    percentage : number;
}

const Progressbar = (props: ProgressbarProps) => { 
  return (
      <ProgressbarItem>
        <Percente style={{width: `${props.percentage}%`}} />
      </ProgressbarItem>
  )
}

export default Progressbar

const ProgressbarItem = styled.div`
    position: relative;
    width: 100%;
    height: 7px;
    background-color: #d9d9d9;
    border-radius: 7px; 
`
const Percente = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 7px;
    background-color: #f56400;
    border-radius: 7px; 
`