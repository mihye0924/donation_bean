import { Link } from "react-router-dom";
import styled from "styled-components";
import Progressbar from "@/components/Progressbar";
import CheckBox from "@/components/CheckBox";

interface CardProps {
  to: string;
  imgSrc: string;
  imgUrl: string;
  title: string;
  agency: string;
  day: number | string;
  price: number;
  percentage: number;
  check?: boolean;
  htmlId?: string;
  checked?: boolean;
  name?: string;
  value?: string | number;
  onChange?: () => void;
}
const CardList = (props: CardProps) => {
  return (
    <CardItem>
      {props.check && (
        <CheckBox
          icon
          type="square"
          htmlId={props.htmlId}
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
        />
      )}
      <Link to={props.to}>
        <ImageInner>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/uploads/donation/${
              props.imgUrl
            }`}
            alt={props.imgSrc}
          />
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
              <p className="price">
                <span>
                  {props.price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                원
              </p>
            </div>
          </TextBottom>
        </TextInner>
      </Link>
    </CardItem>
  );
};

export default CardList;

const CardItem = styled.li`
  position: relative;
  border: 1px solid #ddd;
  background-color: #fff;
  a {
    display: block;
    height: 100%;
  }
  .square {
    position: absolute;
    top: 20px;
    left: 20px;
    .icon {
      background-color: #bdbdbd;
      border: 0;
      &::before {
        background-color: #fff !important;
      }
      &::after {
        background-color: #fff !important;
      }
    }
    &.active {
      background-color: #f56400;
    }
  }
`;
const ImageInner = styled.div`
  width: 100%;
  height: 165px;
  background-color: #ddd;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const TextInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px;
  height: calc(100% - 165px);
`;
const TopTitle = styled.div`
  display: flex;
  gap: 16px;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
  white-space: nowrap;
  strong {
    white-space: pre-wrap;
    font-size: 18px;
    line-height: 1.3;
  }
  span {
    font-size: 12px;
  }
`;
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
        color: #00b2ff;
      }
      span {
        margin: 0;
      }
    }
  }
`;
