import { Link } from "react-router-dom"
import styled from "styled-components"


interface CardProps {
    to: string;
    imgSrc: string;
    imgUrl: string;
    title: string;
    agency: string;
    day: number;
    price: number;

}
const CardList = (props: CardProps) => { 
  return (
    <CardItem>
        <Link to={props.to}>
            <ImageInner>
                <img src={props.imgSrc} alt={props.imgUrl} />
            </ImageInner>
            <TextInner>
                <TextTop>
                    <TopTitle>
                        <strong>{props.title}</strong>
                        <span>D-{props.day}</span>
                    </TopTitle>
                    <span>{props.agency}</span>
                </TextTop>
                <TextBottom>
                    <ProgressBar />
                    <div>
                        <p className="percent">63%</p>
                        <p className="price"><span>{props.price}</span>원</p>
                    </div>
                </TextBottom>
            </TextInner>
        </Link>
    </CardItem>
  )
}

export default CardList

const CardItem = styled.li`
    border: 1px solid #ddd;
    background-color: #fff;
`
const ImageInner = styled.div`
    width: 100%;
    height: 165px;
    background-color: #ddd;
    img {
        display: none;
    }
`
const TextInner = styled.div`
    padding: 18px;
`
const TextTop = styled.div`
    margin-bottom: 24px;
    span {
        font-size: 14px;
    }
`
const TopTitle = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 6px;
    strong{
        white-space: pre-wrap;
        font-size: 18px;
    }
    span {
        font-size: 12px
    }
`
const TextBottom = styled.div`
    div {
        display: flex;
        justify-content: space-between;
        p {
            font-size: 18px
        }
    }
`
// 미정
const ProgressBar = styled.div`
    width: 100%;
    height: 4px;
    background-color: blue;
    margin-bottom: 6px;
`