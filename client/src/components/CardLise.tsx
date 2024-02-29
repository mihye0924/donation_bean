import { Link } from "react-router-dom"
import styled from "styled-components"
import Progressbar from "./Progressbar";


interface CardProps {
    to: number | any;
    imgSrc: string;
    imgUrl: string;
    title: string;
    agency: string;
    day: number | string;
    price: number;
    percentage: number;
}
const CardList = (props: CardProps) => { 
  return (
    <CardItem>
        <Link to={props.to}>
            <ImageInner>
                <img src={props.imgSrc} alt={props.imgUrl} />
            </ImageInner>
            <TextInner>
                <div>
                    <TopTitle>
                        <strong>{props.title}</strong>
                        <span>D-{props.day}</span>
                    </TopTitle>
                </div>
                <TextBottom>
                    <span>{props.agency}</span>
                    <Progressbar percentage={props.percentage} />
                    <div className="text-list">
                        <p className="percent">{props.percentage}%</p>
                        <p className="price"><span>{props.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>원</p>
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
    a {
        display: block;
        height: 100%;
    }
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px;
    height: calc(100% - 165px);
`
const TopTitle = styled.div`
    display: flex;
    gap: 16px;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12px;
    white-space: nowrap;
    strong{
        white-space: pre-wrap;
        font-size: 18px;
    }
    span {
        font-size: 12px
    }
`
const TextBottom = styled.div`
    span {
        display: inline-block;
        margin-bottom: 12px;
    }
    .text-list {
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
        p {
            display: inline-block;
            font-size: 18px;
            &.percent {
                color: #00B2FF;
            }
            span {
                margin: 0;
            }
        }
    }
`