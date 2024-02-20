import Accordion from "@/components/Accordion" 
import Button from "@/components/Button"
import Radio from "@/components/Radio"
import Title from "@/components/Title"
import { useState } from "react"
import styled from "styled-components"

const StepList = [
    {
        id: 0,
        title: "후원내용",
        content: '1월 29일 제주돌고래 긴급구조단이 종달이 꼬리에 걸린 낚싯줄 제거에 성공했습니다. 아직 종달이 몸과 입에 제거하지 못한 낚싯줄이 남아 있습니다',
        active: false,
        type: "custom",
        percent: '4%',
        period: '2024.02.14 ~ 2024.04.30까지',
        dday: 'D-75',
        current: '398,000',
        amount: '9,000,000'
    },
    {
        id: 1,
        title: "STEP1. 후원분야 선택",
        active: false
    },
    {
        id: 2,
        title: "STEP2. 후원자 정보",
        active: false
    },
    {
        id: 3,
        title: "STEP3. 후원금 납입",
        active: false
    },
    {
        id: 4,
        title: "STEP4. 신청완료",
        active: false
    }
]
const DetailPage = () =>  {
    const [active, setActive] = useState(0)
    const [toggle, setToggle] = useState(false)  
    const [radioActive, setRadioActive] = useState<number>(1);  
    const [price, setPrice] = useState('20,000')
    return(
        <Article>
            <ArticleInner image={'image01.jpg'}>
                <ContentWrap> 
                    <aside>
                        <h1>후원신청</h1>
                        <p>낚싯줄에 걸린 돌고래 '종달이'를 구해주세요</p>
                    </aside>
                    <section>
                        {
                            StepList.map((item)=> {
                                return(
                                    <Accordion   
                                        key={item.id}
                                        title={item.title}
                                        type={item.type}
                                        active={
                                            item.id === 0 ? true : false || 
                                            toggle && item.id === active || item.active ? true : false
                                            }
                                        toggle={item.id !== 0 ? true : false}
                                        onClick={() => {
                                            setActive(item.id),
                                            setToggle(item.active = !item.active)  
                                        }}
                                    >
                                    {(() => {
                                    switch (item.id) {
                                    case 0:
                                        return <Flex>
                                            <div>
                                                <AccordionBody2>
                                                    <Percent>{item.percent}</Percent>
                                                    {/* <PrograssBar /> */}
                                                    <DonationPeriod>{item.period}</DonationPeriod>
                                                    <DonationDDay>{item.dday}</DonationDDay>
                                                    <DonationCurrent>{item.current}<span>원</span></DonationCurrent>
                                                    <DonationAmout>목표 금액: <span>{item.amount}</span></DonationAmout>
                                                </AccordionBody2>
                                            </div>
                                            <div>
                                                { 
                                                <AccordionHeader> 
                                                    <h1>{item.title}</h1>
                                                </AccordionHeader>
                                                }
                                                <AccordionBody>  
                                                    {item.content}
                                                </AccordionBody>
                                            </div>
                                        </Flex>
                                    case 1:
                                        return <>
                                        <Title bottomBorder title="후원방식"> 
                                            <>
                                                <Radio
                                                    className={radioActive === 1 ? "active" : ""}
                                                    type="round" 
                                                    label="일시후원"
                                                    id="temporary"
                                                    value="1"
                                                    name="donation_method"   
                                                    onChange={() => setRadioActive(1)}
                                                />
                                                <Radio
                                                    className={radioActive === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="정기후원"
                                                    id="regular"
                                                    value="2" 
                                                    name="donation_method"     
                                                    onChange={() => setRadioActive(2)}
                                                />
                                            </>
                                        </Title>
                                        <Title bottomBorder title="기부금액">
                                            <>
                                                <InputBox><input type="text"  value={price}/>원</InputBox>
                                                <ButtonBox>
                                                    <Button 
                                                        bg="black"
                                                        color="#fff"
                                                        onClick={() => setPrice('20,000')}
                                                    >
                                                        2만원
                                                    </Button>
                                                    <Button 
                                                        bg="black"
                                                        color="#fff"
                                                        onClick={() => setPrice('30,000')}
                                                    >
                                                        3만원
                                                    </Button>
                                                    <Button 
                                                        bg="black"
                                                        color="#fff"
                                                        onClick={() => setPrice('50,000')}
                                                    >
                                                        5만원
                                                    </Button>
                                                    
                                                </ButtonBox>
                                            </> 
                                        </Title>
                                        <NextBox>
                                            <Button bg="#f56400" color="#fff">다음</Button>
                                        </NextBox>
                                        </>  
                                    case 2:
                                        return<>후원자정보</>  
                                    case 3:
                                        return<>후원금납입</>  
                                    case 4:
                                        return<>친청완료</>  
                                    default:
                                        return null;
                                    }
                                })()}

                                    </Accordion> 
                                )
                            })
                        }
                       
                    </section>
                </ContentWrap>
            </ArticleInner>  
        </Article>
    )
}
export default DetailPage
const sizes = {
    desktop: "1200px",
    tablet: "768px",
    mobile: "375px"
}; 
// 미디어 쿼리를 위한 도우미 함수
const media = {
desktop: `(max-width: ${sizes.desktop})`,
tablet: `(max-width: ${sizes.tablet})`,
mobile: `(max-width: ${sizes.mobile})`,
}; 

const Article = styled.article`
    position: relative;   
    margin-top: 145px;  
    @media ${media.mobile}{  
        margin-top: 110px;
    }
` 
const ArticleInner = styled.div<{image?:string}>`
    position: relative;
    height: 100%;  
    background: url(${(props) => `${import.meta.env.VITE_SERVER_URL}`+'/uploads/donation/'+props.image}) no-repeat top center;
    background-size: 100% 100%;
    background-attachment: fixed;
    @media ${media.mobile}{  
        background-size: 100% 300px;
        background-attachment: initial;
    }
`
const ContentWrap = styled.div` 
    max-width:${sizes.desktop};
    width: 100%; 
    height: auto; 
    display: flex;
    flex-wrap: wrap;
    gap: 50px; 
    margin: 0 auto;
    padding: 50px 10px;
    aside {
        flex: 1 0 20%;
        /* border: 1px solid red; */
        h1 {
            font-family: 'NanumSquareNeo-Variable';
            font-size: 32px;
            color: #fff;
        }
        p {
            font-size: 18px;
            color: #fff;
            line-height: 1.5;
            margin-top: 20px;

        }
    }
    section {
        flex: 1 0 70%;
        /* border: 1px solid red; */
        >div { 
            &:not(:first-child) {
                border: 1px solid #f1f1f1;
                margin-top: 20px;
                border-radius: 15px;
            }
        }
    }
    @media ${media.mobile}{  
        gap: 0;
        flex-direction: column; 
        section {
            margin-top: 100px;
            >div {
                border: 1px solid #f1f1f1;
                border-radius: 15px;
            }
        }
        aside { 
            flex-basis: 195px;
            justify-content: center;
            display: inline-flex;
            flex-direction: column;
            h1 {
                font-size: 24px;
            }
            p {
                font-size: 16px;
            }
        }
    }
` 
 
const AccordionHeader =  styled.div`
  background-color: #fff;
  width: 100%; 
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 15px 15px 0 0;
  h1 {
    font-family: 'NanumSquareNeo-Variable';
    font-size: 20px;
    font-weight: 700; 
  }
  button {
    background: url('/images/ico-location-arr.svg') no-repeat;
    background-size: 100%;
    width: 25px;
    height: 25px;
    border: 0;
  }
`
const AccordionBody = styled.div`
  background-color: #fff;
  overflow: hidden;
  border-radius: 0 0 15px 15px;
  border-top: 1px solid #f1f1f1;
  height:  auto;
  padding: 20px;
  line-height: 1.5;
  flex: 1; 
`
const AccordionBody2 = styled.div`
    background-color: #fff;
    overflow: hidden;
    border-radius: 15px; 
    border: 1px solid #f1f1f1;
    height:  auto;
    padding: 20px; 
`
const Flex = styled.div`
display: flex;
gap: 10px;
justify-content: space-between;
>div {
    &:first-child{
        display: flex;
        flex: 1 0 30%;
    }
    &:last-child {
        display: flex;
        flex-direction: column;
        border: 1px solid #f1f1f1;
        border-radius: 15px;
    }
}
` 
const Percent = styled.div` 
    font-family: 'NanumSquareNeo-Variable';
    font-weight: 900;
    color:#00ab33;
    font-size: 32px;
`               
const DonationPeriod = styled.div` 
    font-size: 16px;
    color: #999999;
    margin-top: 10px;
`    
const DonationDDay = styled.div` 
    font-family: 'NanumSquareNeo-Variable';
    font-size: 14px;
    color: #fff;
    background-color: #00ab33;
    display: inline-block;
    border-radius: 5px;
    padding: 5px 10px;
    font-weight: 900;
    margin-top: 10px;
`
            
const DonationCurrent = styled.div`
    font-family: 'NanumSquareNeo-Variable';
    font-weight: 900;
    margin-top: 10px;
    font-size: 32px;
    letter-spacing: -1px;
`
const DonationAmout = styled.div`
    font-family: 'NanumSquareNeo-Variable';
    margin-top: 10px;
`
const InputBox = styled.div`
    input {
        padding:10px 0;
        margin-right: 10px;
        border-bottom: 1px solid #f1f1f1;
        &:focus {
            outline:0
        }
    }

`     
const ButtonBox = styled.div`
    margin-top: 20px;
    button:not(:last-child) { 
        margin-right: 5px;
    }
` 
const NextBox = styled.div`
    width: 100%;
    margin-top: 50px;
    text-align: center;
    button {
        width: 200px;
        height: 50px; 
        font-size: 16px;
        border-radius: 0;
    }
`