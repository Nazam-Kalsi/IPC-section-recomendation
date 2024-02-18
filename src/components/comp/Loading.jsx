import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className=" absolute z-10 top-1/2 left-1/2">
      <ReactLoading type="bubbles" color="black" className="scale-[2]" />
      <p className="font-semibold text-xl font-mono ">Loading...</p>
    </div>
  );
}

export default Loading;
