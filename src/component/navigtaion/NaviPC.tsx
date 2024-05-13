import React from "react";
import styled from "styled-components";
import searchICON from "../../assets/img/searchICON.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
import cart from "../../assets/img/Cart.svg";
import user from "../../assets/img/Person.svg";
import { useAuth } from "../../hook/AuthProvider";
const NavigationPC = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
  padding: 10px 0 10px 0;
  margin-top: 1px;
  /* border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 5px;
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100vw;
  background-color: #fdfdfe;
`;

const SearchButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${searchICON});
  background-position: center;
  position: absolute;
  right: 5px;
`;
export const NaviPC = () => {
  const getUser = localStorage.getItem("user");
  const { isLogin } = useAuth();

  const nav = useNavigate();

  const handleNav = (location: string) => {
    nav(`${location}`);
  };
  return (
    <NavigationPC>
      <nav className=" lg:flex justify-between items-center py-3   my-0 mx-auto max-w-[1200px] w-[100vw] h-[64px]">
        <img
          src={logo}
          alt="logo-pc"
          className="w-20 cursor-pointer object-cover"
          onClick={() => handleNav("/")}
        />
        <ul className="lg:flex justify-between w-44">
          <li
            className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer"
            onClick={() => handleNav("/class")}
          >
            <span>
              <span>강의</span>
            </span>
          </li>
          <li
            className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer"
            onClick={() => handleNav("/community")}
          >
            <span>
              <span>커뮤니티</span>
            </span>
          </li>
          {/* <li>멘토링</li> */}
        </ul>
        <div className="lg:flex justify-center items-center relative">
          <input
            type="text"
            placeholder="강의를 검색해보세요"
            className="border-2 rounded-md w-72 h-[36px] px-2 text-sm py-1 focus:outline-blue-600"
          />
          <SearchButton>{/* <img src={searchICON} alt="" /> */}</SearchButton>
        </div>
        {isLogin ? (
          <ul className="lg:flex  items-center justify-around w-80">
            <li className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer hover:bg-blue-300 hover:text-white hover:transition-colors">
              <span>
                <Link to={"mypage/dashboard"}>대시보드</Link>
              </span>
            </li>
            <li
              className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer"
              onClick={() => handleNav("/")}
            >
              <img src={cart} alt="장바구니" className="w-6" />
            </li>
            <li
              className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer"
              onClick={() => handleNav("mypage")}
            >
              <img src={user} alt="마이페이지" className="w-6" />
            </li>
          </ul>
        ) : (
          <ul className="lg:flex items-center justify-around w-48">
            <li className="lg:px-2 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer hover:bg-blue-300 hover:text-white hover:transition-colors">
              <span>
                <Link to={"signIn"}>로그인</Link>
              </span>
            </li>
            <li
              className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer
              hover:bg-blue-300
              hover:text-white hover:transition-colors
              "
              onClick={() => handleNav("/mypage")}
            >
              <span>
                <Link to={"signUp"}>회원가입</Link>
              </span>
            </li>
          </ul>
        )}
      </nav>
    </NavigationPC>
  );
};
