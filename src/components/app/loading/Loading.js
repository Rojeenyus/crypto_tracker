import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="modal c-modal">
      <ReactLoading type="spin" height={"100px"} width={"100px"} />
    </div>
  );
}

export default Loading;
