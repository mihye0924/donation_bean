import Accordion, { AccordionProps } from "@/components/Accordion" 
import Button from "@/components/Button"
import CheckBox, { CheckboxProps } from "@/components/CheckBox"
import Radio from "@/components/Radio"
import Title from "@/components/Title"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import AgreeTerms from "@/api/detail/AgreeTerms.json"
import Progressbar from "@/components/Progressbar" 
import Select from "@/components/Select" 
import useMutation from "@/hooks/useMutation"
import AccountName from "@/api/detail/AccountName.json"
import CardCompany from "@/api/detail/CardCompany.json"
import CardDay from "@/api/detail/CardDay.json"
import CardYear from "@/api/detail/CardYear.json"
import axios from "axios"
import { DetailDonationDataProps, DetailPaymentAllDataProps, DetailUserDataProps } from "@/types/detail"
import { useLocation } from "react-router-dom"
 
const DetailPage = () =>  {   
    const [radioActive1, setRadioActive1] = useState<number>(1);  //후원방식
    const [radioActive2, setRadioActive2] = useState<number>(1);  //결제수단
    const [radioActive3, setRadioActive3] = useState<number>(1);  //카드구분
    const [radioActive4, setRadioActive4] = useState<number>(1);  //이체일
    const [cardOwner, setCardOwner] = useState<string>("");  //카드 소유자명 
    const [cardNumber1, setCardNumber1] = useState<string>("");  //카드 번호1
    const [cardNumber2, setCardNumber2] = useState<string>("");  //카드 번호2
    const [cardNumber3, setCardNumber3] = useState<string>("");  //카드 번호3
    const [cardNumber4, setCardNumber4] = useState<string>("");  //카드 번호4
    const [accountName, setAccountName] = useState<string>(""); //예금주명 
    const [accountCompany, setAccountCompany] = useState<string>(""); //은행명
    const [accountNumber, setAccountNumber] = useState<string>(""); //계좌번호
    const [companyCode, setCompanyCode] = useState<string>("");  //사업자번호
    const [ownerBirth, setOwnerBrith] = useState<string>("");  //카드 생년월일 
    const [cardName, setCardName] = useState<string>("");  // 카드명
    const [cardExpiryYear, setCardExpiryYear] = useState<string>("");  //카드 년
    const [cardExpiryMonth, setCardExpiryMonth] = useState<string>("");  //카드 월 
    const [price, setPrice] = useState('20,000') 
    const [secondaryDate, setSecondaryDate] = useState<string>()
    const [list, setList] = useState<AccordionProps[]>([])  
    const [agreeList, setAgreeList] = useState<CheckboxProps[]>([])
    const [allAgree, setAllAgree] = useState<boolean>(false)  
    const [submitMutate, {data: paymentData }] = useMutation(`${import.meta.env.VITE_SERVER_URL}/payment`);
    const [donationQueryData, setDonationQueryData] = useState<DetailDonationDataProps>()
    const [paymentTotalData, setPaymentTotalData] = useState<number>()
    const [userQueryData, setUserQueryData] = useState<DetailUserDataProps>() 
    const [paymentFinally, setPaymentFinally] = useState<DetailPaymentAllDataProps>()
    const priceNumber = Number(price.replace(",", "")); 
    const router = useLocation()
    const user_id ="test1";
    const path = Number(router.pathname.split("/")[2]); 
    const donation_no = path;

    // steplist 데이터 셋팅
    const StepList = useMemo(() => {
        return [
            {
                id: 0,
                title: "후원내용",
                type: "custom",
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
    }, []) 

    // info 데이터 셋팅
    const Info = useMemo(() => {
        return [ 
            {
                id: 1,
                title: "이름",
                data: userQueryData?.user_name
            }, 
            {
                id: 2,
                title: "이메일",
                data: userQueryData?.user_email
            }
        ]
    },[userQueryData?.user_email, userQueryData?.user_name])

    // agree 데이터 셋팅
    const AgreeList = useMemo(() => {
        return [
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
    },[])  

    // 초기화
    const inital = useCallback(() => { 
        setCardOwner("")
        setOwnerBrith("")
        setCardName("")
        setCardExpiryYear("")
        setCardExpiryMonth("")
        setCardNumber1("")
        setCardNumber2("")
        setCardNumber3("")
        setCardNumber4("")
        setAccountName("")
        setAccountCompany("")
        setAccountNumber("")
        setCompanyCode("")
    },[])
    
    // 사용자 데이터 가져오기
    const userData = useCallback(() => {
        axios
        .get(`${import.meta.env.VITE_SERVER_URL}/payment/user?user_id=${user_id}`) 
        .then((res) => setUserQueryData(res.data.result));
    },[])

    // 기부 데이터 가져오기
    const donationData = useCallback(() => {
        axios
        .get(`${import.meta.env.VITE_SERVER_URL}/payment/donation?user_id=${user_id}&donation_no=${donation_no}`) 
        .then((res) => setDonationQueryData(res.data.result));
    },[donation_no])

    // 전체 결제 데이터 가져오기
    const paymentAllData = useCallback(() => {
        axios
        .get(`${import.meta.env.VITE_SERVER_URL}/payment/all?user_id=${user_id}&donation_no=${donation_no}`) 
        .then((res) => {    
            const arr: number[] = []
            res.data.result.forEach((item: DetailPaymentAllDataProps) => {
            arr.push(item.donation_current) 
            const returnVal = arr.reduce((prev, curr) => {
                return prev + curr 
                },0) 
                setPaymentTotalData(Number(returnVal))
            }) 
        }); 
    },[donation_no])
  
    // 디데이 계산
    const dDay = useMemo(() => { 
        const targetData = new Date(String(donationQueryData?.donation_period.split("~ ")[1]))
        const currentDate = new Date();
        const timeDiff = targetData.getTime() - currentDate.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysRemaining
    },[donationQueryData?.donation_period])

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
        if( index === 3 ) {  
            if(!agreeList[0].checked){
                    return alert("이용 약관 동의를 선택해주세요.")
            }
        }
        list.map((item) => {
            item.id === index ? item.disabled = false : false;
            item.id === index ? item.active = true : false;
        })
        setList([...list])    
        setTimeout(() => {
            window.scrollTo({top:location, behavior:'smooth'}); 
        }, 100); 
    },[agreeList, list]);

    // 이전
    const handlePrev = useCallback((index: number) => {    
        const content = document.querySelector(`section > div:nth-child(${index - 1})`);  
        const location = (content as HTMLElement).offsetTop 
        setTimeout(() => {
            window.scrollTo({top:location, behavior:'smooth'}); 
        }, 100);
    },[]);

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
            count < agreeList.length ? setAllAgree(false) : setAllAgree(true)
        })
    },[agreeList])
 
    // 후원하기
    const onValid = useCallback((index: number) => {  
        const data = { 
            user_id: user_id, //유저 아이디
            donation_no: donation_no, //기부 번호
            donation_support : radioActive1 === 1 ? "일시" : "정기", //후원방식
            donation_current : priceNumber, // 후원금액
            payment_division : radioActive3 === 1 ? "개인" : "법인", // 개인, 법인
            payment_method : radioActive2 === 1 ? "카드" : "자동이체", // 카드, 자동이체 
            payment_card_name: cardOwner, // 카드 소유자명
            payment_card_company : cardName, //카드사
            payment_card_expiry: `${cardExpiryYear}/${cardExpiryMonth}`, //카드유효기간
            payment_card_num: `${cardNumber1}-${cardNumber2}-${cardNumber3}-${cardNumber4}`, //카드번호 
            payment_account_name: accountName,// 예금주명
            payment_account_company: accountCompany, //은행명
            payment_account_transfer: radioActive4 === 0 ? "매월15일" : "매월25일", //은행 이체일 
            payment_account_num: accountNumber, //계좌번호
            payment_birth : ownerBirth, //생년월일
            payment_company_code : companyCode// 법인 사업자 
        }  
        submitMutate(data)  
        setPaymentFinally(data) 
        handleNext(index)
    },[accountCompany, accountName, accountNumber, cardExpiryMonth, cardExpiryYear, cardName, cardNumber1, cardNumber2, cardNumber3, cardNumber4, cardOwner, companyCode, donation_no, handleNext, ownerBirth, priceNumber, radioActive1, radioActive2, radioActive3, radioActive4, submitMutate])
     
    useEffect(() => { 
        if(paymentData && paymentData.ok) { 
            paymentAllData()
            return alert("후원이 완료되었습니다.")
        }  
    },[paymentAllData, paymentData])

    // 유효성 검사 후 제출
    const handleSubmit = useCallback((index:number) => {    
        if(radioActive2 === 1) { 
            if(cardOwner === "") {
                return alert("카드주명을 입력해주세요.") 
            }
            if(radioActive3 == 1 && ownerBirth === "") { 
                return alert("생년월일을 입력해주세요.") 
            }      
            if(radioActive3 == 2 && companyCode === "") {  
                return alert("사업자등록번호를 입력해주세요.")   
            }
            if(cardName === "") {
                return alert("카드사를 선택해주세요.") 
            }
            if(cardExpiryYear === "" || cardExpiryMonth === "") {
                return alert("유효기간을 선택해주세요.")
                
            }
            if(cardNumber1 === "" || cardNumber2 === "" || cardNumber3 === "" || cardNumber4 === "") {
                return alert("카드번호를 입력해주세요.") 
            }    
        }else{ 
            if(accountName === "") {
                return alert("예금주명을 입력해주세요.") 
            }
            if(radioActive3 == 1 && ownerBirth === "") { 
                return alert("생년월일을 입력해주세요.")    
            }   
            if(radioActive3 == 2 && companyCode === "") {  
                return alert("사업자등록번호를 입력해주세요.")   
            }
            if(accountCompany === "") {
                return alert("은행명을 선택해주세요.")
            }
            if(accountNumber === "") {
                return alert("계좌번호를 입력해주세요.")
            }   
        }   
        onValid(index)
    },[accountCompany, accountName, accountNumber, cardExpiryMonth, cardExpiryYear, cardName, cardNumber1, cardNumber2, cardNumber3, cardNumber4, cardOwner, companyCode, onValid, ownerBirth, radioActive2, radioActive3])
    
    useEffect(() => { 
        setList(StepList)
        setAgreeList(AgreeList)
        executeOnSecondMonday()  
        donationData()  
        userData()
        paymentAllData()
    },[AgreeList, StepList, allAgree, donationData, donationQueryData?.donation_period, paymentAllData, userData])
      
    return(
        <Article>
            <ArticleInner image={donationQueryData?.donation_image}>
                <ContentWrap> 
                    <aside>
                        <h1>후원신청</h1>
                        <p>{donationQueryData?.donation_name}</p>
                    </aside>
                    <section>
                        {
                            StepList.map((item)=> {
                                return(
                                    <Accordion   
                                        id={item.id}   
                                        key={item.id}
                                        title={item.title}
                                        type={item.type}
                                        active={item.active}
                                        icon={item.icon}
                                        onClick={() => {
                                            item.active = !item.active
                                            setList([...list])
                                        } }
                                        disabled={item.disabled}                               >
                                    {(() => {
                                    switch (item.id) {
                                    case 0:
                                        return <Flex>
                                            <div>
                                                <AccordionBody2>
                                                    <Percent>{`${paymentTotalData ? Math.floor((Number(paymentTotalData)/Number(donationQueryData?.donation_goal)) * 100) : 0}`}%</Percent>
                                                    <Progressbar
                                                        percentage={paymentTotalData ? Math.floor((Number(paymentTotalData)/Number(donationQueryData?.donation_goal)) * 100) : 0}
                                                     />
                                                    <DonationPeriod>{donationQueryData?.donation_period}까지</DonationPeriod>
                                                    <DonationDDay>D-{dDay}</DonationDDay>
                                                    <DonationCurrent>{paymentTotalData ? String(paymentTotalData).replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0}<span>원</span></DonationCurrent>
                                                    <DonationAmout>목표 금액: <span>{donationQueryData?.donation_goal ? donationQueryData?.donation_goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0}</span></DonationAmout>
                                                </AccordionBody2>
                                            </div>
                                            <div>
                                                { 
                                                <AccordionHeader> 
                                                    <h1>{item.title}</h1>
                                                </AccordionHeader>
                                                }
                                                <AccordionBody>  
                                                    {donationQueryData?.donation_content}
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
                                                        width="100"
                                                        bg="black"
                                                        color="#fff"
                                                        onClick={() => setPrice('20,000')}
                                                    >
                                                        2만원
                                                    </Button>
                                                    <Button 
                                                        width="100"
                                                        bg="black"
                                                        color="#fff"
                                                        onClick={() => setPrice('30,000')}
                                                    >
                                                        3만원
                                                    </Button>
                                                    <Button 
                                                        width="100"
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
                                                    <p className="date">{donationQueryData?.donation_period}</p>
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
                                                    icon
                                                    type="round" 
                                                    value={0}
                                                    htmlId="all_agree"
                                                    checked={allAgree}
                                                    name="모두동의"
                                                    label="이용약관, 마케팅 알림 수신에 모두 동의합니다"
                                                    onChange={handleAllAgree} 
                                                />
                                                {
                                                    AgreeList.map((item) => {
                                                        return( 
                                                        <CheckBox 
                                                            icon
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
                                                    {AgreeTerms.terms}
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
                                                    onChange={() => { setRadioActive2(1), inital() }}
                                                />
                                                <Radio
                                                    className={radioActive2 === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="자동이체"
                                                    id="payment"
                                                    value="2" 
                                                    name="payment_method"     
                                                    onChange={() => { setRadioActive2(2),inital() }}
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
                                                    onChange={() => { setRadioActive3(1), inital() }}
                                                />
                                                <Radio
                                                    className={radioActive3 === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="법인"
                                                    id="company"
                                                    value="2" 
                                                    name="payment_option"     
                                                    onChange={() => { setRadioActive3(2), inital() }}
                                                />
                                            </RadioWrap>
                                        </Title>
                                        {
                                            radioActive2 === 1 ?
                                            <> 
                                            <Title flex={1} bottomBorder title="카드주명"> 
                                                <InputBox>
                                                    <input 
                                                        type="text" 
                                                        placeholder="" 
                                                        value={cardOwner}  
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardOwner(e.target.value)}
                                                    />
                                                </InputBox>
                                            </Title>
                                            {
                                                radioActive3 === 1 ? 
                                                <Title bottomBorder flex={1} title="생년월일">
                                                    <InputBox>
                                                        <input 
                                                            type="text" 
                                                            placeholder="YYMMDD" 
                                                            maxLength={6}
                                                            value={ownerBirth}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOwnerBrith(e.target.value)}
                                                        />
                                                    </InputBox>
                                                </Title>
                                                : 
                                                <Title flex={"1 0 70%"} bottomBorder title="사업자등록번호">
                                                    <InputBox flexdirection="column">
                                                        <div className="account">
                                                            <input 
                                                                type="text" 
                                                                placeholder="'-'제외하고 입력" 
                                                                value={companyCode} 
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyCode(e.target.value)}
                                                            />
                                                            <Button bg="#fff" color="#f56400" border="#f56400" width="160">사업자번호확인</Button>
                                                        </div> 
                                                    </InputBox>
                                                </Title>
                                            }
                                            <Title flex={"1 0 70%"} bottomBorder title="카드사/유효기간"> 
                                                <SelectWrap>
                                                    <Select
                                                        selectOptions={CardCompany} 
                                                        value={CardCompany[0]} 
                                                        onChange={(e) => setCardName(e?.label as string)}  
                                                    />
                                                    <Select
                                                        selectOptions={CardDay} 
                                                        value={CardDay[0]} 
                                                        onChange={(e) =>setCardExpiryMonth(e?.label as string)} 
                                                    />
                                                    <Select
                                                        selectOptions={CardYear} 
                                                        value={CardYear[0]} 
                                                        onChange={(e) =>setCardExpiryYear(e?.label as string)} 
                                                    />
                                                </SelectWrap>
                                            </Title>
                                            <Title flex={"1 0 70%"} bottomBorder title="카드번호"> 
                                                <CardBox>
                                                    <InputBox>
                                                        <input 
                                                            type="text" 
                                                            placeholder="0000" 
                                                            value={cardNumber1}  
                                                            maxLength={4}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber1(e.target.value)}
                                                        />
                                                    </InputBox>
                                                    <InputBox>
                                                        <input 
                                                            type="text" 
                                                            placeholder="0000" 
                                                            value={cardNumber2}   
                                                            maxLength={4}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber2(e.target.value)}
                                                        />
                                                    </InputBox>
                                                    <InputBox>
                                                        <input 
                                                            type="text" 
                                                            placeholder="0000" 
                                                            value={cardNumber3} 
                                                            maxLength={4}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber3(e.target.value)}
                                                        />
                                                    </InputBox>
                                                    <InputBox>
                                                        <input 
                                                            type="text" 
                                                            placeholder="0000" 
                                                            value={cardNumber4} 
                                                            maxLength={4}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber4(e.target.value)}
                                                        />
                                                    </InputBox>
                                                </CardBox>
                                            </Title> 
                                            </>
                                            :
                                            <>
                                            <Title flex={1} bottomBorder title="예금주명"> 
                                                <InputBox>
                                                    <input 
                                                        type="text" 
                                                        placeholder="" 
                                                        value={accountName} 
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountName(e.target.value)}/>
                                                    </InputBox>
                                            </Title>
                                            {
                                                radioActive3 === 1 ?
                                                <Title bottomBorder flex={1} title="생년월일">
                                                <InputBox>
                                                    <input 
                                                        type="text" 
                                                        placeholder="YYMMDD" 
                                                        value={ownerBirth}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOwnerBrith(e.target.value)}
                                                    />
                                                </InputBox>
                                            </Title>
                                            : 
                                            <Title flex={"1 0 70%"} bottomBorder title="사업자등록번호">
                                                <InputBox flexdirection="column">
                                                    <div className="account">
                                                        <input 
                                                            type="text" 
                                                            placeholder="'-'제외하고 입력" 
                                                            value={companyCode} 
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyCode(e.target.value)}
                                                        />
                                                        <Button bg="#fff" color="#f56400" border="#f56400" width="160">사업자번호확인</Button>
                                                    </div> 
                                                </InputBox>
                                            </Title>
                                            }
                                            <Title flex={"1 0 70%"} bottomBorder title="은행명">
                                                <SelectWrap>
                                                    <Select
                                                        selectOptions={AccountName} 
                                                        value={AccountName[0]} 
                                                        onChange={(e) => setAccountCompany(e?.label as string)}
                                                    />  
                                                </SelectWrap>
                                            </Title>
                                            <Title flex={"1 0 70%"} bottomBorder title="계좌번호"> 
                                                <InputBox flexdirection="column">
                                                    <div className="account">
                                                        <input 
                                                            type="text" 
                                                            placeholder="'-'제외하고 입력" 
                                                            value={accountNumber} 
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountNumber(e.target.value)}
                                                        />
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
                                            <Button bg="#f56400" color="#fff" onClick={() => handleSubmit(Number(item.id)+ 1)}>후원하기</Button>
                                        </ButtonBox>
                                        </>  
                                    case 4:
                                        return<>
                                        <ImgBox>
                                            <img src="/images/donation-complete.png" alt="후원완료"/>
                                            <p>{userQueryData?.user_name} 님, 후원신청이 완료되었습니다.</p>
                                            <p>감사합니다.</p>
                                        </ImgBox>
                                        <Table>
                                            <caption>신청내역</caption>
                                            <thead>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">후원방식</th>
                                                    <td>{paymentFinally?.donation_support}후원</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">후원분야</th>
                                                    <td>{donationQueryData?.donation_category}({String(paymentFinally?.donation_current).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원)</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">후원금액</th>
                                                    <td className="orange">{String(paymentFinally?.donation_current).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">납입방법</th>
                                                    <td>{paymentFinally?.payment_method === "카드" 
                                                    ? "신용카드" 
                                                    : `자동이체 / ${paymentFinally?.payment_account_transfer}`}</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">납입정보</th>
                                                    <td>
                                                        <p>{paymentFinally?.payment_method === "카드" 
                                                        ? `${paymentFinally?.payment_card_company} / ${paymentFinally?.payment_card_num}`
                                                        : `${paymentFinally?.payment_account_company} / ${paymentFinally?.payment_account_num}`}</p>
                                                        <ul>
                                                            <li>이번달 후원금은 신청한 일자에 출금됩니다.</li>
                                                            {
                                                                paymentFinally?.payment_method === "자동이체" &&
                                                                <li>다음달부터는 매월 {paymentFinally?.payment_account_transfer}에 출금됩니다.</li>
                                                            }
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
    .select { 
        min-width: 25%;
    }
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
        width: 100%;
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