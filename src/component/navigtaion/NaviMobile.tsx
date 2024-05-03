import React, { useState } from "react";
import styled from "styled-components";
import searchICON from "../../assets/img/searchICON.svg";
import MenuBar from "../../assets/img/MenuBar.svg";
const NavigationMobile = styled.div`
  @media (max-width: 767px) {
    display: block;
  }
  .bottomNav {
    position: fixed;
    bottom: 0;
    left: 0;
  }
  nav {
    display: flex;
    justify-content: space-between;
    .second-menu {
      display: flex;
    }
    .side-menu {
      div {
        display: flex;
      }
    }
  }

  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 5px;
`;
const SearchButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${searchICON});
  background-position: center;
  position: absolute;
  right: 20px;
`;

const SideMenu = styled.div<{ menu?: string }>`
  display: ${(props) => (props.menu === "true" ? "block" : "hidden")};
  width: 300px;
  height: 100dvh;
  z-index: 2;
  background-color: aliceblue;
  position: fixed;
  transition: left 0.3s;
  top: 0;
  left: ${(props) =>
    props.menu === "true" ? "0" : "-300px"}; /* 트랜지션 속성을 left에 적용 */
`;
const BackPage = styled.div<{ menu?: string }>`
  display: ${(props) => (props.menu === "true" ? "block" : "none")};
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 100dvh;
  position: fixed;
  left: 0;
  top: 0;
`;

export const NaviMobile = () => {
  const [menu, setMenu] = useState("false");
  const handleClick = () => {
    if (menu === "false") {
      setMenu("true");
    } else if (menu === "true") {
      setMenu("false");
    }
  };
  return (
    <NavigationMobile className="screen-width lg:hidden">
      <nav className=" md:flex justify-between items-center py-3 px-3 ">
        <div>
          <img
            src={MenuBar}
            alt="menubar"
            className="menu_bar w-8 h-8 cursor-pointer"
            onClick={handleClick}
          />
          <SideMenu menu={menu.toString()} className="side-menu">
            <div className=" relative md:flex justify-center items-center p-3">
              <input
                placeholder="검색어를 입력해주세요"
                type="text"
                className="border-2 rounded-md w-[280px] py-1 pl-[8px] text-[14px] focus:outline-green-600"
              />
              <SearchButton className="button"></SearchButton>
            </div>
            <ul>
              <li></li>
              <li className="mysm:text-blue-600">2</li>
              <li className="sm:text-blue-100">3</li>
              <li className="sm:text-red-500">4</li>
              <li>
                <p onClick={handleClick}>닫기</p>
              </li>
            </ul>
          </SideMenu>
          <BackPage
            menu={menu.toString()}
            className="back"
            onClick={handleClick}
          ></BackPage>
        </div>
        <div>
          <img src={searchICON} alt="" className="logo w-10 h-10" />
        </div>
        <div>
          <ul className="md:flex justify-between  w-42 second-menu font-semibold">
            <li className="px-2 cursor-pointer">
              <span onClick={handleClick}>장바구니</span>
            </li>
            <li className="px-2 cursor-pointer">
              <span>마이페이지</span>
            </li>
          </ul>
        </div>
      </nav>
    </NavigationMobile>
  );
};

// {/* <div className="lg:flex justify-center items-center relative">
// <input
//   type="text"
//   className="border-2 rounded-md w-72 p-1 focus:outline-green-600"
// />
// <SearchButton>{/* <img src={searchICON} alt="" /> */}</SearchButton> */}
