import styled from "styled-components"
import Button from "@/components/Button"
import Select from "@/components/Select"
import  { useState, useMemo, useCallback, ChangeEvent, useEffect } from "react";
import Category from "@/api/main/Category.json" 
import useMutation from "@/hooks/useMutation"
import axios from "axios"
import PopupStore from "@/store/popupStore";  

const AdminPopupCreate = () => {
    const [donationName, setDonationName] = useState<string>("");
    const [donationContent, setDonationContent] = useState<string>("");
    const [donationCompany, setDonationCompany] = useState<string>("");
    const [donationGoal, setDonationGoal] = useState<string>("");
    const [donationPeriod, setDonationPeriod] = useState<string>(""); 
    const [donationCategory, setDonationCategory] = useState<string>("");  
    const [saveImage, setSaveImage] = useState<File>(); 
    const [formData, setFormData] = useState<FormData>();
    const [donationStatus, setDonationStatus] = useState<string>("");    
    const [submitMutate, {data: donationData }] = useMutation(`${import.meta.env.VITE_SERVER_URL}/admin/donation`); 
    const { popup, popupState } = PopupStore(); 
    const user_id = "test1"
    const StatusList = useMemo(() => {
        return [
            {
                label: "진행중",
                value: "0",
            },
            {
                label: "진행종료",
                value: "1",
            },
        ]
    }, [])

    // 이미지 업로드
    const handleUpLoadProfile = useCallback(async(e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()  
        const file = e.target.files?.[0];
        if(!file) return; 
        formData.append('file', file);    
        setSaveImage(file) 
        setFormData(formData)  
      },[]);

    // 게시물 등록록
    const handleSubmit = useCallback(() => { 
        axios({
            method:'post',
            url:`${import.meta.env.VITE_SERVER_URL}/admin/upload`, 
            headers: { 'Content-Type': 'multipart/form-data' },   
            data: formData
        }) 
        const data = {
            user_id: user_id,
            donation_name: donationName,
            donation_image: saveImage?.name,
            donation_content: donationContent,
            donation_company: donationCompany,
            donation_goal: Number(donationGoal),
            donation_period: donationPeriod,
            donation_category: donationCategory,
            donation_status: donationStatus === "진행중" ? 0 : 1
        }
        submitMutate(data)
    },[donationCategory, donationCompany, donationContent, donationGoal, donationName, donationPeriod, donationStatus, formData, saveImage?.name, submitMutate])
     

    useEffect(() => {
    if(donationData && donationData.ok) {
        popupState(!popup)
        alert('등록되었습니다.')
        window.location.reload()
        return  
    }
    },[donationData, popup, popupState]) 
  return (
    <PopupWrap>
        <Input>
            <label htmlFor="donation_name">기부명</label>
            <input 
                type="text" 
                id="donation_name" 
                placeholder="기부명을 입력해주세요."
                value={donationName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setDonationName(e.target.value)}}
            />
        </Input>
        <Input>
            <label htmlFor="donation_image">기부이미지</label>  
                <input  
                    name="file" 
                    type="file" 
                    onChange={handleUpLoadProfile}
                />   
        </Input>
        {
            saveImage &&
            <Image>
                <img src={URL.createObjectURL(saveImage)} alt="기부이미지" />
            </Image> 
        } 
        <Input>
            <label htmlFor="donation_content">기부내용</label>
            <textarea 
                id="donation_content" 
                placeholder="내용을 입력해주세요"
                value={donationContent}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { setDonationContent(e.target.value)}}
            /> 
        </Input>
        <Input>
            <label htmlFor="donation_company">기부처</label>
            <input 
                type="text" 
                id="donation_company" 
                placeholder="기부처를 입력해주세요."
                value={donationCompany}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setDonationCompany(e.target.value)}}
            />                 
        </Input>
        <Input>
            <label htmlFor="donation_goal">목표금액</label>
            <input 
                type="text" 
                id="donation_goal" 
                placeholder="900000"
                value={donationGoal}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setDonationGoal(e.target.value)}}
            /> 
        </Input>
        <Input>
            <label htmlFor="donation_period">기부기간</label>
            <input 
                type="text" 
                id="donation_period" 
                placeholder="2024-01-01 ~ 2024.12.31"
                value={donationPeriod}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setDonationPeriod(e.target.value)}}
            /> 
        </Input>
        <Input>
            <label htmlFor="donation_category">카테고리</label>
            <SelectWrap> 
                <Select
                    selectOptions={Category} 
                    value={Category[1]}
                    onChange={(e) => setDonationCategory(e?.label as string)} 
                />
            </SelectWrap>
        </Input>
        <Input>
            <label htmlFor="donation_status">기부상태</label>
            <SelectWrap> 
                <Select
                    selectOptions={StatusList} 
                    value={StatusList[0]}
                    onChange={(e) =>  setDonationStatus(e?.label as string) } 
                />
            </SelectWrap> 
        </Input>
        <ButtonBox>
            <Button width="80" onClick={handleSubmit}>등록하기</Button>
        </ButtonBox>
    </PopupWrap>
  )
}

export default AdminPopupCreate

const PopupWrap = styled.div`
    padding: 20px;
`
const Input = styled.div`
    /* height: 40px; */
    margin-bottom: 10px;
    display: flex;
    label { 
        height: 40px;
        line-height: 40px; 
        font-size: 16px;
        display: inline-block;
        width: 110px;
    }
    textarea {
        flex: 1;
        width: 100%;
        height: 100px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #c9c9c9;
        border-radius: 5px;
        padding: 8px 10px;
        font-size: 14px;
        &:focus {
            outline: 0;
            border: 1px solid #c9c9c9;
        }
    }
    input { 
        flex: 1 0 40%;
        height: 40px;
        border: 1px solid #c9c9c9;
        border-radius: 5px;
        padding: 8px 10px;
        &:focus {
            outline: 0;
            border: 1px solid #c9c9c9;
        }
    }
`
 const SelectWrap = styled.div`
    .select {
        /* min-width: 320px; */ 
        width: 200px;
        &>div {
            &>div {  
                input {
                    height: initial;
                }
            }
        }
    }
 `
 const Image = styled.div`
    border: 1px solid #f1f1f1;
    margin: 10px 0;
    img {
         width: 100%;
         height: 400px;
         object-fit: cover;

    }
 `
 const ButtonBox = styled.div`
 margin-top: 50px;
 text-align: center;
 button {
    border: 1px solid #f56400;
    width: 240px;
    border-radius: 0;
    height: 45px;
    color: #f56400;
 }
 `