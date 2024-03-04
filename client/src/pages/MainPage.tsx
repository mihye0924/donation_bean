// import CardList from "@/components/CardLise"
import Radio from "@/components/Radio"
import Select, { Option } from "@/components/Select"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'; 

import { Autoplay, Navigation } from 'swiper/modules'; 
import 'swiper/css';
import axios from "axios"
import { CategoryTypes, DetailDonationDataProps  } from "@/types/detail"
import CardList from "@/components/CardLise";
import Button from "@/components/Button";
import Category from '@/api/main/Category.json';  
import Sort1 from "@/api/main/Sort1.json"
import Sort2 from "@/api/main/Sort2.json"   

const MainPage = () =>  {
    // Swiper Slide 더미
    const SlideList = useMemo(() => {
        return [
            {
                id: 0,
                img: '/images/slideBanner1.png'
            },
            {
                id: 1,
                img: '/images/slideBanner2.png'
            },
            {
                id: 2,
                img: '/images/slideBanner3.png'
            },
            {
                id: 3,
                img: '/images/slideBanner4.png'
            },
            {
                id: 4,
                img: '/images/slideBanner1.png'
            },
            {
                id: 5,
                img: '/images/slideBanner2.png'
            },
            {
                id: 6,
                img: '/images/slideBanner3.png'
            },
            {
                id: 7,
                img: '/images/slideBanner4.png'
            },
            {
                id: 8,
                img: '/images/slideBanner1.png'
            },
            {
                id: 9,
                img: '/images/slideBanner2.png'
            },
            {
                id: 10,
                img: '/images/slideBanner3.png'
            },
            {
                id: 11,
                img: '/images/slideBanner4.png'
            }
        ]
    }, [])
    // Swiper slide Index
    const [swiperIndex, setSwiperIndex] = useState<number>(1); 
    // Swiper slide progress
    const progressProgress = useRef<HTMLDivElement>(null);
    const onAutoplayTimeLeft =  (s: string, time: number, progress: string)  => {
        progressProgress.current?.style.setProperty('--progress', progress);
    }; 
    const [swiper, setSwiper] = useState<{autoplay : { stop: () => void, start: () => void}}>(); 
    const [pauseNum, setPauseNum] = useState<number>(0); // Swiper button 구분 number 
    const [swiperButton, setSwiperButton] = useState("icon-pause") // Swiper button icon 
    // Swiper 정지 재생 기능
    const handleSlidePause = () => {
        if(pauseNum === 0) {
            setPauseNum(1)
            setSwiperButton("icon-start")
            swiper?.autoplay.stop();
        } else {
            setPauseNum(0)
            setSwiperButton("icon-pause")
            swiper?.autoplay.start();
        }
    }
    // Donation Data
    const [donationQueryData, setDonationQueryData] = useState<DetailDonationDataProps[]>([])
    // new Donation Data
    const [donationData, setDonationData] = useState<DetailDonationDataProps[]>([])
    // D-day 계산 전 기존 데이터 유지
    const [selectDonaionData, setSelectDonaionData] = useState<DetailDonationDataProps[]>([])
    // mySql data load
    const user_id = "test1" // test id
    useEffect(() => {
        axios
        .get(`http://localhost:8081/main/donation?user_id=${user_id}`) 
        .then((res) => {
            // D-day 계산전 기존 데이터 복사
            const originalDonationPeriods = [...res.data.result]
            setSelectDonaionData(originalDonationPeriods)
            // D-day 계산
            const updatedDonationData = res.data.result.map((item: DetailDonationDataProps, index:number) => {
                const targetData = new Date(String(res.data.result[index].donation_period.split('~')[1]));
                const currentDate = new Date();
                const timeDiff = targetData.getTime() - currentDate.getTime();
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                return {
                    ...item, // 기존 항목 복사
                    donation_period: daysRemaining // 기부 기간 업데이트
                };
            });
            setDonationData(updatedDonationData);
            setDonationQueryData(updatedDonationData);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);
    
        // Radio Index
        const [radioActive, setRadioActive] = useState<number>(0);
        // 라디오 카테고리 구분
        const handleRadioChange = useCallback((e:CategoryTypes, i:number) => {
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
        const [limit, setLimit] = useState<number>(12)
        const handleLimitToggle = () => {
            donationData.length > limit && setLimit(limit + 12)
        } 
        const handleSelectEvent = useCallback((e: Option) => {
            // 새 배열에 도네이션 데이터를 추가해야 
            let newArray = [...donationData];
            let updatedDonationData = []
            // 최신 순 배열
            let newArray2 = [...selectDonaionData];
            switch (e.value) {
                case "최신 순":
                    console.log(newArray2)
                    newArray2 = newArray2.sort((a:DetailDonationDataProps, b:DetailDonationDataProps) => {
                        // a와 b의 날짜를 비교하여 정렬 순서를 결정
                        const dateA:Date = new Date(String(a.donation_period).split('~')[0]);
                        const dateB:Date = new Date(String(b.donation_period).split('~')[0]);
                        return Number(dateB) - Number(dateA)
                    });
                    
                    // D-day 계산
                    updatedDonationData = newArray2.map((item: DetailDonationDataProps, index:number) => { 
                        const targetData = new Date(String(newArray2[index].donation_period).split('~')[1]);
                        const currentDate = new Date();
                        const timeDiff = targetData.getTime() - currentDate.getTime();
                        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                        return {
                            ...item, // 기존 항목 복사
                            donation_period: daysRemaining // 기부 기간 업데이트
                        };
                    })
                    setDonationData(updatedDonationData);
                break;
                case "참여금액 순":
                    newArray = newArray.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { return b.donation_goal - a.donation_goal; });
                    setDonationData(newArray);
                break;
                case "참여율 순":
                    newArray = newArray.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { return b.donation_status - a.donation_status; });
                    setDonationData(newArray);
                break;
                case "종료 임박 순":
                    newArray = newArray.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { return Number(a.donation_period) - Number(b.donation_period); });
                    setDonationData(newArray);
                break;
            }
        }, [donationData, selectDonaionData]);
        
        useEffect(() => {
        }, [donationData, donationQueryData, handleSelectEvent])
    return(
        <MainInner>
            <SwiperWrap>
                {
                    SlideList &&
                    <Swiper
                        centeredSlides={true}
                        autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        onSlideChange={(e:{realIndex: number}) => setSwiperIndex(e.realIndex + 1)}
                        onSwiper={(e) => setSwiper(e)}
                        onAutoplayTimeLeft={() => onAutoplayTimeLeft}
                        className="mySwiper"
                    >
                            {
                                SlideList.map((item) => {
                                    return (
                                        <SwiperSlide key={item.id}><img src={item.img} alt="배너" />{String(swiperIndex).padStart(2, "0")}</SwiperSlide>
                                    )
                                })
                            }  
                        <div className="autoplay-progress" slot="container-end">
                            <span className="autoplay-progress-num left">{String(swiperIndex).padStart(2, "0")}</span>
                            <div className="autoplay-progress-bar">
                                <div ref={progressProgress} />
                            </div>
                            <span className="autoplay-progress-num right">{String(SlideList.length).padStart(2, "0")}</span>
                            <button onClick={handleSlidePause}><i className={swiperButton}/></button>
                        </div>
                    </Swiper>
                }
            </SwiperWrap>
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
                    onChange={(e) => handleSelectEvent(e as Option)}
                />
            </SelectWrap>
            <RadioWrap>
                <form>
                {
                    Category.map((item: CategoryTypes, index:number) => {
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
                        key={item.donation_no}
                        to={`/detail/${item.donation_no}`}
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
            {
                limit <= donationData.length ?
                    <ButtonWrap>
                        <Button border="#ddd" size="medium" onClick={handleLimitToggle}>
                            더보기
                        </Button>
                    </ButtonWrap>
                    : null
            }
        </MainInner>
    )
}
export default MainPage 
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

const MainInner = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding-top: 147px;
    @media ${media.mobile}{
        padding-top: 112px;
    }
`
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
            &-bar{
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 70px;
                height:2px;
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
                i{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
                .icon {
                    &-pause {
                        background: url('/images/icon-pause.svg') no-repeat center/ contain;
                    }
                    &-start {
                        background: url('/images/icon-start.svg') no-repeat center/ contain;
                    }
                }
            }
          }
        }
        @media ${media.tablet}{  
          height: 307px;
          .swiper-slide {
              height: 307px;
              img {
                  width: 100%;
                  height: 100%;
              }
          }
      }
      @media ${media.mobile}{  
          height: 150px;
          .swiper-slide {
              height: 150px;
              img {
                  width: 100%;
                  height: 100%;
              }
          }
      }
`
const SelectWrap = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
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
const ButtonWrap = styled.div`
    margin-top:24px;
`