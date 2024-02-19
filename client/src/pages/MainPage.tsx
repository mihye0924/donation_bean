import Radio from "@/components/Radio"
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
        value: 'option3',
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

const MainPage = () =>  {
    return(
        <>
            {/* 슬라이드 확정시 변경 */}
            <SlideList>
                <div>

                </div>
            </SlideList>
            <RadioWrap>
                <form>
                {
                        RadioList.map((item) => {
                            return (
                                <Radio 
                                    key={item.keyId}
                                    label={item.label}
                                    id={item.id} 
                                    value={item.value} 
                                    imgUrl={item.imgUrl} 
                                    name="기부리스트" 
                                />
                            )
                        })
                    } 
                </form>
            </RadioWrap>
        </>
    )
}
export default MainPage 

const SlideList = styled.div`
    max-width: 1140px;
    width: 100%;
    height: 500px;
    margin: 0 auto;
    background-color: #ddd;
`

const RadioWrap = styled.div`
    max-width: 1140px;
    width: 100%;
    height: 500px;
    margin: 60px auto 0;
    form {
        display: flex;
        gap: 8px;
    }
`