import React, { useRef } from "react";

const NotePopup = ({ showModal, modalNote, onCloseModal }) => {
  const popupRef = useRef(null);

  return (
    <div
      className={`${
        showModal ? "fixed" : "hidden"
      } inset-0 flex flex-col justify-center w-screen items-center bg-gray-900`}
    >
      <div
        ref={popupRef}
        className="w-5/6 h-16 flex  flex-row justify-end items-center"
      >
        <button
          className=" font-semibold text-3xl text-white p-3 "
          onClick={onCloseModal}
        >
          CLOSE
        </button>
      </div>
      <div className="flex flex-col justify-start w-2/3 rounded-lg gap-3 overflow-hidden">
        <h2 className="text-2xl font-semibold p-2 border-2 outline-0 rounded-md break-all text-gray-300">
          {modalNote?.title}
        </h2>
        <p className="flex flex-wrap break-all border-2 bg-gray-900 p-2 text-xl text-gray-300 outline-none rounded-md overflow-y-scroll">
          {modalNote?.note}
        </p>
      </div>
    </div>
  );
};

export default NotePopup;
