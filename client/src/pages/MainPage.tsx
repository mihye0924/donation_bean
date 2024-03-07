// import CardList from "@/components/CardLise"
import Radio from "@/components/Radio";
import Select, { Option } from "@/components/Select";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import { CategoryTypes, DetailDonationDataProps, DetailPaymentAllDataProps } from "@/types/detail";
import CardList from "@/components/CardLise";
import Button from "@/components/Button";
import Category from "@/api/main/Category.json";
import Sort2 from "@/api/main/Sort2.json";
import DonationStore from "@/store/donationStore";
import { getUser } from "@/util/userinfo";
import useMutation from "@/hooks/useMutation";

const MainPage = () => {
  // Swiper Slide 더미
  const SlideList = useMemo(() => {
    return [
      {
        id: 0,
        img: "/images/slideBanner1.png",
      },
      {
        id: 1,
        img: "/images/slideBanner2.png",
      },
      {
        id: 2,
        img: "/images/slideBanner3.png",
      },
      {
        id: 3,
        img: "/images/slideBanner4.png",
      },
      {
        id: 4,
        img: "/images/slideBanner1.png",
      },
      {
        id: 5,
        img: "/images/slideBanner2.png",
      },
      {
        id: 6,
        img: "/images/slideBanner3.png",
      },
      {
        id: 7,
        img: "/images/slideBanner4.png",
      },
      {
        id: 8,
        img: "/images/slideBanner1.png",
      },
      {
        id: 9,
        img: "/images/slideBanner2.png",
      },
      {
        id: 10,
        img: "/images/slideBanner3.png",
      },
      {
        id: 11,
        img: "/images/slideBanner4.png",
      },
    ];
  }, []);
  // Swiper slide Index
  const [swiperIndex, setSwiperIndex] = useState<number>(1);
  // Swiper slide progress
  const progressProgress = useRef<HTMLDivElement>(null);
  const onAutoplayTimeLeft = (s: string, time: number, progress: string) => {
    progressProgress.current?.style.setProperty("--progress", progress);
  };
  const [swiper, setSwiper] = useState<{
    autoplay: { stop: () => void; start: () => void };
  }>();
  const [pauseNum, setPauseNum] = useState<number>(0); // Swiper button 구분 number
  const [swiperButton, setSwiperButton] = useState("icon-pause"); // Swiper button icon
  // Swiper 정지 재생 기능
  const handleSlidePause = () => {
    if (pauseNum === 0) {
      setPauseNum(1);
      setSwiperButton("icon-start");
      swiper?.autoplay.stop();
    } else {
      setPauseNum(0);
      setSwiperButton("icon-pause");
      swiper?.autoplay.start();
    }
  };

  const { status, changeDonation, setDonation, setRecentDonation, setAmountDonation, setPercentDonation, setExitDonation } = DonationStore();
  const user = getUser(); 

  // 라디오 카테고리 구분
  const [select1, setSelect1] = useState<Option>({ value: "0", label: "전체" });
  const [select2, setSelect2] = useState<Option>({ value: "최신 순" });
  const [radioActive, setRadioActive] = useState<number>(0);
  const [radioLabel, setRadioLabel] = useState<string>("전체");

  // 셀렉트 선택시 리스트 변경 - 전체, 진행중, 종료
  const handleChangeEvent1 = useCallback(() => {
    setSelect1(select1);
    // console.log(status, "ddd");
    switch (select1.label) {
      case "전체":
        // console.log("전체");
        switch (select2.value) {
          case "최신 순":
            setRecentDonation(radioLabel, select1);
            break;
          case "참여금액 순":
            setAmountDonation(radioLabel, select1);
            break;
          case "참여율 순":
            setPercentDonation(radioLabel, select1);
            break;
          case "종료 임박 순":
            setExitDonation(radioLabel, select1);
            break;
        }
        break;
      case "진행중":
        // console.log("진행중");
        switch (select2.value) {
          case "최신 순":
            setRecentDonation(radioLabel, select1);
            break;
          case "참여금액 순":
            setAmountDonation(radioLabel, select1);
            break;
          case "참여율 순":
            setPercentDonation(radioLabel, select1);
            break;
          case "종료 임박 순":
            setExitDonation(radioLabel, select1);
            break;
        }
        break;
      case "종료":
        // console.log("종료");
        switch (select2.value) {
          case "최신 순":
            setRecentDonation(radioLabel, select1);
            break;
          case "참여금액 순":
            setAmountDonation(radioLabel, select1);
            break;
          case "참여율 순":
            setPercentDonation(radioLabel, select1);
            break;
          case "종료 임박 순":
            setExitDonation(radioLabel, select1);
            break;
        }
        break;
    }
  }, [radioLabel, select1, select2.value, setAmountDonation, setExitDonation, setPercentDonation, setRecentDonation]);

  // 라디오 카테고리 구분
  const handleRadioChange = useCallback(
    (e: Option, i: number) => {
      // 라디오 클릭시 체크 초기화
      changeDonation.forEach((item) => {
        item.checked = false;
      });

      // 라디오 active
      setRadioActive(i);
      setRadioLabel(e.label as string);
    },
    [changeDonation]
  );

  // 카드리스트 limit 증가
  const [limit, setLimit] = useState<number>(12);
  const handleLimitToggle = () => {
    changeDonation.length > limit && setLimit(limit + 12);
  };

  // 좋아요 데이터 넣기
  // const [submitMutate] = useMutation(`${import.meta.env.VITE_SERVER_URL}/payment`);
  // const insertLike = useCallback(() => {
  //   const queryData = {
  //     user_id: user.id,
  //     donation_no: "클릭할 번호 숫자타입으로",
  //   };
  //   submitMutate(queryData)
  // },[submitMutate, user.id])
 


  // 좋아요 데이터 넣기
  // const getLike = useCallback(() => {
  //   axios
  //   .get(`${import.meta.env.VITE_SERVER_URL}/main/like?user_id=${user.id}&donation_no=${"클릭할 번호 숫자타입으로"}`) 
  //   .then((res) => console.log(res.data.result));
  // },[user.id])

  // useEffect(() => {
  //   getLike()
  // },[getLike])


  // 퍼센트 구하기  
  const addData = useRef<number[]>([])
  const paymentAllData = useCallback((index: number) => { 
    console.log(index,"index")
    const arr: number[] = []
    axios
    .get(`${import.meta.env.VITE_SERVER_URL}/payment/all?donation_no=${index}`) 
    .then((res) => { 
      res.data.result.forEach((item: DetailPaymentAllDataProps, index2:number) => { 
        arr[index2] = Number(item.donation_current)
      })

      addData.current[index] = arr.reduce((prev, curr) => {
        return prev + curr 
        },0)     
      })
      console.log(addData.current)
   return addData.current[index]
},[addData])

 

  useEffect(() => {
    setSelect1(status);
    axios
      .get(`http://localhost:8081/main/donation`)
      .then((res) => {
        setDonation(res.data.result);
        handleChangeEvent1();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [handleChangeEvent1, setDonation, status]);

  return (
    <MainInner>
      <SwiperWrap>
        {SlideList && (
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            onSlideChange={(e: { realIndex: number }) =>
              setSwiperIndex(e.realIndex + 1)
            }
            onSwiper={(e) => setSwiper(e)}
            onAutoplayTimeLeft={() => onAutoplayTimeLeft}
            className="mySwiper"
          >
            {SlideList.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <img src={item.img} alt="배너" />
                  {String(swiperIndex).padStart(2, "0")}
                </SwiperSlide>
              );
            })}
            <div className="autoplay-progress" slot="container-end">
              <span className="autoplay-progress-num left">
                {String(swiperIndex).padStart(2, "0")}
              </span>
              <div className="autoplay-progress-bar">
                <div ref={progressProgress} />
              </div>
              <span className="autoplay-progress-num right">
                {String(SlideList.length).padStart(2, "0")}
              </span>
              <button onClick={handleSlidePause}>
                <i className={swiperButton} />
              </button>
            </div>
          </Swiper>
        )}
      </SwiperWrap>
      <SelectWrap>
        {/* <Select 
                    selectOptions={Sort1}
                    value={select1}
                    size={120}
                    onChange={(e) => {setSelect1(e as Option)}}
                /> */}
        <Select
          selectOptions={Sort2}
          value={Sort2[0]}
          size={120}
          onChange={(e) => {
            setSelect2(e as Option);
          }}
        />
      </SelectWrap>
      <RadioWrap>
        <form>
          {Category.map((item: CategoryTypes, index: number) => {
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
            );
          })}
        </form>
      </RadioWrap>
      <CardWrap>
        {changeDonation.map(
          (item: DetailDonationDataProps, index: number) =>
            index < limit && (
              <CardList
                key={item.donation_no}
                to={`/detail/${item.donation_no}`}
                imgSrc={item.donation_name}
                imgUrl={item.donation_image}
                title={item.donation_name}
                agency={item.donation_company}
                day={item.donation_period}
                price={item.donation_goal}
                percentage={Math.floor(paymentAllData(item.donation_no) / item.donation_goal * 100)}
              />
            )
        )}
      </CardWrap>
      {limit <= changeDonation.length ? (
        <ButtonWrap>
          <Button border="#ddd" size="medium" onClick={handleLimitToggle}>
            더보기
          </Button>
        </ButtonWrap>
      ) : null}
    </MainInner>
  );
};
export default MainPage;
const sizes = {
  desktop: "1200px",
  tablet: "768px",
  mobile: "375px",
};
const media = {
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  mobile: `(max-width: ${sizes.mobile})`,
};

