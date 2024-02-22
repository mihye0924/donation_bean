import CardList from "@/components/CardLise"
import Radio from "@/components/Radio"
import Select from "@/components/Select"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ReactDOMServer from 'react-dom/server';
import 'swiper/css';
import 'swiper/css/pagination';
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
    }
]
const MainPage = () =>  {
    // Radio Index
    const [radioActive, setRadioActive] = useState<number>();
    // Swiper slide 영역
    const [swiperIndex, setSwiperIndex] = useState<number>(0); // -> 페이지네이션용
    const onSwiper = (e:any) => {
        console.log(e)
        setSwiperIndex(e.realIndex + 1);
    }
    const renderProgressbar = (progressbarFillClass:string) => {
        return ReactDOMServer.renderToStaticMarkup(<span className={progressbarFillClass}>{swiperIndex}</span>);
    }
    return(
        <MainInner>
            {/* 슬라이드 확정시 변경 */}{swiperIndex}
            <SwiperWrap>
                <Swiper
                    pagination={{clickable: true, type: 'progressbar', renderProgressbar}}
                    modules={[Pagination]}
                    loop
                    onSlideChange={(e) => onSwiper(e)}
                    className="mySwiper"
                    >
                        {
                            SlideList.map((item) => {
                                return (
                                    <SwiperSlide key={item.id}><img src={item.img} alt="배너" />${swiperIndex}</SwiperSlide>
                                )
                            })
                        }
                    <SwiperSlide><img src="/images/slideBanner1.png" alt="배너"/></SwiperSlide>

                </Swiper>
            </SwiperWrap>
            <SelectWrap>
                <Select 
                    selectOptions={selectOptions}
                    size={300}
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
