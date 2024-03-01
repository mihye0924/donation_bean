// import CardList from "@/components/CardLise"
import Radio from "@/components/Radio"
import Select, { Option } from "@/components/Select"
import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'; 

import { Autoplay, Navigation } from 'swiper/modules'; 
import 'swiper/css';
import axios from "axios"
import { DetailDonationDataProps  } from "@/types/detail"
import CardList from "@/components/CardLise";
import Button from "@/components/Button"; 
import Category from "@/api/main/Category.json"
import Sort1 from "@/api/main/Sort1.json"
import Sort2 from "@/api/main/Sort2.json" 

// Slide
const SlideList = [
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
const MainPage = () =>  {
    // Radio Index
    const [radioActive, setRadioActive] = useState<number>(0);
    // Swiper slide Index
    const [swiperIndex, setSwiperIndex] = useState<number>(1); 
    // Swiper slide progress
    const progressProgress = useRef<HTMLDivElement>(null);
    const onAutoplayTimeLeft = (s: string, time: number, progress: string) => {
    progressProgress.current?.style.setProperty('--progress', progress);
    }; 

    // slide Pause
    const [swiperPause, setSwiperPause] = useState<{autoplay : { stop: () => void, start: () => void}}>(); 
    const [pauseNum, setPauseNum] = useState<number>(0); 
    const [swiperButton, setSwiperButton] = useState("icon-pause")
    const user_id = "test1"
    const handleSlidePause = () => {
        if(pauseNum === 0) {
            setPauseNum(1)
            setSwiperButton("icon-start")
            swiperPause?.autoplay.stop();
        } else {
            setPauseNum(0)
            setSwiperButton("icon-pause")
            swiperPause?.autoplay.start();
        }
    }

    // donations data
    const [donationQueryData, setDonationQueryData] = useState<DetailDonationDataProps[]>([])
    // 라디오 카테고리 구분
    const [donationData, setDonationData] = useState<DetailDonationDataProps[]>([])   

    useEffect(() => {
        axios
        .get(`http://localhost:8081/main/donation?user_id=${user_id}`) 
        .then((res) => {
            res.data.result.forEach((item: DetailDonationDataProps, index:number) => {
                // 날짜 구하기
                const targetData = new Date(String(res.data.result[index].donation_period.split("~ ")[1]))
                const currentDate = new Date();
                const timeDiff = targetData.getTime() - currentDate.getTime();
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                item.donation_period = String(daysRemaining);
                setDonationQueryData(res.data.result)
                setDonationData(res.data.result)
            })
        })
    }, [])

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

    useEffect(() => {

    },[donationData])

    // 카드리스트 limit 증가
    const [limit, setLimit] = useState<number>(12)
    const handleLimitToggle = () => {
        donationData.length > limit && setLimit(limit + 12)
    }
    return(
        <MainInner>
            <SwiperWrap>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    onSlideChange={(e:{realIndex: number}) => setSwiperIndex(e.realIndex + 1)}
                    onSwiper={(e) => setSwiperPause(e)}
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