const MainInner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 147px;
  @media ${media.mobile} {
    padding-top: 112px;
  }
`;
const SwiperWrap = styled.div`
  height: 500px;
  .mySwiper {
    height: 100%;
    .swiper-slide {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .autoplay-progress {
      position: absolute;
      left: 110px;
      bottom: 50px;
      width: 70px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f56400;
      &-num {
        font: {
          size: 20px;
        }
        &.left {
          position: absolute;
          left: -22px;
          top: 50%;
          transform: translateY(-50%);
        }
        &.right {
          position: absolute;
          right: -22px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &-bar {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 70px;
        height: 2px;
        background-color: #ddd;
        div {
          --progress: 0;
          z-index: 10;
          width: calc(100% * (1 - var(--progress)));
          height: 2px;
          background-color: #f56400;
        }
      }
      button {
        position: absolute;
        right: -50px;
        width: 20px;
        height: 20px;
        i {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        .icon {
          &-pause {
            background: url("/images/icon-pause.svg") no-repeat center/ contain;
          }
          &-start {
            background: url("/images/icon-start.svg") no-repeat center/ contain;
          }
        }
      }
    }
  }
  @media ${media.tablet} {
    height: 307px;
    .swiper-slide {
      height: 307px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  @media ${media.mobile} {
    height: 150px;
    .swiper-slide {
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
const SelectWrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

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
  @media ${media.mobile} {
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
`;

const CardWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  li {
    flex: 0 1 calc((100% / 4) - 15px);
  }
  @media ${media.tablet} {
    li {
      flex: 0 1 calc((100% / 2) - 10px);
    }
  }
  @media ${media.mobile} {
    li {
      flex: 0 1 100%;
    }
  }
`;
const ButtonWrap = styled.div`
  margin-top: 24px;
`;
