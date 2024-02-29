import styled from "styled-components"
import Button from "./Button"
import CheckBox from "@/components/CheckBox"
import { useCallback, useEffect, useMemo, useState } from "react"
import axios from "axios"
import { userTypes } from "@/types/user"
import Select from "@/components/Select" 

const AdminPageAccountList = () => {
  const [userList, setUserList] = useState<userTypes[]>([]) 
  const [authority, setAuthority] = useState<string>("") 
  const [allAgree, setAllAgree] = useState<boolean>(false) 

  const authoriyList = useMemo(() => {
    return [
      {
        value: "0",
        label: "사용자"
      },
      {
        value: "1",
        label: "관리자"
      },
    ]
  },[]) 

  // 유저 데이터 가져오기
  const getUserData = useCallback(() => { 
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/admin/user`)
      .then((res) => { 
        const data :userTypes[] =[]
        res.data.result.map((item: userTypes) => {
          data.push({
            ...item,
            checked:  false,
            htmlId: String(item.user_no)
          })
        })
        setUserList(data)
        // console.log(userList)
      })
  },[])

    // 약관동의-모두동의
  const handleAllAgree = useCallback(() => {
    setAllAgree(!allAgree)
    for(let i = 0; i<userList.length; i++) {
      userList[i].checked = !allAgree
    } 
  },[allAgree, userList])

    // 약관동의-필수,선택
  const handleCheckBoxChange = useCallback((item: userTypes) => {
      let count:number = 0  
      item.checked = !item.checked;
      setUserList([...userList]); 
      userList.forEach((item) => { 
        if(item.checked) {
          count++
        }  
        count < userList.length ? setAllAgree(false) : setAllAgree(true)
      })
  },[userList])

  // 계정 삭제하기
  const postDeleteUser = useCallback(() => {
    userList.forEach((item) => {
      if(item.checked) {
        axios
        .delete(`${import.meta.env.VITE_SERVER_URL}/admin/user?user_no=${item.user_no}`)
        .then((res) => {
          if(res.data.ok) {
            window.location.reload()
            return 
          }
        }) 
      }
    }) 
  },[userList]) 

  // 계정 권한 수정
  const postUpdateAuthority = useCallback(() => {
    userList.forEach((item) => {
      if(item.checked) {  
        axios
        .put(`${import.meta.env.VITE_SERVER_URL}/admin/user?user_no=${item.user_no}&user_enum=${Number(authority)}`)
        .then((res) => {
          if(res.data.ok) {
            window.location.reload()
            return 
          }
        }) 
      }
    }) 
  },[authority, userList]);

  useEffect(() => { 
    getUserData() 
  },[getUserData])

  return (
    <AdminPageWrap>
      <h1>회원목록</h1>
      <ButtonBox> 
        <Button onClick={postUpdateAuthority} width="80" >수정</Button>
        <Button onClick={postDeleteUser} width="80" >탈퇴</Button>
      </ButtonBox>
      <TableWrap>
        <Table>
          <caption>회원목록</caption>
          <colgroup>
            <col style={{width: "5%"}} />
            <col style={{width: "5%"}} />
            <col style={{width: "10%"}} />
            <col style={{width: "10%"}} />
            <col style={{width: "15%"}} />
            <col style={{width: "15%"}} />
            <col style={{width: "20%"}} />
          </colgroup>
          <thead> 
            <tr>
                <th>
                  <CheckBox  
                      icon
                      type="square"
                      value={0} 
                      htmlId="all_agree"
                      name="전체선택"
                      checked={allAgree}
                      onChange={handleAllAgree}
                    />
                </th>
                <th>번호</th>
                <th>아이디</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>이메일</th>
                <th>권한</th>
              </tr>
          </thead>
          <tbody>
              {
                userList.length > 0 ?
                userList.map((item) => {
                  return(  
                    <tr key={item.user_no}>
                      <td> 
                        <CheckBox  
                          icon
                          type="square" 
                          htmlId={item.htmlId}
                          value={item.user_no} 
                          name="선택"
                          checked={item.checked} 
                          onChange={() => handleCheckBoxChange(item)}
                        />
                      </td>
                      <td>{item.user_no}</td>
                      <td>{item.user_id}</td>
                      <td>{item.user_name}</td>
                      <td>{item.user_phone}</td> 
                      <td>{item.user_email}</td> 
                      <td>
                        <Select
                          selectOptions={authoriyList} 
                          value={{
                            value: String(item.user_enum),
                            label: item.user_enum === 0 ? "사용자" : "관리자"
                          }}  
                          onChange={(e) => {setAuthority(e?.value as string)} } 
                        />
                      </td>  
                    </tr>   
                  )
                })
                :
                <tr>
                  <td colSpan={8}>
                    <p>등록된 사용자가 없습니다.</p>
                  </td>
                </tr>
              }
          </tbody>
        </Table>
      </TableWrap>
      <MoreButton>
        <Button onClick={() => alert('준비중')}>더보기</Button>
      </MoreButton>
    </AdminPageWrap>
  )
}

export default AdminPageAccountList
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

const AdminPageWrap = styled.div`
   h1 {
    color: #f56400;
    font-family: 'NanumSquareNeo-Variable';
    font-size: 40px;
    font-weight: 900;
    @media ${media.desktop}{ 
      margin-top: 20px;
      font-size: 30px;  
    }
    @media ${media.tablet}{  
      display: none;
    } 
   }
` 
const ButtonBox = styled.div`
  margin-top: 50px; 
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  button {
    padding: 8px 20px;
    background-color: #f56400;
    color: #fff;
    padding: 8px 20px;
    border: 0;
    margin-left: 10px;  
    &:nth-of-type(2) {
      color: #f56400;
      border: 1px solid #f56400;
      background-color: transparent;
    }
  } 
  @media ${media.desktop}{ 
    margin-top: 30px; 
    margin-bottom: 10px;
    button {
    width: 65px;
    padding: 5px 13px;
    font-size: 14px; 
    }
  }
`

const TableWrap = styled.div` 
 width: 100%; 
 overflow: auto;
 &::-webkit-scrollbar {
  width: 5px;
 }
  &::-webkit-scrollbar-thumb{
      background-clip: padding-box;
      background-color: #f56400;
      border-radius: 15px;
      border: 5px solid transparent;
  }
`
const Table = styled.table` 
  width: 100%;
  caption {
    display: none;
  } 
  th, tr, td {
    vertical-align: middle;
    border: 1px solid #707070;
  }
  th, td {
    padding: 10px;
    text-align: center;
  } 
  @media ${media.desktop}{  
    th, td {
    padding: 7px; 
    font-size: 14px;
    white-space: pre;  
    }
    td {
      .select { 
        &>div { 
          &>div {
            width: 100px;
            font-size: 14px;
          }
        }
      }
    }
  }
`

const MoreButton = styled.div`
  margin-top: 50px;
  text-align: center;
  button {
    border: 1px solid #f56400;
    padding: 8px 10px;
    border-radius: 0;
    color: #f56400;
    width: 200px;
    height: 45px;
  }
  @media ${media.tablet} { 
    button {  
      width: 150px;
      height: 35px;
      font-size: 14px;
    }
  } 
`