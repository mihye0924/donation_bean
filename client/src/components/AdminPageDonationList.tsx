import styled from "styled-components"
import Button from "@/components/Button" 
import PopupStore from "@/store/popupStore";
import { useEffect, useCallback, useState } from "react";
import axios from "axios"
import CardList from "./CardLise";
import { DetailDonationDataProps } from "@/types/detail";
import Category from "@/api/main/Category.json"
import Sort1 from "@/api/main/Sort1.json"
import Sort2 from "@/api/main/Sort2.json"
import Select, { Option } from "./Select";
import Radio from "./Radio"; 
import DonationStore from "@/store/donationStore";

const AdminPageDonationList = () => {
  const [radioActive, setRadioActive] = useState<number>(0);
  const {popup, popupState, setTitle } = PopupStore(); 
  const [limit, setLimit] = useState<number>(12)
  const [donationQueryData, setDonationQueryData] = useState<DetailDonationDataProps[]>([]); 
  const [donationData, setDonationData] = useState<DetailDonationDataProps[]>([])  
  const { setDonation } = DonationStore()
  const user_id = "test1"

  
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
          const data :DetailDonationDataProps[] =[]
            res.data.result.map((item: DetailDonationDataProps) => {
              data.push({
                ...item,
                checked:  false,
                htmlId: String(item.donation_no)
              })
            })
          setDonationQueryData(data)
          setDonationData(data) 
      })
      })
  },[]) 

  // 라디오 카테고리 구분
  const handleRadioChange = useCallback((e:Option, i:number) => {
    // 라디오 active 
    setRadioActive(i)
    donationQueryData.forEach((item: DetailDonationDataProps) => {
        if(item.donation_category === e.label) {
            const newData = donationQueryData.filter((item: { donation_category: string; }) => item.donation_category === e.label)
            setDonationData(newData)
        } else if (e.label === "전체") {
            setDonationData(donationQueryData)
        }
    })
}, [donationQueryData]) 

  // 카드리스트 limit 증가
  const handleLimitToggle = () => {
      donationData.length > limit && setLimit(limit + 12)
  }

  // 카드리스트 체크
  const handleCheckBoxChange = useCallback((item: DetailDonationDataProps) => { 
    item.checked = !item.checked;
    setDonationQueryData([...donationQueryData]);  
  },[donationQueryData])

  // 기부 컨텐츠 삭제
  const donationDelete = useCallback(() => {
    let count = 0;
    donationData.forEach((item) => {
      if(item.checked) {
        count++
      }
    })   
    if(count > 0) {  
      donationData.forEach((item) => {
        if(item.checked) {
          axios
          .delete(`${import.meta.env.VITE_SERVER_URL}/admin/donation?donation_no=${item.donation_no}`)
          .then((res) => {
            if(res.data.ok) {
              window.location.reload()
              return 
            }
          }) 
        }
      })  
    }else{
      alert('선택된 게시글이 없습니다.') 
    }
  },[donationData])

  // 게시글 가져오기
  const getDonationData = useCallback(() => {
    donationData.forEach((item) => {
      if(item.checked) {
        axios
        .get(`${import.meta.env.VITE_SERVER_URL}/admin/donation?donation_no=${item.donation_no}`)
        .then((res) => { 
          setDonation(res.data.result)
        }) 
      }
    }) 
  },[donationData, setDonation])
  

  // 게시글 수정 체크여부
  const donationUpdate = useCallback(() => {
    let count = 0;
    donationData.forEach((item) => {
      if(item.checked) {
        count++
      }
    })  
    if(count > 0) { 
      setTitle("수정")
      popupState(!popup)
      getDonationData()
    }else{
      alert('선택된 게시글이 없습니다.') 
    }
  },[donationData, getDonationData, popup, popupState, setTitle])
 
  useEffect(() => {
    getDonationList()
  },[getDonationList])

  return (
    <AdminPageWrap>
      <h1>기부목록</h1> 
      <ButtonBox> 
        <Button width="80" onClick={() => {setTitle("등록"), popupState(!popup)}}>등록</Button>
        <Button width="80" onClick={donationDelete}>삭제</Button>
        <Button width="80" onClick={donationUpdate}>수정</Button>
      </ButtonBox>
      <SelectWrap>
            <Select 
                selectOptions={Sort1}
                value={Sort1[0]}
                size={120}
                onChange={(e) => console.log(e)}
            />
            <Select 
                selectOptions={Sort2}
                value={Sort2[0]}
                size={120}
                onChange={(e) => console.log(e)}
            />
      </SelectWrap>
      <RadioWrap>
        <form>
        {
          Category.map((item, index) => {
              return (
                <Radio 
                    key={item.id}
                    className={radioActive === index ? "active" : ""}
                    label={item.label}
                    id={item.id} 
                    value={item.value} 
                    imgUrl={item.imgUrl}  
                    type="image"
                    name="기부리스트" 
                    onChange={() => handleRadioChange(item, index)}
                />
            )
            })
          } 
        </form>
      </RadioWrap>
      <CardWrap> 
          {
            donationData.map((item: DetailDonationDataProps, index: number) => (
              index < limit && <CardList
                    check
                    key={item.donation_no}
                    to={`/detail/${item.donation_no}`}
                    imgSrc={item.donation_name} 
                    imgUrl={item.donation_image} 
                    title={item.donation_name}
                    agency={item.donation_company}
                    day={item.donation_period}
                    price={item.donation_goal}
                    percentage={item.donation_status}
                    htmlId={item.htmlId} 
                    name="선택"
                    checked={item.checked}  
                    value={item.htmlId}
                    onChange={() => handleCheckBoxChange(item)}
                />
            ))
          }
      </CardWrap> 
      {
        limit <= donationData.length ?
        <ButtonWrap>
            <Button border="#ddd" size="medium" onClick={handleLimitToggle}>
                더보기
            </Button>
        </ButtonWrap>
        : null
      }
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
const RadioWrap = styled.div`
    margin: 20px auto 20px;
    overflow: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
        form {
                display: flex;
                gap: 8px;
        }
` 
const SelectWrap = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
` 
const CardWrap = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    li {
        flex: 0 1 calc((100% / 3) - 15px);
        span:first-child {
          display: inline-block;
        }
    }
    @media ${media.desktop}{
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
const ButtonWrap = styled.div`
    margin-top:24px;
`