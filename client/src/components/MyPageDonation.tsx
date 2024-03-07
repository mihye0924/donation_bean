import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
const MyPageDonation = () => {
  return (
    <Main>
      <h1>나의 후원</h1>
      <MyCashGrid>
        <div>
          <div className="PriceTitle">
            <h2>나의 보유금액</h2>
            <h1>0원</h1>
          </div>
          <div>
            <ul>
              <li>
                <span>
                  보유콩
                  <div>
                    <IoIosArrowForward />
                  </div>
                </span>
                <span>0원</span>
              </li>
              <li>
                <span>
                  결제금액
                  <div>
                    <IoIosArrowForward />
                  </div>
                </span>
                <span>0원</span>
              </li>
              <li>
                <span>
                  콩저금통
                  <div>
                    <IoIosArrowForward />
                  </div>
                </span>
                <span>0원</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="PriceTitle">
            <h2>총 후원금액</h2>
            <h1>0원</h1>
          </div>
          <div>
            <ul>
              <li>
                <span>
                  모금함기부
                  <div>
                    <IoIosArrowForward />
                  </div>
                </span>
                <span>0원</span>
              </li>
              <li>
                <span>
                  펀딩참여
                  <div>
                    <IoIosArrowForward />
                  </div>
                </span>
                <span>0원</span>
              </li>
            </ul>
          </div>
        </div>
      </MyCashGrid>
      <DayLine>
        <div></div>
        <span>2023.05</span>
        <div></div>
      </DayLine>
      <DonationRecord>
        <div>
          <div className="round">
            <p>기부</p>
            <p>완료</p>
          </div>
          <div>
            <div>날짜</div>
            <div className="donationContent">기부내용</div>
            <div>기부처</div>
          </div>
        </div>
        <div className="donationPrice">1000원</div>
      </DonationRecord>
    </Main>
  );
};

export default MyPageDonation;

const sizes = {
  tablet: "768px",
  desktop: "1200px",
};

const media = {
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

const Main = styled.div`
  h1 {
    display: none;
    color: #f56400;
    font-family: 'NanumSquareNeo-Variable';
    font-weight: 900;
    font-size: 30px;  
    margin-top: 20px;
    @media ${media.desktop}{ 
      display: block;
      margin-top: 0;
      font-size: 40px;
    }
    @media ${media.tablet}{ 
      display: block;
    } 
   }
  grid-column: span 2;
  li {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    svg {
      color: #dedede;
    }
    span {
      &:first-child {
        display: flex;
        align-items: center;
      }

      &:last-child {
        font-weight: 500;
      }
    }
  }
`;

const MyCashGrid = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  padding: 30px 10px;
  @media ${media.tablet} {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .PriceTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 10px;
    border-bottom: 1px solid #ececec;
    padding: 20px 0;
    h2 {
      font-size: 19px;
      font-weight: 700;
      font-family: 'NanumSquareNeo-Variable';
    }
    h1 {
      font-size: 26px;
      color: #f56400;
    }
  }
`;

const DayLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  font-size: 14px;
  color: #555555;
  position: relative;
  span {
    font-family: 'NanumSquareNeo-Variable';
    padding: 0 15px;
    z-index: 20;
    position: relative;
    display: inline-block;
    font-size: 18px;
    color: black;
    font-weight: 600;
    text-align: center;
    vertical-align: top;
  }
  div {
    flex: 1;
    border-top: 1px solid #d9d9d9;
    width: 100%;
  }
`;

const DonationRecord = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 50px 0;
  .donationPrice {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  div:first-child {
    grid-column: span 4;
    display: flex;
    font-size: 16px;
    align-items: center;
    .round {
      font-family: 'NanumSquareNeo-Variable';
      width: 75px;
      height: 75px;
      border: 1px solid #f56400;
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 5px 0;
      color: #f56400;
      margin-right: 15px;
    }
    div:last-child {
      font-size: 16px;
      color: #828282;
      .donationContent {
        font-size: 18px;
        color: black;
        margin: 10px 0;
      }
    }
  }
`;
