import styled from "styled-components";

const Footer = () => {
  const now = new Date();	 
  const year = now.getFullYear();
  return (
    <FooterWrap>
      &copy; copyright {year} donation bean. All Rights Reserved.
    </FooterWrap>
  )
}

export default Footer

const FooterWrap = styled.footer`
  text-align: center;   
  border-top: 1px solid #f1f1f1;
  padding: 20px 0;
`
