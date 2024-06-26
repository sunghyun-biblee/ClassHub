import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ClassCategory } from "./ClassCategory";
import { ShowClass } from "./ShowClass";
import { ClassSearchBar } from "./ClassSearchBar";
import styled from "styled-components";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Iclassitem, fetchClassList } from "./hooks/useGetArray";
import { useClassCategory } from "hooks/ClassTypeProvider";

export const Class = () => {
  const classType = useClassCategory();

  // let categoryName = "전체 강의";
  // switch (category) {
  //   case "all":
  //     categoryName = "전체 강의";
  //     break;
  //   case "devProgram":
  //     categoryName = "개발·프로그래밍";
  //     break;
  //   case "devGame":
  //     categoryName = "게임 개발";
  //     break;
  //   case "ai":
  //     categoryName = "인공지능";
  //     break;
  //   case "security":
  //     categoryName = "보안·네트워크";
  //     break;
  //   default:
  //     window.alert("오류");
  //     break;
  // }
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["classListAll"],
    queryFn: () => fetchClassList(classType.classCategoryType, 1),
  });

  return (
    <ClassContainer
      className="lg:pt-[100px] md:pt-[100px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1200px]
     lg:grid grid-cols-[1fr,4fr] md:block mysm:block "
    >
      <ClassCategory categoryType={classType.classCategoryType}></ClassCategory>
      <section className="flex flex-col px-5 ">
        <ClassSearchBar></ClassSearchBar>
        <ShowClass categoryType={classType.classCategoryType}></ShowClass>
      </section>
    </ClassContainer>
  );
};

export const ClassContainer = styled.div`
  margin: 0 auto;
`;
