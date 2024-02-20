import styled from "styled-components"

interface AccordionProps {
  children: JSX.Element | null;
  title: string;
  onClick?: () => void; 
  active?: boolean;
  toggle?: boolean; 
  type?: string;
}

const Accordion = (props: AccordionProps) => { 
  return ( 
    <AccordionWrap 
      className={`${props.active ? '' : 'active'} ${props.type ? 'row': ''}`}
      > 
      {
          props.type === "custom" ?
          <div> 
            {props.children}
          </div> 
          :
          <div>
            { 
              <AccordionHeader>
              <h1>{props.title}</h1>
              {
                props.toggle &&
                <button onClick={props.onClick}></button>
              }
            </AccordionHeader>
            }
            <AccordionBody className="accord_body">
              {props.children}
            </AccordionBody>
          </div>
        }
    </AccordionWrap> 
      
  )
}

export default Accordion
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

const AccordionWrap = styled.div`
  &.active {
    border-radius: 15px;
    overflow: hidden;
    button {
      transform: rotate(-180deg); 
    }
    .accord_body { 
      height: 0;
      border-top: 0;
      padding: 0 70px;
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
    cursor: pointer;
  }
    @media ${media.tablet}{ 
      h1 { 
        font-size: 16px;
      }
      button {
         width: 15px;
         height: 15px;
      }
    }
`
const AccordionBody = styled.div`
  background-color: #fff;
  overflow: hidden;
  border-radius: 0 0 15px 15px;
  border-top: 1px solid #f1f1f1;
  height:  auto;
  padding: 50px 70px;
  line-height: 1.5;
  @media ${media.tablet}{ 
    padding: 20px;  
    }
`
 