import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { selectClassinfo } from "./hooks/useGetArray";
import styled from "styled-components";
import axios from "api/axios";
import requests from "./../../api/requests";
import { useAuth } from "hooks/AuthProvider";
import { addCartItem } from "components/cart/hooks/addCartItem";
import { impCode } from "api/payment";

interface ClassDetailData {
  classDeatilId: number;
  classId: number;
  editDate: string | null;
  regdate: string | null;
  sectionTitle: string | null;
  title: string;
  video: File;
  videoLength: number;
}
interface ClassInfoData {
  categoryId: number;
  classId: number;
  className: string;
  description: string;
  editDate: string | null;
  instructorsId: number;
  name: string;
  price: number;
  regdate: string | null;
  reviewScore: number;
  summary: string | null;
  thumnail: string;
  totalVideoLength: number;
}
interface ClassDataType {
  classDetail: [ClassDetailData[]];
  classInfo: ClassInfoData;
  learningData: [];
  laarningTime: number;
  percentage: number;
}
export const ClassDetail = () => {
  const { userData } = useAuth();
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[2], 10);
  const { data, isLoading, isError, error } = useQuery<ClassDataType, Error>({
    queryKey: ["classDeatil", id],
    queryFn: () => selectClassinfo(id),
  });
  console.log(data);
  console.log(data?.classInfo.className);
  if (data && data.classInfo) {
    document.title = data.classInfo.className;
  }
  console.log(userData);
  const handleAddCart = (classId: number) => {
    if (!userData.userId) {
      alert("로그인 후 이용가능합니다");
      return;
    } else {
      addCartItem(classId, userData.userId);
    }
  };
  const handlePayMent = () => {
    console.log("heelo");

    let paymentNumber;

    if (data && data.classInfo.classId) {
      const IMP = window.IMP;
      IMP.init(impCode);
      paymentNumber = data.classInfo.className;

      const callback = () => {};
      IMP.request_pay(
        {
          // param
          pg: "html5_inicis", //pg사
          pay_method: "card", //결제수단
          merchant_uid: `${paymentNumber}_${new Date().getTime()}`, // 주문번호
          name: data.classInfo.className, //주문명
          amount: 100, //결제금액
          buyer_email: "gildong@gmail.com", //구매자 이메일
          buyer_name: "홍길동", // 구매자 이름
          buyer_tel: "010-4242-4242", // 구매자 번호
          buyer_addr: "서울특별시 강남구 신사동", // 구매자 주소
          buyer_postcode: "01181", // 구매자 우편번호
        },
        callback
      );
    }
  };
  return (
    <ClassDeatilContainer
      className="flex justify-center 
    lg:max-w-[1200px] mysm:w-[100vw] h-[100dvh] lg:pt-[110px] md:pt-[80px] mysm:pt-[80px]"
    >
      {!isLoading && data?.classInfo ? (
        <section className="md:w-[100vw] lg:max-w-[1200px]">
          <div className="  bg-[#002333] text-white font-semibold">
            <div className="flex lg:max-w-[1200px] md:w-[100vw] mysm:w-[100vw] lg:px-10 md:px-7  mysm:px-3  py-5 lg:justify-around md:justify-between mysm:justify-between md:gap-0 mysm:gap-1">
              <img
                src={data.classInfo.thumnail}
                alt="classimg"
                className="lg:w-[400px] md:w-[300px] mysm:w-[200px] h-auto rounded-md"
              />
              <div className="flex justify-between flex-col lg:px-10 md:px-6 mysm:px-2 min-w-[50%]">
                <ul className="md:flex md:justify-between mysm:justify-between flex-col h-[100%] w-[100%]">
                  <div>
                    <li className="lg:text-3xl mysm:text-sm py-2 md:text-2xl">
                      <span>강의 제목 : </span>
                      <span>{data.classInfo.className}</span>
                    </li>
                    <li className="lg:text-xl md:text-xl mysm:text-sm py-2">
                      <span>강사 이름 : </span>
                      <span>{data.classInfo.name}</span>
                    </li>
                  </div>
                  <div className="flex justify-between pt-20 pb-3 lg:flex-row md:flex-row mysm:flex-col">
                    <li className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-lg mysm:text-[sm]">
                      <span>카테고리 : </span>
                      <span>개발</span>
                    </li>

                    <li className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-lg mysm:text-sm">
                      <span>수강평 : </span>
                      <span>{data.classInfo.reviewScore}</span>
                    </li>
                  </div>
                </ul>
                <ul className="bg-gray-600 p-5 rounded-md lg:block md:hidden  mysm:hidden">
                  <li className="pt-1 pb-3  px-3 text-2xl">
                    <p>{data.classInfo.price.toLocaleString()}원</p>
                  </li>
                  <li className="flex justify-between pt-3 px-2 w-[100%] ">
                    <div
                      className="p-2 border-2 border-solid border-gray-400/50 rounded-lg
                    "
                    >
                      <button
                        className="p-1"
                        onClick={() => handleAddCart(data.classInfo.classId)}
                      >
                        장바구니 담기
                      </button>
                    </div>
                    <div
                      className="p-2 border-2 border-solid border-gray-400/50 rounded-lg bg-blue-500 text-white
                    "
                    >
                      <button className="p-1 " onClick={() => handlePayMent()}>
                        강의 신청하기
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:max-w-[1200px] mysm:w-[100vw] pt-3">
            <h1 className="text-3xl p-3 lg:font-extrabold md:font-bold mysm:font-semibold">
              강의 상세 정보
            </h1>
            <p className="text-3xl p-3">{data.classInfo.description}</p>
          </div>
          <div className="lg:pb-0 mysm:pb-40 md:pb-40 mysm:px-5 flex justify-center flex-col items-center">
            <h1 className="text-3xl py-10  lg:font-extrabold md:font-bold mysm:font-semibold text-left w-[100%]">
              강의 후기
            </h1>
            <div
              className="lg:px-5 md:px-5 border-2 border-solid border-gray-800/30  flex 
            lg:max-w-[1200px] md:w-[90vw] mysm:w-[90vw]
            
            items-center justify-center text-center rounded-md "
            >
              <p>아직 등록된 후기가 없습니다</p>
            </div>
          </div>
          <div>
            <ul className="text-white bg-gray-600 p-5 rounded-md lg:hidden fixed bottom-0 w-[100%] mb-[40px] flex justify-between items-center">
              <li className="  px-2 text-2xl font-semibold ">
                <p>{data.classInfo.price.toLocaleString()}원</p>
              </li>

              <div className="flex justify-between  md:w-[280px] mysm:w-[250px]">
                <li
                  className="p-2 border-2 border-solid border-gray-400/50 rounded-lg
                      "
                >
                  <button
                    className="p-1 mysm:p-0 mysm:w-[100px] text-sm"
                    onClick={() => handleAddCart(data.classInfo.classId)}
                  >
                    장바구니 담기
                  </button>
                </li>
                <li
                  className="p-2 border-2 border-solid border-gray-400/50 rounded-lg bg-blue-500 text-white
                      "
                >
                  <button
                    className="p-1 mysm:p-0 mysm:w-[100px] text-sm"
                    onClick={() => handlePayMent()}
                  >
                    강의 신청하기
                  </button>
                </li>
              </div>
            </ul>
          </div>
        </section>
      ) : (
        ""
      )}
    </ClassDeatilContainer>
  );
};

const ClassDeatilContainer = styled.div`
  height: 100dvh;
  margin: 0 auto;
`;
