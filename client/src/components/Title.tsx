import styled from "styled-components"

interface TitleProps { 
    title: string; 
    bottomBorder?: boolean;
    children?: JSX.Element | string;
    flex?: number;
    flexdirection?: string;

}

const Title = (props: TitleProps) => { 
  return ( 
    <TitleWrap className={props.bottomBorder ? "bottom_border" : ""}>   
        <p>{props.title} </p>
        <Content
          flex={props.flex}  
          flexdirection={props.flexdirection}  
        >
          {props.children}
        </Content>
    </TitleWrap>
  )
}

export default Title

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

const TitleWrap = styled.div`
  display: flex; 
  font-family: 'NanumSquareNeo-Variable';
  font-size: 20px;
  font-weight: 900;
  p {
    width: 210px; 
  }
  span {
    font-family: initial;
    font-weight: normal;
    font-size: 16px;
  }
  &.bottom_border { 
    border-bottom: 1px solid #f1f1f1;
    padding-top: 15px;
    padding-bottom: 15px;
  } 
  @media ${media.tablet}{ 
    flex-wrap: wrap;
       p {
        width: 100px;
        font-size: 14px;
       }
    }
`
const Content = styled.div<{flex?: number; flexdirection?: string;}>` 
  flex: ${(props) => props.flex}; 
  flex-direction: ${(props) => props.flexdirection}; 
  /* display: flex; */
`