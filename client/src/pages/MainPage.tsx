import CardList from "@/components/CardLise"
import Radio from "@/components/Radio"
import Select from "@/components/Select"
import { useRef, useState } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
// Radio
const RadioList = [
    {   
        label: '전체1',
        id: 'option1',
        value: 'option1',
        imgUrl: 'img'
    },
    {
        label: '전체1',
        id: 'option2',
        value: 'option2',
        imgUrl: 'img'
    },
    {
        label: '전체1',
        id: 'option3',
        value: 'option3',
        imgUrl: 'img'
    },
    {
        label: '전체1',
        id: 'option4',
        value: 'option4',
        imgUrl: 'img'
    },
    {
        label: '전체1',
        id: 'option5',
        value: 'option5',
        imgUrl: 'img'
    }
]
// Card
const CardItemList = [
    {
        id: 0,
        to:"/",
        imgSrc:"./", 
        imgUrl:"./" ,
        title:"sdadasdasd\nasdsa",
        agency:"sadsads",
        day:1231,
        price:2313,
        percentage: 50
    },
    {
        id: 1,
        to:"/",
        imgSrc:"./", 
        imgUrl:"./" ,
        title:"sdadasdasd\nasdsa",
        agency:"sadsads",
        day:1231,
        price:2313,
        percentage: 50
    },
    {
        id: 2,
        to:"/",
        imgSrc:"./", 
        imgUrl:"./" ,
        title:"sdadasdasd\nasdsa",
        agency:"sadsads",
        day:1231,
        price:2313,
        percentage: 50
    },
    {
        id: 3,
        to:"/",
        imgSrc:"./", 
        imgUrl:"./" ,
        title:"sdadasdasd\nasdsa",
        agency:"sadsads",
        day:1231,
        price:2313,
        percentage: 50
    },
    {
        id: 4,
        to:"/",
        imgSrc:"./", 
        imgUrl:"./" ,
        title:"sdadasdasd\nasdsa",
        agency:"sadsads",
        day:1231,
        price:2313,
        percentage: 50
    },
    {
        id: 5,
        to:"/",
        imgSrc:"./", 
        imgUrl:"./" ,
        title:"sdadasdasd\nasdsa",
        agency:"sadsads",
        day:1231,
        price:2313,
        percentage: 50
    },
    {
        id: 6,
        to:"/",
        imgSrc:"./", 
        imgUrl:"./" ,
        title:"sdadasdasd\nasdsa",
        agency:"sadsads",
        day:1231,
        price:2313,
        percentage: 50
    }
]
// Select
const selectOptions = [
    {
        value: "123",
        label: "123"
    },
    {
        value: "12",
        label: "13"
    }
]

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
    const [radioActive, setRadioActive] = useState<number>();
    // Swiper slide Index
    const [swiperIndex, setSwiperIndex] = useState<number>(1); 
    // Swiper slide progress
    const progressProgress = useRef<any>(null);
    const onAutoplayTimeLeft = (s:any, time:any, progress:any) => {
        progressProgress.current.style.setProperty('--progress', progress);
    };
    // slide Pause
    const [swiperPause, setSwiperPause] = useState<any>(); 
    const [pauseNum, setPauseNum] = useState<number>(0); 
    const [swiperButton, setSwiperButton] = useState("icon-pause")
    const handleSlidePause = () => {
        if(pauseNum === 0) {
            setPauseNum(1)
            setSwiperButton("icon-start")
            swiperPause.autoplay.stop();
        } else {
            setPauseNum(0)
            setSwiperButton("icon-pause")
            swiperPause.autoplay.start();
        }
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
                    onSlideChange={(e:any) => setSwiperIndex(e.realIndex + 1)}
                    onSwiper={(e:any) => setSwiperPause(e)}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
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
                    selectOptions={selectOptions}
                    size={300}
                    onChange={(e) => console.log(e)}
                />
                <Select 
                    selectOptions={selectOptions}
                    size={300}
                    onChange={(e) => console.log(e)}
                />
            </SelectWrap>
            <RadioWrap>
                <form>
                {
                        RadioList.map((item, index) => {
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
                                    onChange={() => setRadioActive(index)}
                                />
                            )
                        })
                    } 
                </form>
            </RadioWrap>
            <CardWrap>
                {
                    CardItemList.map((item) => {
                        return (
                            <CardList 
                                key={item.id}
                                to={item.to}
                                imgSrc={item.imgSrc} 
                                imgUrl={item.imgUrl} 
                                title={item.title}
                                agency={item.agency}
                                day={item.day}
                                price={item.price}
                                percentage={item.percentage}
                            />
                        )
                    })
                }
            </CardWrap>
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
        @media ${media.tablet}{  
            .swiper-slide {
                height: 307px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        @media ${media.mobile}{  
            .swiper-slide {
                height: 150px;
                img {
                    width: 100%;
                    height: 100%;
                }
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
`
const SelectWrap = styled.div`

`

const RadioWrap = styled.div`
    margin: 60px auto 20px;
    radio.active {
        border-color: blue;
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
        flex: 0 1 calc((100% / 4) - 20px)
    }
`
