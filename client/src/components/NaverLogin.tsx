import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NaverLogin = () => {
  const match = useLocation();
  const code = match.search.split("=")[1];

  useEffect(() => {
    const tokenFn = async () => {
      await fetch(`https://nid.naver.com/oauth2.0/token`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
    };
    tokenFn();
  }, []);

  return <div>NaverLogin</div>;
};

export default NaverLogin;

/* 
https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg  
*/
