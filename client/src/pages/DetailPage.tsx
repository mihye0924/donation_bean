import Accordion from "@/components/Accordion" 
import Button from "@/components/Button"
import CheckBox from "@/components/CheckBox"
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

const Info = [
    {
        id: 0,
        title: "회원유형",
        data: "개인"
    },
    {
        id: 1,
        title: "이름",
        data: "조미혜"
    },
    {
        id: 2,
        title: "성별",
        data: "여자"
    },
    {
        id: 3,
        title: "생년월일",
        data: "1997-09-24"
    },
    {
        id: 4,
        title: "이메일",
        data: "chomihye0924@daum.net"
    }
]
const DetailPage = () =>  {
    const [active, setActive] = useState(0)
    const [toggle, setToggle] = useState(false)  
    const [radioActive1, setRadioActive1] = useState<number>(1);  //후원방식
    const [radioActive2, setRadioActive2] = useState<number>(1);  //결제수단
    const [radioActive3, setRadioActive3] = useState<number>(1);  //카드구분
    const [price, setPrice] = useState('20,000')
    const [checkboxActive1, setCheckboxActive1] = useState<boolean>(false);   
    const [checkboxActive2, setCheckboxActive2] = useState<boolean>(false);  
    const [checkboxActive3, setCheckboxActive3] = useState<boolean>(false);  
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
                                            <RadioWrap>
                                                <Radio
                                                    className={radioActive1 === 1 ? "active" : ""}
                                                    type="round" 
                                                    label="일시후원"
                                                    id="temporary"
                                                    value="1"
                                                    name="donation_method"   
                                                    onChange={() => setRadioActive1(1)}
                                                />
                                                <Radio
                                                    className={radioActive1 === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="정기후원"
                                                    id="regular"
                                                    value="2" 
                                                    name="donation_method"     
                                                    onChange={() => setRadioActive1(2)}
                                                />
                                            </RadioWrap>
                                        </Title>
                                        <Title flexdirection="column" bottomBorder title="기부금액">
                                            <>
                                                <InputBox><input type="text" value={price} onChange={() => setPrice(price)}/>원</InputBox>
                                                <AmountButtonBox>
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
                                                    
                                                </AmountButtonBox>
                                            </> 
                                        </Title>
                                        <ButtonBox>
                                            <Button bg="#f56400" color="#fff">다음</Button>
                                        </ButtonBox>
                                        </>  
                                    case 2:
                                        return<>
                                        {
                                            Info.map((item) => {
                                                return(
                                                <Title bottomBorder title={item.title} key={item.id}>
                                                    <span>{item.data}</span>
                                                </Title> 
                                                )
                                            })
                                        } 
                                            <TermsWrap>
                                                <CheckBox 
                                                    type="round"
                                                    className={checkboxActive1 && checkboxActive2 && checkboxActive3 ? "active" : ""}
                                                    value={checkboxActive1 ? "agree" : ""} 
                                                    onChange={() => {
                                                        // setCheckboxActive1(!checkboxActive1)
                                                        // setCheckboxActive2(!checkboxActive2)
                                                        // setCheckboxActive3(!checkboxActive3)
                                                    }} 
                                                    id="all_agree"
                                                    name="모두동의"
                                                    label="이용약관, 마케팅 알림 수신에 모두 동의합니다"
                                                />
                                                <CheckBox 
                                                    type="round"
                                                    className={checkboxActive2 ? "active" : ""}
                                                    value={checkboxActive2 ? "agree" : ""} 
                                                    onChange={() => setCheckboxActive2(!checkboxActive2)}  
                                                    id="agree_term"
                                                    name="이용약관"
                                                    label="(필수) 기부콩 이용약관에 동의합니다."
                                                />
                                                <CheckBox 
                                                    type="round"
                                                    className={checkboxActive3 ? "active" : ""}
                                                    value={checkboxActive3 ? "agree" : ""} 
                                                    onChange={() => setCheckboxActive3(!checkboxActive3)}  
                                                    id="marketing_agree"
                                                    name="마케팅동의"
                                                    label="(선택) 기부콩 마케팅 알림 수신에 동의합니다."
                                                />
                                                <TermsList>
                                                    <li>기부콩에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화(네이버 앱 알림 또는 문자), 이메일로 받아보실 수 있습니다.</li>
                                                </TermsList>
                                                <Terms>
                                                이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관
                                                </Terms>
                                            </TermsWrap>
                                            <ButtonBox>
                                                <Button bg="#fff" color="#f56400" border="#f56400">이전</Button>
                                                <Button bg="#f56400" color="#fff">다음</Button>
                                            </ButtonBox>

                                        </>  
                                    case 3:
                                        return<>
                                        <Title bottomBorder title="결제수단"> 
                                            <RadioWrap>
                                                <Radio
                                                    className={radioActive2 === 1 ? "active" : ""}
                                                    type="round" 
                                                    label="카드"
                                                    id="card"
                                                    value="1"
                                                    name="payment_method"   
                                                    onChange={() => setRadioActive2(1)}
                                                />
                                                <Radio
                                                    className={radioActive2 === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="자동이체"
                                                    id="payment"
                                                    value="2" 
                                                    name="payment_method"     
                                                    onChange={() => setRadioActive2(2)}
                                                />
                                            </RadioWrap>
                                        </Title>
                                        <Title bottomBorder title="카드구분"> 
                                            <RadioWrap>
                                                <Radio
                                                    className={radioActive3 === 1 ? "active" : ""}
                                                    type="round" 
                                                    label="개인"
                                                    id="personal"
                                                    value="1"
                                                    name="payment_option"   
                                                    onChange={() => setRadioActive3(1)}
                                                />
                                                <Radio
                                                    className={radioActive3 === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="법인"
                                                    id="company"
                                                    value="2" 
                                                    name="payment_option"     
                                                    onChange={() => setRadioActive3(2)}
                                                />
                                            </RadioWrap>
                                        </Title>
                                        <Title flex={1} bottomBorder title="카드주명"> 
                                            <InputBox><input type="text" placeholder="" value="" onChange={() => console.log('테스트')}/></InputBox>
                                        </Title>
                                        <Title bottomBorder title="카드사/유효기간"> 
                                        </Title>
                                        <Title bottomBorder title="카드번호"> 
                                            <CardBox>
                                                <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                                <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                                <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                                <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                            </CardBox>
                                        </Title> 
                                        <ButtonBox>
                                            <Button bg="#f56400" color="#fff">후원하기</Button>
                                        </ButtonBox>
                                        </>  
                                    case 4:
                                        return<>
                                        <ImgBox>
                                            <img src="/images/donation-complete.png" alt="후원완료"/>
                                            <p>조미혜 님, 후원신청이 완료되었습니다.</p>
                                            <p>감사합니다.</p>
                                        </ImgBox>
                                        <Table>
                                            <caption>신청내역</caption>
                                            <thead>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">후원방식</th>
                                                    <td>정기후원</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">후원분야</th>
                                                    <td>국내사업후원(30,000원)</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">후원금액</th>
                                                    <td className="orange">30,000원</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">납입방법</th>
                                                    <td>신용카드/매월15일</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">납입정보</th>
                                                    <td>
                                                        <p>KB국민카드 4579443290439****</p>
                                                        <ul>
                                                            <li>이번달 후원금은 신청한 일자에 출금됩니다.</li>
                                                            <li>다음달부터는 매월 15일에 출금되며, 미승인 시 25일에 재출금이 진행됩니다.</li>
                                                        </ul>    
                                                    </td> 
                                                </tr>
                                            </tbody>
                                            <tfoot> 
                                            </tfoot>
                                        </Table>
                                        </>  
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

// 공통
const Article = styled.article`
    position: relative;   
    margin-top: 145px;  
    @media ${media.tablet}{  
        margin-top: 110px;
    }
` 
const ArticleInner = styled.div<{image?:string}>`
    position: relative;
    height: 100%;  
    background: url(${(props) => `${import.meta.env.VITE_SERVER_URL}`+'/uploads/donation/'+props.image}) no-repeat top center;
    background-size: 100% 100%;
    background-attachment: fixed;
    @media ${media.tablet}{  
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
        width: 100%;
        /* border: 1px solid red; */
        >div {  
            &:not(:first-child) {
                border: 1px solid #f1f1f1;
                margin-top: 20px;
                border-radius: 15px;
            }
        }
    }
    @media ${media.tablet}{  
        gap: 0;
        flex-direction: column; 
        section {
            margin-top: 100px; 
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
  @media ${media.tablet}{ 
      h1 { 
        font-size: 16px;
      } 
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
    width: 100%;
    height:  auto;
    padding: 20px; 
`
const Flex = styled.div`
display: flex;
gap: 10px;
justify-content: space-between; 
flex-wrap: wrap;
>div {
    &:first-child{
        display: flex; 
        flex: 1 0 35%;
    }
    &:last-child { 
        display: flex;
        flex: 1 0 60%;
        flex-direction: column;
        border: 1px solid #f1f1f1;
        border-radius: 15px;
    }
}
` 
const RadioWrap = styled.div`
    display: flex;
    &>div:last-child {
        margin-left: 100px;
    } 
    @media ${media.tablet}{  
        flex-direction: column;
        align-items: flex-start;
        &>div:last-child { 
            margin-left: 30px;
       }
    }
`
// 후원분야
const Percent = styled.div` 
    font-family: 'NanumSquareNeo-Variable';
    font-weight: 900;
    color:#00ab33;
    font-size: 32px;
    @media ${media.tablet}{   
        font-size: 24px;
    }
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
    @media ${media.tablet}{   
        font-size: 12px;
    }
`          
const DonationCurrent = styled.div`
    font-family: 'NanumSquareNeo-Variable';
    font-weight: 900;
    margin-top: 10px;
    font-size: 32px;
    letter-spacing: -1px;
    white-space: pre;
    @media ${media.tablet}{   
        font-size: 30px;
    }
`
const DonationAmout = styled.div`
    font-family: 'NanumSquareNeo-Variable';
    margin-top: 10px;
`
const InputBox = styled.div`
    display: flex; 
    width: inherit;
    position: relative;
    input { 
        width: 100%;
        padding:10px;
        margin-right: 10px;
        border-bottom: 1px solid #f1f1f1;
        &:focus {
            outline:0
        }
    } 
`     
const CardBox = styled.div`
    display: flex;
    input {
        margin-right: 30px;
    } 
    & div:last-of-type {
        input {
            margin-right: 0;
        }
    }
    & div:not(:last-child) { 
        &::after {
            position: absolute;
            content:'-'; 
            right: 10px;
            color: #cfcfcf;
        }
    }
    @media ${media.tablet}{  
        input {
            margin-right: 20px;
        } 
        & div:not(:last-child) { 
            &::after { 
                right: 5px; 
            }
        }
    }
`
const AmountButtonBox = styled.div`
    margin-top: 20px;
    button:not(:last-child) { 
        margin-right: 5px;
    }
` 
const ButtonBox = styled.div`
    display: flex;
    gap:10px;
    width: 100%;
    margin-top: 50px;
    text-align: center; 
    justify-content: center;
    button {
        width: 200px;
        height: 50px; 
        font-size: 16px;
        border-radius: 0;
    }
`

// 후원자 정보
const TermsWrap = styled.div`
    margin: 20px 0;
`
const Terms = styled.div`
    margin-top: 20px;
    height: 100px;
    border: 1px solid #f1f1f1;
    overflow-y: auto;
    padding: 10px;
    &::-webkit-scrollbar {
        width: 10px;
        background-color: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        width: 10px;
        background-color: #f56400;
        background-clip: padding-box;
        border: 3px solid transparent;
        border-radius: 10px;
    }
`
const TermsList = styled.ul`
    li {
        position: relative;
        margin-left: 20px;
        font-size: 16px; 
        color: #a1a1a1;
        &::before {
            position: absolute;
            content: '-'; 
            left: -15px;
        }
    }
`
// 후원완료
const ImgBox = styled.div`
    width: 100%; 
    text-align: center;
    /* border: 1px solid #000; */
    img {
        width: 200px;
        height: 200px;
    }
    p {
        font-family: 'NanumSquareNeo-Variable';
        font-size: 20px;

        &:nth-of-type(1) {
            margin-top: 20px;
        }
    }
    @media ${media.tablet}{  
        img {
            width: 150px;
            height: 150px;
        }
        p {
            font-size: 16px;
        }
    }
` 
const Table = styled.table` 
    display: table;
    margin-top: 50px;
    width: 100%;
    caption {
        font-family: 'NanumSquareNeo-Variable';
        text-align:left;
        font-weight: 900;
        font-size: 20px;
        padding-bottom: 10px;
    }
    tbody {
        display: inline-block;
        /* padding: 0 100px; */
        border-top: 2px solid #2d2d2d;
        border-bottom: 1px solid #d5d5d5;
        th {
            color: #7d7d7d;
            font-family: 'NanumSquareNeo-Variable';
            /* font-weight: 900; */
            display: block;
            white-space: pre;
            padding: 15px; 
        }
        td {  
            padding: 15px; 
            ul {
                li {
                    position: relative;
                    margin-left: 20px;
                    &::before {
                        position: absolute;
                        content: '-';
                        left: -20px;
                    }
                }
            }
            &.orange {
                font-weight: 900;
                color: #f56400;
            }
        }
    }
`