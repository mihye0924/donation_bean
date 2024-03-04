import styled from "styled-components"
import Button from "@/components/Button" 
import PopupStore from "@/store/popupStore";
import { useEffect, useCallback, useState, useMemo } from "react";
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
  const {popup, popupState, setTitle } = PopupStore(); 
  const { setDonation, setChangeCategory, setChangeStatus } = DonationStore()
 
  const [donationData, setDonationData] = useState<DetailDonationDataProps[]>([])  // 기존 데이터
  const [changeData, setChangeData] = useState<DetailDonationDataProps[]>([])
  const user_id = "test1" // test id

  // 진행상태 초기셋팅
  const StatusList = useMemo(() => {
    return [
        {
            label: "진행중",
            value: "0",
        },
        {
            label: "진행종료",
            value: "1",
        },
    ]
}, [])

  // d-day 데이터
  const dDay = useCallback((data: DetailDonationDataProps[]) => {
    const updateData = data.map((item: DetailDonationDataProps, index:number) => {
        const targetData = new Date(String(data[index].donation_period).split('~')[1]);
        const currentDate = new Date();
        const timeDiff = targetData.getTime() - currentDate.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return {
            ...item, // 기존 항목 복사
            donation_period: daysRemaining // 기부 기간 업데이트
        };
    });
    return updateData;
  },[])
  
  // 체크 데이터
  const chooseItem = useCallback((data:DetailDonationDataProps[]) => {
    const updateData = data.map((item: DetailDonationDataProps) => {
        return {
          ...item,
          checked:  false,
          htmlId: String(item.donation_no)
        }
      })
      return updateData
  },[])

  // 라디오 카테고리 구분
  const [radioActive, setRadioActive] = useState<number>(0);
  const [radioLabel, setRadioLabel] = useState<string>()
  const handleRadioChange = useCallback((e:Option, i:number) => {
    const chooseItemData =  chooseItem(donationData) 
    const dDayData =  dDay(chooseItemData)
    // 라디오 클릭시 체크 초기화
    dDayData.forEach((item) => {
      item.checked = false
    })
    
    // 라디오 active 
    setRadioActive(i)  
    setRadioLabel(e.label)
    const data = dDayData.filter((item: {donation_category: string}) => {
      if(item.donation_category === e.label) { 
        return item
      }else if (e.label === "전체") {
        return item
      } 
    }) 
    
    setChangeData(data)
  }, [chooseItem, dDay, donationData]) 

  // 카드리스트 limit 증가
  const [limit, setLimit] = useState<number>(12) 
  const handleLimitToggle = () => {
      donationData.length > limit && setLimit(limit + 12)
  }

  // 셀렉트1 기능 - 전체, 진행중, 진행종료 
  const handleSelectEvent = useCallback((e: Option) => {  
    let proceedingArray = []
    let completedArray = []
    let data = []
    const chooseItemData =  chooseItem(donationData) 
    const dDayData =  dDay(chooseItemData)
    switch (e.label) {
        case "전체":   
        // console.log(newArray,"전체")
        data = dDayData.filter((item) => {return item.donation_category === radioLabel})
        return setChangeData(data)
        case "진행중":  
          data = dDayData.filter((item) => {return item.donation_category === radioLabel})      
          proceedingArray = data.filter((item) => item.donation_status === 0);
          // console.log(proceedingArray,"진행중") 
          setChangeData(proceedingArray);
          break;
        case "종료": 
          data = dDayData.filter((item) => {return item.donation_category === radioLabel})
          completedArray = data.filter((item) => item.donation_status === 1);
          // console.log(completedArray,"종료") 
          setChangeData(completedArray);
        break; 
    } 
}, [chooseItem, dDay, donationData, radioLabel]);
 
  // 셀렉트2 기능
  const handleSelect2Event = useCallback((e: Option) => {
    const chooseItemData =  chooseItem(donationData) 
    const dDayData =  dDay(chooseItemData)
    let recentArray = []
    let recentArrayDDay = []
    let amountArray = []
    let percentArray = []
    let finalArray = []
    let data = []
    let categoryArray = [] 

      switch (e.value) {
          case "최신 순": 
            categoryArray = donationData.filter((item) => {return item.donation_category === radioLabel})   
            recentArray = categoryArray.sort((a:DetailDonationDataProps, b:DetailDonationDataProps) => {
            // a와 b의 날짜를 비교하여 정렬 순서를 결정
            const dateA = new Date(String(a.donation_period).split('~')[0]);
            const dateB = new Date(String(b.donation_period).split('~')[0]); 
            return Number(dateB) - Number(dateA)
        });  
        
        // // D-day 계산
        recentArrayDDay = recentArray.map((item: DetailDonationDataProps) => {  
            const targetData = new Date(String(item.donation_period).split('~')[1]); 
            const currentDate = new Date();
            const timeDiff = targetData.getTime() - currentDate.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            return {
                ...item, // 기존 항목 복사
                donation_period: daysRemaining // 기부 기간 업데이트
            };
          })
          // console.log(recentArrayDDay,"최신 순")
          setChangeData(recentArrayDDay);
          break;
          case "참여금액 순":
            data = dDayData.filter((item) => {return item.donation_category === radioLabel})
            amountArray = data.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { return b.donation_goal - a.donation_goal; });
            // console.log(amountArray ,"참여금액 순")
            setChangeData(amountArray);
          break;
          case "참여율 순":
            data = dDayData.filter((item) => {return item.donation_category === radioLabel})
            percentArray = data.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { return b.donation_status - a.donation_status; });
            setChangeData(percentArray);
            // console.log(percentArray ,"참여율 순")
          break;
          case "종료 임박 순":
            data = dDayData.filter((item) => {return item.donation_category === radioLabel})
            finalArray = data.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { return Number(a.donation_period) - Number(b.donation_period); });
            setChangeData(finalArray);
            // console.log(finalArray ,"종료 임박 순")
          break;
        }
  }, [chooseItem, dDay, donationData, radioLabel]);
    
 
  // 카드리스트 체크
  const handleCheckBoxChange = useCallback((item: DetailDonationDataProps) => {  
    item.checked = !item.checked; 
    Category.filter((item2: Option) => {
      if(item2.label ===  item.donation_category){ 
        setChangeCategory(item2)
      }
    })
    StatusList.filter((item2: Option) => {
      if(item2.value === String(item.donation_status)) { 
        setChangeStatus(item2)
      }
    })
    
    setDonationData(donationData);  
  },[StatusList, donationData, setChangeCategory, setChangeStatus])

  // ----------------------------------------------------------------------------------

  // 게시글 전체 가져오기 (수정,삭제) 
  const getDonationData = useCallback(() => {
    changeData.forEach((item) => {
      if(item.checked) {
        axios
        .get(`${import.meta.env.VITE_SERVER_URL}/admin/donation?donation_no=${item.donation_no}`)
        .then((res) => { 
          setDonation(res.data.result)  
        }) 
      }
    }) 
  },[changeData, setDonation]) 

  // 게시글 컨텐츠 삭제
  const donationDelete = useCallback(() => {
    let count = 0;
    changeData.forEach((item) => {
      if(item.checked) {
        count++
      }
    })   
    if(count > 0) {  
      changeData.forEach((item) => {
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
  },[changeData])

  // 게시글 수정 체크여부
  const donationUpdate = useCallback(() => {
    let count = 0;
    changeData.forEach((item) => {
      if(item.checked) {
        count++
      }
    })  
    if(count === 1) { 
      setTitle("수정")
      popupState(!popup)
      getDonationData()
    }else if(count > 1){ 
      alert('한개의 게시물만 선택해주세요')
    }else{
      alert('선택된 게시글이 없습니다.') 
    }
  },[changeData, getDonationData, popup, popupState, setTitle])
 
  

  // 전체 게시물 가져오기
  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_SERVER_URL}/main/donation?user_id=${user_id}`) 
    .then((res) => {   
        setDonationData(res.data.result);
        const chooseItemData =  chooseItem(res.data.result) 
        const dDayData =  dDay(chooseItemData)
        setChangeData(dDayData)
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
  }, [chooseItem, dDay]);

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
                value={Sort1[0] }
                size={120}
                onChange={(e) => handleSelectEvent(e as Option)}
            />
            <Select 
                selectOptions={Sort2}
                value={Sort2[0]}
                size={120}
               onChange={(e) => handleSelect2Event(e as Option)}
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
            changeData.map((item: DetailDonationDataProps, index: number) => (
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
        limit <= changeData.length ?
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
    overflow-x: scroll; 
    overflow-y: hidden;
    padding-bottom: 10px;
    &::-webkit-scrollbar { 
        margin-top: 20px;
        height: 5px;
    }

    /* 스크롤바 막대 꾸미기 */
    &::-webkit-scrollbar-thumb { 
        height: 5px;
        background-color: #f1f1f1;
    } 
    @media ${media.mobile}{  
        scrollbar-width: none; 
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll; 
        overflow-y: hidden;
        &::-webkit-scrollbar {
            display: none; 
        } 
    }
    form {
        margin: 0 10px;
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