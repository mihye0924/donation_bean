import Accordion, { AccordionProps } from "@/components/Accordion" 
import Button from "@/components/Button"
import CheckBox, { CheckboxProps } from "@/components/CheckBox"
import Radio from "@/components/Radio"
import Title from "@/components/Title"
import { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import AgreeTerms from "@/api/detail/AgreeTerms.json"
import Progressbar from "@/components/Progressbar" 
import useMutation from "@/hooks/useMutation" 
import axios from "axios"
import { DetailDonationDataProps, DetailPaymentAllDataProps } from "@/types/detail"
import { useLocation } from "react-router-dom"   
import { RequestPayResponse } from "@/types/payment"
import { getUser } from "@/util/userinfo"
import { useQuery } from "@tanstack/react-query"
import { Response } from "@/types/user"

const DetailPage = () =>  {   
    const [support, setSupport] = useState<number>(1);  //후원방식
    const [schedule, setSchedule] = useState<number>(1); // 후원방식 10일, 15일
    const [paymethod, setPaymethod] = useState<number>(1);  //결제수단  
    const [price, setPrice] = useState('20,000') // 결제금액
    const priceNumber = Number(price.replace(",", "")); //결제금액 - 숫자
    const [secondaryDate, setSecondaryDate] = useState<string>() //둘째주 월요일 찾기
    const [list, setList] = useState<AccordionProps[]>([])  
    const [allAgree, setAllAgree] = useState<boolean>(false)  //전체 동의
    const [agreeList, setAgreeList] = useState<CheckboxProps[]>([]) // 동의버튼
    const [donationQueryData, setDonationQueryData] = useState<DetailDonationDataProps>() //기부데이터
    const [paymentTotalData, setPaymentTotalData] = useState<number>() //결제 데이터 
    const [paymentResult, setPaymentResult] = useState<DetailPaymentAllDataProps>() //기부 결과 데이터
    const router = useLocation()
    const user = getUser(); 
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
    const { data } = useQuery<Response>({
        queryKey: ["user"],
        queryFn: () =>
          axios
            .get(`http://localhost:8081/user/me?id=${user?.id}`)
            .then((res) => res.data),
      }); 

    // info 데이터 셋팅
    const Info = useMemo(() => {
        return [ 
            {
                id: 1,
                title: "아이디",
                data: user.id
            }, 
            {
                id: 2,
                title: "이름",
                data: data?.userinfo?.user_nick
            }
        ]
    },[data?.userinfo?.user_nick, user.id])

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
  

    // 기부 데이터 가져오기
    const donationData = useCallback(() => {
        axios
        .get(`${import.meta.env.VITE_SERVER_URL}/payment/donation?donation_no=${donation_no}`) 
        .then((res) => setDonationQueryData(res.data.result));
    },[donation_no])

    // 전체 결제 데이터 가져오기
    const [submitMutate, {data: paymentData }] = useMutation(`${import.meta.env.VITE_SERVER_URL}/payment`);
    const paymentAllData = useCallback(() => {
        axios
        .get(`${import.meta.env.VITE_SERVER_URL}/payment/all?user_id=${user.id}&donation_no=${donation_no}`) 
        .then((res) => {    
            const arr: number[] = []
            res.data.result.forEach((item: DetailPaymentAllDataProps) => {
            arr.push(Number(item.donation_current)) 
            const returnVal = arr.reduce((prev, curr) => {
                return prev + curr 
                },0) 
                setPaymentTotalData(Number(returnVal))
            }) 
        }); 
    },[donation_no, user.id])
  
    // 디데이 계산
    const dDay = useMemo(() => {  
        const targetData = new Date(String(donationQueryData?.donation_period).split("~")[1])
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
    const onValid = useCallback((index: number, res: RequestPayResponse) => {   
        const data = { 
            user_id: user.id, //유저 아이디
            donation_no: donation_no, //기부 번호
            donation_support: support,
            donation_current : res.paid_amount, // 후원금액 
            payment_method : paymethod === 1 ? "카드" : "자동이체", // 카드, 자동이체
            payment_uid: res.merchant_uid, // 구매자고유번호 
            payment_name: res.buyer_name, // 구매자명 
            payment_transfer: support === 2 && schedule === 0 ? "매월15일" : "매월25일", //은행 이체일 
        }   
        submitMutate(data)  
        setPaymentResult(data)  
        handleNext(index)
    },[donation_no, handleNext, paymethod, schedule, submitMutate, support, user.id])
       
    // 결제 연결하기
    const payment = useCallback((index: number) => {   
        window.IMP?.init("imp84565065")  
        if (!priceNumber) {
            alert('결제 금액을 확인해주세요')
            return
        }
        const queryData = {
            pg: 'html5_inicis.INIBillTst',// PG사
            pay_method: paymethod === 1 ? "card" : "trans",// 결제수단 card, trans
            merchant_uid: `mid_${new Date().getTime()}`,// 주문번호
            amount: priceNumber,// 결제금액
            name: '기부콩 결제',// 주문명
            buyer_name: data?.userinfo?.user_nick,// 구매자 이름
            buyer_tel: Number(data?.userinfo?.user_phone ? data?.userinfo?.user_phone : 0),// 구매자 전화번호
            buyer_email: data?.userinfo?.user_email ? data?.userinfo?.user_email : "" ,// 구매자 이메일 
            receipt_url: "https://www.my-service.com/payments/complete/mobile", 
          };
          const callback = (res: RequestPayResponse) => {
            const { success, error_msg } = res
            if (success) { 
                onValid(index, res)
            } else {
              alert(`결제 실패: ${error_msg}`)
            }
          }
          window.IMP?.request_pay(queryData, callback) 
    },[data, onValid, paymethod, priceNumber])
 
     
    useEffect(() => { 
        if(paymentData && paymentData.ok) { 
            paymentAllData()
            return alert("후원이 완료되었습니다.")
        }  
    },[paymentAllData, paymentData]) 
    
    useEffect(() => { 
        setList(StepList)
        setAgreeList(AgreeList)
        executeOnSecondMonday()  
        donationData()   
        paymentAllData()
    },[AgreeList, StepList, allAgree, donationData, paymentAllData])
      
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
                                            <Radio
                                                className={support === 1 ? "active" : ""}
                                                type="round" 
                                                label="일시후원"
                                                id="temporary"
                                                value="1"
                                                name="donation_method"   
                                                onChange={() => setSupport(1)}
                                            />
                                            {/* <RadioWrap>
                                                <Radio
                                                    className={support === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="정기후원"
                                                    id="regular"
                                                    value="2" 
                                                    name="donation_method"     
                                                    onChange={() => setSupport(2)}
                                                />
                                            </RadioWrap> */}
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
                                            support === 2 &&
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
                                                    className={paymethod === 1 ? "active" : ""}
                                                    type="round" 
                                                    label="카드"
                                                    id="card"
                                                    value="1"
                                                    name="payment_method"   
                                                    onChange={() => { setPaymethod(1) }}
                                                />
                                                <Radio
                                                    className={paymethod === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="자동이체"
                                                    id="payment"
                                                    value="2" 
                                                    name="payment_method"     
                                                    onChange={() => { setPaymethod(2) }}
                                                />
                                            </RadioWrap> 
                                        </Title>  
                                        { 
                                            support === 2 &&
                                            <Title flex={"1 0 70%"} bottomBorder title="이체일"> 
                                            <RadioWrap>
                                                <Radio
                                                    className={schedule === 1 ? "active" : ""}
                                                    type="round" 
                                                    label="매월15일"
                                                    id="fifthenfive"
                                                    value="1"
                                                    name="Transfer_date"   
                                                    onChange={() => setSchedule(1)}
                                                />
                                                <Radio
                                                    className={schedule === 2 ? "active" : ""}
                                                    type="round" 
                                                    label="매월25일"
                                                    id="twentyfive"
                                                    value="2" 
                                                    name="Transfer_date"     
                                                    onChange={() => setSchedule(2)}
                                                />
                                            </RadioWrap>
                                        </Title> 
                                        }
                                        <ButtonBox>
                                            <Button bg="#f56400" color="#fff" onClick={() => payment(Number(item.id)+ 1)}>후원하기</Button>
                                        </ButtonBox>
                                        </>  
                                    case 4:
                                        return<>
                                        <ImgBox>
                                            <img src="/images/donation-complete.png" alt="후원완료"/>
                                            <p>{data?.userinfo?.user_nick} 님, 후원신청이 완료되었습니다.</p>
                                            <p>감사합니다.</p>
                                        </ImgBox>
                                        <Table>
                                            <caption>신청내역</caption>
                                            <thead>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">후원방식</th>
                                                    <td>{paymentResult?.donation_support === 1 ? "일시": "정기"}후원</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">후원분야</th>
                                                    <td>{donationQueryData?.donation_category}({String(paymentResult?.donation_current).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원)</td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">후원금액</th>
                                                    <td className="orange">
                                                        {String(paymentResult?.donation_current).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <th scope="row">납입방법</th>
                                                    <td>{paymentResult?.payment_method}</td> 
                                                </tr>
                                                {/* <tr>
                                                    <th scope="row">납입정보</th>
                                                    <td>
                                                        <p>{paymentResult?.payment_method}</p>
                                                        <ul>
                                                            <li>이번달 후원금은 신청한 일자에 출금됩니다.</li>
                                                            {
                                                                
                                                                <li>다음달부터는 매월 00일에 출금됩니다.</li>
                                                            }
                                                        </ul>    
                                                    </td> 
                                                </tr> */}
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