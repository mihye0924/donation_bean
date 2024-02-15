import styled from "styled-components"

interface AccordionProps {
  children: JSX.Element
  title: string;
  onClick?: () => void; 
  active: boolean;
  toggle?: boolean;
}

const Accordion = (props: AccordionProps) => { 
  return (
    <AccordionWrap className={!props.active ? 'active' : ''}>
      <AccordionHeader>
        <h1>{props.title}</h1>
        {
          props.toggle &&
          <button onClick={props.onClick}></button>
        }
      </AccordionHeader>
      <AccordionBody className="accord_body">
        {props.children}
      </AccordionBody>
    </AccordionWrap>
  )
}

export default Accordion

const AccordionWrap = styled.div`
  &.active {
    border-radius: 15px;
    overflow: hidden;
    button {
      transform: rotate(-180deg); 
    }
    .accord_body { 
      height: 0;
      padding: 0 20px;
      transition: all 0.5s ease-in-out;
    }
  }
`

const AccordionHeader =  styled.div`
  background-color: #fff;
  width: 100%; 
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 15px 15px 0 0;
  h1 {
    font-family: 'NanumSquareNeo-Variable';
    font-size: 20px;
    font-weight: 700; 
  }
  button {
    background: url('/images/ico-location-arr.svg') no-repeat;
    background-size: 100%;
    width: 25px;
    height: 25px;
    border: 0;
  }
`
const AccordionBody = styled.div`
  background-color: #fff;
  overflow: hidden;
  border-radius: 0 0 15px 15px;
  height:  auto;
  border-top: 1px solid #f1f1f1;
  padding: 20px;
  line-height: 1.5;
`