import CardList from "@/components/CardLise"
import Radio from "@/components/Radio"
import Select from "@/components/Select"
import { useState } from "react"
import styled from "styled-components"

const RadioList = [
    {   
        keyId: 0,
        label: '전체1',
        id: 'option1',
        value: 'option1',
        imgUrl: 'img'
    },
    {
        keyId: 1,
        label: '전체1',
        id: 'option2',
        value: 'option2',
        imgUrl: 'img'
    },
    {
        keyId: 2,
        label: '전체1',
        id: 'option3',
        value: 'option3',
        imgUrl: 'img'
    },
    {
        keyId: 3,
        label: '전체1',
        id: 'option4',
        value: 'option4',
        imgUrl: 'img'
    },
    {
        keyId: 4,
        label: '전체1',
        id: 'option5',
        value: 'option5',
        imgUrl: 'img'
    }
]
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
        id: 0,
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
const MainPage = () =>  {
    const [radioActive, setRadioActive] = useState<number>();
    return(
        <MainInner>
            {/* 슬라이드 확정시 변경 */}
            <SlideList>
                <div>

                </div>
            </SlideList>
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
                                    className={radioActive === index ? "active" : ""}
                                    key={item.keyId}
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

const MainInner = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
`
const SlideList = styled.div`
    height: 500px;
    background-color: #ddd;
`
const SelectWrap = styled.div`
    background-color: #ddd;
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
