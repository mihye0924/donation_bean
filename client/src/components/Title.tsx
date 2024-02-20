import styled from "styled-components"

interface TitleProps { 
    title: string; 
    bottomBorder?: boolean;
    children?: JSX.Element | string;
}

const Title = (props: TitleProps) => { 
  return ( 
    <TitleWrap className={props.bottomBorder ? "bottom_border" : ""}>   
        <p>{props.title} </p>
        <div>{props.children}</div>
    </TitleWrap>
  )
}

export default Title


const TitleWrap = styled.div`
  display: flex; 
  font-family: 'NanumSquareNeo-Variable';
  font-size: 20px;
  font-weight: 900;
  p {
    margin-right: 120px;
  }
  &.bottom_border { 
    border-bottom: 1px solid #f1f1f1;
    padding-top: 15px;
    padding-bottom: 15px;
  }
`