import styled from "styled-components";
import { BsClipboard2Heart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUser } from "@/util/userinfo";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom"; 

interface Response {
  ok: boolean;
  userinfo: {
    user_name: string;
    user_avatar: string | null;
    user_id: string;
    user_email: string;
    user_nick: string;
    user_phone: string;
    user_createAt: number;
  };
}

const AdminPage = () => {
  const user = getUser();
  const { data } = useQuery<Response>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/user/me?id=${user?.id}`)
        .then((res) => res.data),
  });

  const indexMatch = useMatch("/admin");
  const infoMatch = useMatch("/admin/account"); 
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);
  return (
    <HeaderPadding>
      <Center>
        <SidBar>
          <UserNameBox>
            <p>{data?.userinfo?.user_nick}님,</p>
            <p>반갑습니다</p>
            <span>기부콩과 만난지 {data?.userinfo?.user_createAt}일째</span>
          </UserNameBox>
          <ul>
            <li>
              <Link
                to={`/admin`}
                style={{ color: indexMatch ? "#f56400" : "" }}
              >
                <span>
                  <BsClipboard2Heart />
                </span>
                <span>기부목록</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/account"
                style={{ color: infoMatch ? "#f56400" : "" }}
              >
                <span>
                  <FaRegUser />
                </span>
                <span>회원목록</span>
              </Link>
            </li> 
          </ul>
        </SidBar>
        <Main>
          <Outlet />
        </Main>
      </Center>
    </HeaderPadding>
  );
};

export default AdminPage;

const sizes = {
  tablet: "768px",
  desktop: "1200px",
  mobile: "375px",
};

const media = {
  tablet: `(max-width: ${sizes.tablet})`,
  desktop: `(max-width: ${sizes.desktop})`,
  mobile: `(max-width: ${sizes.mobile})`,
};

const HeaderPadding = styled.div` 
  padding: 200px 10px 50px 10px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  @media ${media.tablet} { 
    padding: 170px 10px 50px 10px;
  }
  @media ${media.mobile} { 
    padding: 130px 10px 50px 10px;
  }
`;

const Center = styled.div` 
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  gap: 20px;
  @media ${media.tablet} {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;

const SidBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  li {
    padding: 16px 0px 16px 20px;
    border-bottom: 1px solid #ececec;
    font-family: 'NanumSquareNeo-Variable';
    @media ${media.mobile} { 
      &:last-child { border-bottom:0; }
    }
    span {
      font-weight: bolder;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`;
const UserNameBox = styled.div` 
  font-family: 'NanumSquareNeo-Variable';
  background: #f56400;
  padding: 30px 15px 20px 15px;
  color: white;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  p {
    font-weight: bold;

    font-size: 18px;

    margin-top: 10px;
  }
  span {
    display: block;
    margin-top: 10px;
    font-size: 12px;
  }
`;

const Main = styled.div`
  grid-column: span 3;
  li {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    svg {
      color: #dedede;
    }
    span {
      &:first-child {
        display: flex;
        align-items: center;
      }

      &:last-child {
        font-weight: 500;
      }
    }
  }
`;
