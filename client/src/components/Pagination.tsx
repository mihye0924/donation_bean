import { useState } from "react";  
import styled from "styled-components";
 
interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination = (props: PaginationProps) => { 
  const [btnActive, setBtnActive] = useState(0) //현재 페이지 활성화 여부
  const numPages = Math.ceil(props.total / props.limit); //총페이지 수는 올림

  const handlePageBtn = (i:number) => {
    props.setPage(i + 1)  
    setBtnActive(i)
  } 
   
  return (
    <>
      <PageWrap>
        <PageBtn 
          onClick={() => props.setPage(props.page-1)} 
          disabled={Number(props.page) <= 1} 
        >
          &lt;
        </PageBtn>
        {Array(numPages).fill(0).map((_, i) => ( 
            <PageBtn
              key={i + 1}
              value={i}
              className={props.page === i + 1 ? 'active' : ''}
              onClick={() => handlePageBtn(i)}
              aria-current={props.page === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </PageBtn>
          ))}
        <PageBtn 
          onClick={() => props.setPage(props.page+1)} 
          disabled={props.page >= numPages} 
        >
          &gt;
        </PageBtn>
      </PageWrap>
    </>
  )
}

export default Pagination

const PageWrap = styled.div`
  text-align: center;
  margin-top: 30px;
`
const PageBtn = styled.button`
  cursor: pointer;
  font-family: 'NanumSquareNeo-Variable';
  width: 30px;
  height: 30px;
  background-color: transparent;
  color: #f56400;
  border: 1px solid #f56400;
  font-size: 10px;  
  border-radius: 50%;
  font-weight: 900;
  &:not(:first-child) {
    margin-left:5px;
  }
  &.active {
    background-color: #f56400;
    color: white;
  }
  &:disabled { 
    opacity: 0.4;
  }
`
