import React from "react";
import { PopularClass } from "./PopularClass";
import { NewClass } from "./NewClass";
import { IClassType } from "component/class/ShowClass";

export interface classProp {
  data: IClassType[];
}

export const PreviewClass = ({ data }: classProp) => {
  return (
    <div>
      <PopularClass data={data}></PopularClass>
      <NewClass data={data}></NewClass>
    </div>
  );
};
