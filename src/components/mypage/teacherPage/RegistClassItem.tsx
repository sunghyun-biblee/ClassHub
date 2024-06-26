import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import axios from "api/axios";
import requests from "api/requests";

type IclassInfo = {
  categoryId: number;
  categoryResponseDTO: null;
  classId: number;
  className: string;
  description: string;
  editDate: string | null;
  instructorsId: number;
  instructorsResponseDTO: null;
  price: number;
  regdate: string | null;
  reviewScore: number;
  summary: string;
  thumnail: File | null;
  totalVideoLength: number;
};
type IClassDetail = {
  classDetailId: number;
  classId: number;
  editDate: string | null;
  regdate: string | null;
  sectionTitle: string | null;
  title: string | null;
  video: File | null;
  videoLenght: number;
};
export interface IRegistClassProp {
  data: {
    classDetail: IClassDetail[][];
    classInfo: IclassInfo;
    learningData: number[];
    learningTime: number;
    percentage: 0;
  };
}

export interface IMyLectureItem {
  categoryId: number;
  categoryResponseDTO: null;
  classId: number;
  className: string;
  description: string;
  editDate: null | string;
  instructorsId: number;
  instructorsResponseDTO: null;
  price: number;
  regdate: string;
  reviewScore: number | string;
  summary: string;
  thumnail: number;
  totalVideoLength: number | string;
}
type IMylecture = {
  item: IMyLectureItem;
};

export const RegistClassItem = ({ item }: IMylecture) => {
  async function fetchLectureDetail(classid: number) {
    try {
      const res = await axios.get(
        `${requests.lecture.getTargetLecture}/${classid}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["lectureDeatil", item.classId],
    queryFn: () => fetchLectureDetail(item.classId),
  });
  return (
    <div className="border-[1px] shadow-[0px_1px_6px_rgba(149,157,165,0.3)] rounded-md">
      <ul
        className="grid md:grid-cols-[0.5fr,1fr,0.7fr,0.5fr,0.35fr]
mysm:grid-cols-[1fr,0.7fr,0.5fr,0.5fr] text-center items-center font-semibold text-gray-800"
      >
        <li className="py-4 font-semibold text-indigo-950 md:block mysm:hidden">
          {item.classId}
        </li>
        <li className="py-4 md:text-base mysm:text-sm md:px-0 mysm:pl-2 overflow-hidden w-[100%]  whitespace-nowrap text-ellipsis ">
          {item.className}
        </li>
        <li className="py-4">{item.regdate?.split("T")[0]}</li>
        <li className="py-4">{item.reviewScore}점</li>
        <li className="flex justify-center py-4 cursor-pointer">
          <Link to={`/mypage/teacherpage/editClass/${item.reviewScore}`}>
            {">"}
          </Link>
        </li>
      </ul>
    </div>
  );
};
