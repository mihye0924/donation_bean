import Accordion, { AccordionProps } from "@/components/Accordion" 
import Button from "@/components/Button"
import CheckBox, { CheckboxProps } from "@/components/CheckBox"
import Radio from "@/components/Radio"
import Title from "@/components/Title"
import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import agreeTerms from "@/api/AgreeTerms.json"
import Progressbar from "@/components/Progressbar" 
import Select from "@/components/Select" 


const StepList = [
    {
        id: 0,
        title: "후원내용",
        content: '1월 29일 제주돌고래 긴급구조단이 종달이 꼬리에 걸린 낚싯줄 제거에 성공했습니다. 아직 종달이 몸과 입에 제거하지 못한 낚싯줄이 남아 있습니다',
        type: "custom",
        percent: 4,
        period: '2024.02.14 ~ 2024.04.30',
        dday: 'D-75',
        current: '398,000',
        amount: '9,000,000',
        active: false, 
        icon: false,
        disabled: false,
    },
    {
        id: 1,
        title: "STEP1. 후원분야 선택",
        active: true,
        disabled: false,
        icon: true
    },
    {
        id: 2,
        title: "STEP2. 후원자 정보",
        active: false,
        disabled: true,
        icon: true
    },
    {
        id: 3,
        title: "STEP3. 후원금 납입",
        active: false,
        disabled: true,
        icon: true
    },
    {
        id: 4,
        title: "STEP4. 신청완료",
        active: false,
        disabled: true,
        icon: true
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
const AgreeList = [
    {
        id: 0,
        name: "이용약관",
        htmlId: "all-agree",
        type: "round",
        value: 0,
        label: "(필수) 기부콩 이용약관에 동의합니다.",
        checked: false
    },
    {
        id: 1,
        name: "마케팅동의",
        htmlId: "marketing_agree",
        type: "round",
        value: 1,
        label: "(선택) 기부콩 마케팅 알림 수신에 동의합니다.",
        checked: false
    }
]
const CardOptions1 = [
    {
        value: "0",
        label: "선택"
    },
    {
        value: "1",
        label: "BC카드"
    },
    {
        value: "2",
        label: "신한카드"
    },
    {
        value: "3",
        label: "KB국민카드"
    },
    {
        value: "4",
        label: "KEB하나카드"
    },
    {
        value: "5",
        label: "현대카드"
    },
    {
        value: "6",
        label: "롯데카드"
    },
    {
        value: "7",
        label: "NH카드"
    },
    {
        value: "8",
        label: "삼성카드"
    },
    {
        value: "9",
        label: "카카오카드"
    },
    {
        value: "10",
        label: "한미카드"
    },
    {
        value: "11",
        label: "수협카드"
    },
    {
        value: "12",
        label: "우리카드"
    },
    {
        value: "13",
        label: "제주카드"
    },
    {
        value: "14",
        label: "광주카드"
    },
    {
        value: "14",
        label: "전북카드"
    }
]
const CardOptions2 = [
    {
        value: "0",
        label: "월 선택"
    },
    {
        value: "1",
        label: "1월"
    },
    {
        value: "2",
        label: "2월"
    },
    {
        value: "3",
        label: "3월"
    },
    {
        value: "4",
        label: "4월"
    },
    {
        value: "5",
        label: "5월"
    },
    {
        value: "6",
        label: "6월"
    },
    {
        value: "7",
        label: "7월"
    },
    {
        value: "8",
        label: "8월"
    },
    {
        value: "9",
        label: "9월"
    },
    {
        value: "10",
        label: "10월"
    },
    {
        value: "11",
        label: "11월"
    },
    {
        value: "12",
        label: "12월"
    }
] 
const CardOptions3 = [
    {
        value: "0",
        label: "연도 선택"
    },
    {
        value: "1",
        label: "2024년도"
    },
    {
        value: "2",
        label: "2025년도"
    },
    {
        value: "3",
        label: "2026년도"
    },
    {
        value: "4",
        label: "2027년도"
    },
    {
        value: "5",
        label: "2028년도"
    },
    {
        value: "6",
        label: "2029년도"
    },
    {
        value: "7",
        label: "2030년도"
    },
    {
        value: "8",
        label: "2031년도"
    },
    {
        value: "9",
        label: "2032년도"
    },
    {
        value: "10",
        label: "2033년도"
    },
    {
        value: "11",
        label: "2034년도"
    }
] 
const AccountOptions = [
    {
        value: "0",
        label: "선택"
    },
    {
        value: "1",
        label: "산업은행"
    },
    {
        value: "2",
        label: "기업은행"
    },
    {
        value: "2",
        label: "KB국민은행"
    },
    {
        value: "3",
        label: "수협"
    },
    {
        value: "4",
        label: "NH농협은행"
    },
    {
        value: "5",
        label: "지역(단위)농협"
    },
    {
        value: "6",
        label: "우리은행"
    },
    {
        value: "7",
        label: "스탠다드차타드은행"
    },
    {
        value: "8",
        label: "KEB하나은행"
    },
    {
        value: "9",
        label: "신한은행"
    },
    {
        value: "10",
        label: "한국씨티은행"
    },
    {
        value: "11",
        label: "대구은행"
    },
    {
        value: "12",
        label: "부산은행"
    },
    {
        value: "13",
        label: "광주은행"
    },
    {
        value: "14",
        label: "제주은행"
    },
    {
        value: "15",
        label: "전북은행"
    },
    {
        value: "16",
        label: "경남은행"
    },
    {
        value: "17",
        label: "새매을금고"
    },
    {
        value: "18",
        label: "신협"
    },
    {
        value: "19",
        label: "케이뱅크"
    },
    {
        value: "20",
        label: "카카오뱅크"
    },
]
const DetailPage = () =>  {   
    const [radioActive1, setRadioActive1] = useState<number>(1);  //후원방식
    const [radioActive2, setRadioActive2] = useState<number>(1);  //결제수단
    const [radioActive3, setRadioActive3] = useState<number>(1);  //카드구분
    const [radioActive4, setRadioActive4] = useState<number>(1);  //이체일
    const [price, setPrice] = useState('20,000') 
    const [secondaryDate, setSecondaryDate] = useState<string>()
    const [list, setList] = useState<AccordionProps[]>([])  
    const [agreeList, setAgreeList] = useState<CheckboxProps[]>([])
    const [allAgree, setAllAgree] = useState<boolean>(false) 

    // 둘째주 월요일 찾기
    function executeOnSecondMonday() {
        const today = new Date(); 
        const year = today.getFullYear(); //년
        const month = today.getMonth() + 2; //월
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const date = firstDayOfMonth.getDate() + (8 - firstDayOfMonth.getDay() + 7) //둘째주 일 
        setSecondaryDate(`${year}.${month <10 ? "0"+month: month}.${date}`)
    }

    // 다음
    const handleNext = useCallback((index: number) => {    
        const content = document.querySelector(`section > div:nth-child(${index + 1})`);  
        const location = (content as HTMLElement).offsetTop 
        StepList.map((item) => {
            item.id === index ? item.disabled = false : false;
            item.id === index ? item.active = true : false;
        })
        setList([...list])    
        setTimeout(() => {
            window.scrollTo({top:location, behavior:'smooth'}); 
        }, 100);
    },[list]);

    // 이전
    const handlePrev = useCallback((index: number) => {    
        const content = document.querySelector(`section > div:nth-child(${index - 1})`);  
        const location = (content as HTMLElement).offsetTop 
        StepList.map((item) => {
            item.id === index ? item.disabled = false : false;
            item.id === index ? item.active = true : false;
        })
        setList([...list])    
        setTimeout(() => {
            window.scrollTo({top:location, behavior:'smooth'}); 
        }, 100);
    },[list]);

    // 약관동의-모두동의
    const handleAllAgree = useCallback(() => {
        setAllAgree(!allAgree)
        for(let i = 0; i<agreeList.length; i++) {
            agreeList[i].checked = !allAgree
        } 
    },[agreeList, allAgree])

    // 약관동의-필수,선택
    const handleCheckBoxChange = useCallback((item: CheckboxProps) => {
        let count:number = 0  
        item.checked = !item.checked;
        setAgreeList([...agreeList]); 
        
        agreeList.forEach((item) => { 
            if(item.checked) {
                count++
            } 
             
            count < 2 ? setAllAgree(false) : setAllAgree(true)
        })
    },[agreeList])

    useEffect(() => {
    executeOnSecondMonday() 
    setList(StepList)
    setAgreeList(AgreeList)
    },[list, agreeList])
      
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
                            list.map((item)=> {
                                return(
                                    <Accordion   
                                        key={item.id}
                                        title={item.title}
                                        type={item.type} 
                                        active={item.active}
                                        icon={item.icon}
                                        onClick={() => {    
                                             item.active = !item.active;
                                             setList([...list])
                                        }}
                                        disabled={item.disabled}  
                                    >
                                    {(() => {
                                    switch (item.id) {
                                    case 0:
                                        return <Flex>
                                            <div>
                                                <AccordionBody2>
                                                    <Percent>{item.percent}%</Percent>
                                                    <Progressbar
                                                        percentage={Number(item.percent)}
                                                     />
                                                    <DonationPeriod>{item.period} 까지</DonationPeriod>
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
                                        <Title bottomBorder title="기부금액">
                                            <>
                                                <InputBox alignitem="center"><input type="text" value={price} onChange={() => setPrice(price)}/>원</InputBox>
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
                                        {
                                            radioActive1 === 2 &&
                                            <PaymentDateBox>
                                                <Title flex={"1 0 70%"} title="정부기부 기간" bottomBorder>
                                                    <p className="date">{StepList[0].period}</p>
                                                </Title>
                                                <Title flex={"1 0 70%"} title="다음 결제일" bottomBorder>
                                                    <p className="date">
                                                        <span>{secondaryDate}</span>
                                                        <span>(다음달 둘째주 월요일)</span>
                                                    </p>
                                                </Title>
                                            </PaymentDateBox>
                                        }
                                        <ButtonBox>
                                            <Button bg="#f56400" color="#fff" onClick={() => handleNext(Number(item.id) + 1)}>다음</Button>
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
                                                    value={0}
                                                    htmlId="all_agree"
                                                    checked={allAgree}
                                                    name="모두동의"
                                                    label="이용약관, 마케팅 알림 수신에 모두 동의합니다"
                                                    onChange={handleAllAgree} 
                                                />
                                                {
                                                    agreeList.map((item) => {
                                                        return( 
                                                        <CheckBox 
                                                            key={item.id}
                                                            type={item.type} 
                                                            value={item.value} 
                                                            htmlId={item.htmlId}
                                                            checked={item.checked}
                                                            name={item.name}
                                                            label={item.label}
                                                            onChange={() => handleCheckBoxChange(item)} 
                                                        />
                                                        )
                                                    })
                                                }
                                                <TermsList>
                                                    <li>기부콩에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화(네이버 앱 알림 또는 문자), 이메일로 받아보실 수 있습니다.</li>
                                                </TermsList>
                                                <Terms>
                                                    {agreeTerms.terms}
                                                </Terms>
                                            </TermsWrap>
                                            <ButtonBox>
                                                <Button bg="#fff" color="#f56400" border="#f56400" onClick={() => handlePrev(Number(item.id) + 1)}>이전</Button>
                                                <Button bg="#f56400" color="#fff" onClick={() => handleNext(Number(item.id)+ 1)}>다음</Button>
                                            </ButtonBox>

                                        </>  
                                    case 3:
                                        return<>
                                        <Title flex={"1 0 70%"} bottomBorder title="결제수단"> 
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
                                        <Title flex={"1 0 70%"} bottomBorder title={`${radioActive2 === 1 ?"카드" : "계좌"}구분`}> 
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
                                        {
                                            radioActive2 === 1 ?
                                            <> 
                                            <Title flex={1} bottomBorder title="카드주명"> 
                                                <InputBox><input type="text" placeholder="" value="" onChange={() => console.log('테스트')}/></InputBox>
                                            </Title>
                                            {
                                                radioActive3 === 1 ?
                                                
                                            <Title bottomBorder flex={1} title="생년월일">
                                                <InputBox><input type="text" placeholder="YYMMDD" value="" onChange={() => console.log('테스트')}/></InputBox>
                                            </Title>
                                            :
                                            
                                            <Title flex={"1 0 70%"} bottomBorder title="사업자등록번호">
                                                <InputBox flexdirection="column">
                                                    <div className="account">
                                                        <input type="text" placeholder="'-'제외하고 입력" value="" onChange={() => console.log('테스트')}/>
                                                        <Button bg="#fff" color="#f56400" border="#f56400" width="160">사업자번호확인</Button>
                                                    </div> 
                                                </InputBox>
                                            </Title>
                                            }
                                            <Title flex={"1 0 70%"} bottomBorder title="카드사/유효기간"> 
                                                <SelectWrap>
                                                    <Select
                                                        selectOptions={CardOptions1} 
                                                    />
                                                    <Select
                                                        selectOptions={CardOptions2} 
                                                    />
                                                    <Select
                                                        selectOptions={CardOptions3} 
                                                    />
                                                </SelectWrap>
                                            </Title>
                                            <Title flex={"1 0 70%"} bottomBorder title="카드번호"> 
                                                <CardBox>
                                                    <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                                    <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                                    <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                                    <InputBox><input type="text" placeholder="0000" value=""  onChange={() => console.log('테스트')}/></InputBox>
                                                </CardBox>
                                            </Title> 
                                            </>
                                            :
                                            <>
                                            <Title flex={1} bottomBorder title="예금주명"> 
                                                <InputBox><input type="text" placeholder="" value="" onChange={() => console.log('테스트')}/></InputBox>
                                            </Title>
                                            {
                                                radioActive3 === 1 ?
                                                
                                            <Title bottomBorder flex={1} title="생년월일">
                                                <InputBox><input type="text" placeholder="YYMMDD" value="" onChange={() => console.log('테스트')}/></InputBox>
                                            </Title>
                                            :
                                            
                                            <Title flex={"1 0 70%"} bottomBorder title="사업자등록번호">
                                                <InputBox flexdirection="column">
                                                    <div className="account">
                                                        <input type="text" placeholder="'-'제외하고 입력" value="" onChange={() => console.log('테스트')}/>
                                                        <Button bg="#fff" color="#f56400" border="#f56400" width="160">사업자번호확인</Button>
                                                    </div> 
                                                </InputBox>
                                            </Title>
                                            }
                                            <Title flex={"1 0 70%"} bottomBorder title="은행명">
                                                <SelectWrap>
                                                    <Select
                                                        selectOptions={AccountOptions} 
                                                    />  
                                                </SelectWrap>
                                            </Title>
                                            <Title flex={"1 0 70%"} bottomBorder title="계좌번호"> 
                                                <InputBox flexdirection="column">
                                                    <div className="account">
                                                        <input type="text" placeholder="'-'제외하고 입력" value="" onChange={() => console.log('테스트')}/>
                                                        <Button bg="#fff" color="#f56400" border="#f56400" width="160">계좌인증</Button>
                                                    </div>
                                                    <span> - 휴대전화번호 계좌번호는 사용하실 수 없습니다.</span>
                                                </InputBox>
                                            </Title> 
                                            <Title flex={"1 0 70%"} bottomBorder title="이체일"> 
                                            <RadioWrap>
                                                <Radio
                                                    className={radioActive4 === 1 ? "active" : ""}
                                                    type="round" 
                                                    label="매월15일"
                                                    id="fifthenfive"
                                                    value="1"
                                                    name="Transfer_date"   
                                                    onChange={() => setRadioActive4(1)}
                                                />
                                                <Radio
                                                    className={radioActive4 === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="매월25일"
                                                    id="twentyfive"
                                                    value="2" 
                                                    name="Transfer_date"     
                                                    onChange={() => setRadioActive4(2)}
                                                />
                                            </RadioWrap>
                                        </Title>
                                            </>
                                            }
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
const InputBox = styled.div<{flexdirection?: string; alignitem?: string}>`
    display: flex; 
    width: inherit;
    position: relative;
    align-items: ${(props) => props.alignitem}; 
    flex-direction: ${(props) => props.flexdirection}; 
    gap: 10px;
    input { 
        width: 100%; 
        height: 45px;
        line-height: 1;
        padding:10px; 
        font-size: 16px;
        border-bottom: 1px solid #f1f1f1;
        &:focus {
            outline:0;
            border-bottom: 1px solid #f56400;
        }
    }  
    .account {
        display: flex; 
        gap: 10px;
    } 
    span { 
        color: #a1a1a1;
    }
    @media ${media.tablet}{  
        button {
            font-size: 14px;
        } 
        input { 
            font-size: 12px;
        }
        span {
            font-size:12px;
        }
    }
`   

// 후원분야
const Percent = styled.div` 
    font-family: 'NanumSquareNeo-Variable';
    font-weight: 900;
    color:#00ab33;
    margin-bottom: 15px;
    font-size: 32px;
    @media ${media.tablet}{   
        font-size: 24px;
    }
`               
const DonationPeriod = styled.div` 
    font-size: 16px;
    white-space: pre;
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
    margin-top: 30px;
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
    white-space: pre;
`  

// 후원납입
const CardBox = styled.div`
    display: flex;
    input {
        margin-right: 30px;
        text-align: center;
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
            top:50%;
            transform: translateY(-50%);
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
const PaymentDateBox = styled.div`
    .date {
        font-size: 18px;
        white-space: pre; 
        span {
            font-size: 18px;
            font-family: inherit;
            font-weight: 900;
            display: inline-block;
            &:last-child {
                font-weight: normal;
                margin-left: 10px;
            }
        }
        @media ${media.tablet}{   
            font-size: 12px;
            span {
                font-size: 12px; 
            }
        }
    }
`
const SelectWrap = styled.div`
    display: flex;
    gap:10px;
`

// 후원자 정보
const TermsWrap = styled.div`
    margin: 20px 0;
`
const Terms = styled.div`
 white-space: pre-wrap;
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