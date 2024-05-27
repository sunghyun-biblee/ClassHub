import React from "react";

export const Heart = () => {
  return (
    <div className="lg:w-5 md:w-5 mr-1 h-5 cursor-pointer">
      <svg
        data-slot="icon"
        fill="none"
        strokeWidth="1.5"
        stroke="#D00058"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        ></path>
      </svg>
    </div>
  );
};
