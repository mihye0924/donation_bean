import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [subHeaderActive, setSubHeaderActive] = useState("");
  const [subNav, setSubNav] = useState<string[]>([]);
  const [subNavActive, setSubNavActive] = useState(0);
  const [navActvie, setNavActive] = useState(true);

  // 검색 버튼 토글
  const handleActiveSearch = useCallback(() => {
    setSearchActive(!searchActive);
    if (window.innerWidth <= 375) {
      !navActvie ? setNavActive(true) : setNavActive(false);
      setSearchActive(false);
    }
  }, [navActvie, searchActive]);

  // 스크롤시 헤더 숨김/보임
  const handleScrollNav = () => {
    if (window.scrollY > 80) {
      setSubHeaderActive("active");
    } else {
      setSubHeaderActive("");
    }
    if (window.innerWidth <= 375) {
      setSubHeaderActive("");
    }
  };

  // 화면 사이즈 변경시 검색기능 변경
  const handleResizeWindow = () => {
    if (window.innerWidth <= 375) {
      setSearchActive(false);
    } else {
      setNavActive(true);
    }
  };
  useEffect(() => {
    setSubNav(["전체", "진행중", "진행종료"]);
    document.addEventListener("scroll", () => handleScrollNav());
    window.addEventListener("resize", () => handleResizeWindow());
    return () => {
      document.removeEventListener("scroll", () => handleScrollNav());
      window.removeEventListener("resize", () => handleResizeWindow());
    };
  }, []);

  return (
    <HeaderWrap>
      <HeaderBorder>
        <HeaderNav>
          <div>
            <h1>
              <Link to={""}>기부콩</Link>
            </h1>
            <button onClick={() => setNavActive(true)}>기부</button>
          </div>
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li className={`${searchActive ? "active" : ""}`}>
              <input type="text" placeholder="검색어를 입력해주세요!" />
              <button
                className={!navActvie ? "active" : ""}
                onClick={handleActiveSearch}
              />
            </li>
          </ul>
        </HeaderNav>
      </HeaderBorder>
      <HeaderBorder className={subHeaderActive}>
        {navActvie ? (
          <HeaderSubNav>
            <ul>
              {subNav.map((item, index) => {
                return (
                  <li
                    key={item}
                    className={subNavActive === index ? "active" : ""}
                  >
                    <button onClick={() => setSubNavActive(index)}>
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </HeaderSubNav>
        ) : (
          <HeaderSubSearch>
            <div>
              <input type="text" placeholder="검색어를 입력해주세요" />
              <button />
            </div>
          </HeaderSubSearch>
        )}
      </HeaderBorder>
    </HeaderWrap>
  );
};

export default Header;

const sizes = {
  desktop: "1200px",
  tablet: "768px",
  mobile: "375px",
};

// 미디어 쿼리를 위한 도우미 함수
const media = {
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  mobile: `(max-width: ${sizes.mobile})`,
};

const HeaderWrap = styled.header`
  background: #fff;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 5;
  h1 {
    font-family: "yg-jalnan";
    font-size: 32px;
    font-weight: 700;
    color: #f56400;
    @media ${media.mobile} {
      font-size: 24px;
    }
  }
  div {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    align-items: center;
    > button {
      position: relative;
      display: inline-block;
      font-family: "NanumSquareNeo-Variable";
      font-weight: 600;
      font-size: 18px;
      color: #00ab33;
      background-color: transparent;
      border: 0;
    }
    @media ${media.mobile} {
      gap: 20px;
      > span {
        font-size: 16px;
      }
    }
  }
`;
const HeaderBorder = styled.div`
  border-bottom: 1px solid #f1f1f1;
  &:last-child {
    &.active {
      display: none;
    }
  }
`;
const HeaderNav = styled.nav`
  max-width: ${sizes.desktop};
  width: 100%;
  height: 80px;
  gap: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    li > a {
      font-family: "NanumSquareNeo-Variable";
      font-weight: 600;
      font-size: 18px;
    }
    li:first-child {
      &::after {
        content: "";
        display: inline-block;
        width: 1px;
        height: 15px;
        background: #f7cdcd;
        margin: 0 15px;
        @media ${media.mobile} {
          height: 10px;
        }
      }
    }
    li:last-child {
      width: 35px;
      display: flex;
      button {
        position: relative;
        width: 35px;
        height: 35px;
        &::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 35px;
          height: 35px;
          content: "";
          background: url("/images/search.svg") no-repeat;
          background-size: cover;
        }
        background-color: transparent;
        border: 0;
      }
      input {
        display: none;
        width: 0;
        padding: 5px 20px;
        font-size: 18px;
        border-radius: 25px;
        &:focus {
          outline: 0;
        }
      }
    }
    li.active {
      overflow: hidden;
      width: 320px;
      border: 1px solid #f56400;
      border-radius: 25px;
      padding: 5px;
      transition: width 0.2s ease-in-out;
      input {
        display: block;
        width: 260px;
      }
    }
  }

  @media ${media.mobile} {
    height: 60px;
    ul {
      li > a {
        font-size: 14px;
      }
      li:last-child {
        width: 30px;
        button {
          width: 20px;
          height: 20px;
          &::after {
            width: 20px;
            height: 20px;
          }
          &.active {
            &::after {
              width: 20px;
              height: 20px;
              background: url("/images/btn-srch-close.svg") no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }
  }
`;
const HeaderSubNav = styled.nav`
  max-width: ${sizes.desktop};
  width: 100%;
  margin: 0 auto;
  ul {
    height: 65px;
    display: flex;
    align-items: center;
    li {
      position: relative;
      margin-right: 100px;
      &:first-child {
        margin-left: 20px;
      }
      &:last-child {
        &::after {
          content: none;
        }
      }
      &::after {
        position: absolute;
        content: "";
        width: 1px;
        height: 18px;
        background-color: #4b4b4b;
        display: inline-block;
        margin-left: 50px;
      }
      button {
        cursor: pointer;
        background-color: transparent;
        border: 0;
        font-family: "NanumSquareNeo-Variable";
        font-size: 18px;
        white-space: pre;
      }
      &.active {
        button {
          color: #00ab33;
          &::after {
            position: absolute;
            content: "";
            width: 100%;
            bottom: -22px;
            left: 50%;
            transform: translateX(-50%);
            height: 5px;
            background-color: #00ab33;
          }
        }
      }
    }
    @media ${media.mobile} {
      height: 50px;
      justify-content: center;
      li {
        position: relative;
        margin-right: 60px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        &::after {
          height: 15px;
          background-color: #f1f1f1;
          display: inline-block;
          margin-left: 30px;
        }
        a {
          font-size: 16px;
        }
        button {
          font-size: 14px;
        }
        &.active {
          button {
            &::after {
              bottom: -15px;
              height: 3px;
            }
          }
        }
      }
    }
  }
`;
const HeaderSubSearch = styled.div`
  width: 100%;
  justify-content: center !important;
  height: 50px;
  display: flex;
  margin: 10px 0;
  div {
    margin: 0 10px;
    width: 100%;
    border: 1px solid #f56400;
    border-radius: 25px;
    padding: 5px 15px;
  }
  input {
    &:focus {
      outline: 0;
    }
  }
  button {
    position: relative;
    width: 30px;
    height: 30px;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      content: "";
      background: url("/images/search.svg") no-repeat;
      background-size: cover;
    }
    background-color: transparent;
    border: 0;
  }
`;
