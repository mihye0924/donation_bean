import styled from "styled-components"
import Button from "./Button"
import CheckBox from "./CheckBox"

const AdminPageAccountList = () => {
  return (
    <AdminPageWrap>
      <h1>회원목록</h1>
      <ButtonBox> 
        <Button>수정</Button>
        <Button>탈퇴</Button>
      </ButtonBox>
      <Table>
        <caption>회원목록</caption>
        <thead></thead>
        <tbody>
          <tr>
            <th>
              <CheckBox  
                  type="square"
                  value={0} 
                  name="모두동의"
                  checked={false}
                />
            </th>
            <th>번호</th>
            <th>이름</th>
            <th>아이디</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>권한</th>
          </tr>
          <tr>
            <td> 
              <CheckBox  
                type="square" 
                value={0} 
                name="체크"
                checked={true}
              />
            </td>
            <td>1</td>
            <td>조미혜</td>
            <td>mihye0924</td>
            <td>01047755749</td>
            <td>mihye0924@naver.com</td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
    </AdminPageWrap>
  )
}

export default AdminPageAccountList

const AdminPageWrap = styled.div`
   h1 {
    color: #f56400;
    font-family: 'NanumSquareNeo-Variable';
    font-size: 40px;
    font-weight: 900;
   }
`
const ButtonBox = styled.div`
  margin-top: 50px; 
`
const Table = styled.table`
  border: 1px solid #707070;
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
`