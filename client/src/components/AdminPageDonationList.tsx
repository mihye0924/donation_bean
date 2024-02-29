import styled from "styled-components"
import Button from "@/components/Button" 
import PopupStore from "@/store/popupStore";
import { useEffect, useCallback, useState } from "react";
import axios from "axios"
import CardList from "./CardLise";
import { DetailDonationDataProps } from "@/types/detail";

const AdminPageDonationList = () => {
  const { popup, popupState, setTitle } = PopupStore(); 
  const user_id = "test1"
  const [donationList, setDonationList] = useState<DetailDonationDataProps[]>([]);
  
    // 전체 게시물 가져오기
    const getDonationList = useCallback(() => { 
      axios.get(`${import.meta.env.VITE_SERVER_URL}/main/donation?user_id=${user_id}`) 
      .then((res) => { 
        res.data.result.forEach((item: DetailDonationDataProps, index:number) => {
          // 날짜 구하기
          const targetData = new Date(String(res.data.result[index].donation_period.split("~ ")[1]))
          const currentDate = new Date();
          const timeDiff = targetData.getTime() - currentDate.getTime();
          const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          item.donation_period = String(daysRemaining);
          setDonationList(res.data.result)
      })
      })
  },[])
  useEffect(() => {
    getDonationList()
  },[getDonationList])
  return (
    <AdminPageWrap>
      <h1>기부목록</h1> 
      <ButtonBox> 
        <Button width="80" onClick={() => {setTitle("등록"), popupState(!popup)}}>등록</Button>
        <Button width="80">삭제</Button>
        <Button width="80">수정</Button>
      </ButtonBox>
      <CardWrap> 
          {
            donationList.map((item: DetailDonationDataProps) => (
                <CardList
                    key={item.donation_no}
                    to={`/payment/${item.donation_no}`}
                    imgSrc={item.donation_name} 
                    imgUrl={item.donation_image} 
                    title={item.donation_name}
                    agency={item.donation_company}
                    day={item.donation_period}
                    price={item.donation_goal}
                    percentage={item.donation_status}
                />
            ))
          }
        </CardWrap>
    </AdminPageWrap>
  )
}

export default AdminPageDonationList
const sizes = {
  desktop: "1200px",
  tablet: "768px",
  mobile: "375px"
}; 
const media = {
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  mobile: `(max-width: ${sizes.mobile})`,
  }; 

const AdminPageWrap = styled.div`
  h1 {
  color: #f56400;
  font-family: 'NanumSquareNeo-Variable';
  font-size: 40px;
  font-weight: 900;
  @media ${media.desktop}{ 
    margin-top: 20px;
    font-size: 30px;  
  }
  @media ${media.tablet}{  
    display: none;
  } 
  }
`
const ButtonBox = styled.div`
  margin-top: 50px; 
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  button {
    background-color: #f56400;
    color: #fff;
    padding: 8px 20px;
    border: 0;
    margin-left: 10px;  
    &:not(:nth-of-type(1)) {
      color: #f56400;
      border: 1px solid #f56400;
      background-color: transparent;
    }
  } 
  @media ${media.desktop}{  
    button {
    width: 65px;
    padding: 5px 13px;
    font-size: 14px; 
    }
  }
`


const CardWrap = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    li {
        flex: 0 1 calc((100% / 4) - 15px);
    }
    @media ${media.tablet}{
        li {
            flex: 0 1 calc((100% / 2) - 10px);
        }
    }
    @media ${media.mobile}{
        li {
            flex: 0 1 100%;
        }
    }
`
