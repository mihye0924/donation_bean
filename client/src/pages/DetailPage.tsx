import Accordion from "@/components/Accordion"
import { useState } from "react"
import styled from "styled-components"

const DetailPage = () =>  {
    const [accordionButton, setAccordionButton] = useState(false)
    return(
        <Article>
            <ArticleInner>
                <ContentWrap> 
                    <aside>
                        <h1>후원신청</h1>
                        <p>낚싯줄에 걸린 돌고래 '종달이'를 구해주세요</p>
                    </aside>
                    <section>
                        <Accordion  
                            active={true}
                            title="후원내용"
                        >
                            <>
                                1월 29일 제주돌고래 긴급구조단이 종달이 꼬리에 걸린 낚싯줄 제거에 성공했습니다. 아직 종달이 몸과 입에 제거하지 못한 낚싯줄이 남아 있습니다
                            </>
                        </Accordion>
                        <Accordion 
                            toggle
                            title="STEP 1. 후원분야 선택"
                            active={accordionButton} 
                            onClick={() => setAccordionButton(!accordionButton)}
                        >
                            <>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</>
                        </Accordion>
                        <Accordion 
                            toggle
                            title="STEP 1. 후원분야 선택"
                            active={accordionButton} 
                            onClick={() => setAccordionButton(!accordionButton)}
                        >
                            <>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</>
                        </Accordion>
                        <Accordion 
                            toggle
                            title="STEP 1. 후원분야 선택"
                            active={accordionButton} 
                            onClick={() => setAccordionButton(!accordionButton)}
                        >
                            <>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</>
                        </Accordion>
                        <Accordion 
                            toggle
                            title="STEP 1. 후원분야 선택"
                            active={accordionButton} 
                            onClick={() => setAccordionButton(!accordionButton)}
                        >
                            <>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</>
                        </Accordion>
                    </section>
                </ContentWrap>
            </ArticleInner>
            <ImageWrap>
                <img src={`${import.meta.env.VITE_SERVER_URL}/uploads/donation/image01.jpg`} alt="배경이미지"/>
            </ImageWrap>
        </Article>
    )
}
export default DetailPage

const Article = styled.article`
    position: relative;  
    /* height: calc(100vh - 207px); */
    /* padding-top: 148px; */
    margin-top: 148px;
    /* height: calc(100vh - 57px); */
    overflow-y: auto;
    @media only screen and (max-width: 375px) {  
        padding-top: 115px;
    }
`

const ArticleInner = styled.div`
    position: relative;
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
`
const ContentWrap = styled.div` 
    position: absolute; 
    height: auto; 
    display: flex;
    gap: 50px;
    z-index: 2;
    padding: 50px 10px;
    aside {
        flex: 1 0 20%;
        border: 1px solid red;
        h1 {
            font-size: 32px;
            color: #fff;
        }
        p {
            font-size: 20px;
            color: #fff;
            line-height: 1.5;
            margin-top: 20px;
        }
    }
    section {
        flex: 1 0 70%;
        border: 1px solid red;
        >div { 
            &:not(:first-child) {
                margin-top: 20px;
            }
        }
    }
`
const ImageWrap = styled.div` 
    background-color: rgba(0, 0, 0, 0.33);
    position:relative;
    width: 100%;
    height: 100%;
    /* height: calc(100vh - 207px); */
    pointer-events: none;
    img { 
        object-fit: cover;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`