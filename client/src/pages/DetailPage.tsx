import Accordion from "@/components/Accordion"
import { useEffect, useState } from "react"
import styled from "styled-components"

interface StepType {
    id: number,
    title: string,
    active: boolean
}
const DetailPage = () =>  {
    const [active, setActive] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [step, setStep] = useState<StepType[]>([]) 
 
    useEffect(() => {
        setStep([
            {
                id: 0,
                title: "후원내용",
                active: false
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
        ])
    },[])
 
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
                            step.map((item)=> {
                                return(
                                    <Accordion   
                                        key={item.id}
                                        title={item.title}
                                        active={
                                            item.id === 0 || item.id === 1 ? true : false || 
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
                                        return <>1월 29일 제주돌고래 긴급구조단이 종달이 꼬리에 걸린 낚싯줄 제거에 성공했습니다. 아직 종달이 몸과 입에 제거하지 못한 낚싯줄이 남아 있습니다</>
                                    case 1:
                                        return<>후원분야</>  
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
    desktop: "1024px",
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
    margin-top: 148px;  
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
                margin-top: 20px;
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