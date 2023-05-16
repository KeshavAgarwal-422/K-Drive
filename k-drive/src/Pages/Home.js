import React from "react";
import waves from "../Assets/waves.svg";
import logo from "../Assets/logo-no-background.png";

import FileUpload from "../Components/FileUpload";
import { useStateContext } from "../Context/index.js";
import DisplayFile from "../Components/DisplayFile";
import ShareAccess from "../Components/ShareAccess";

const Home = () => {
  const { connect, disconnect, address, showModal, setShowModal } =
    useStateContext();
  return (
    <div
      className="overflow-y-scroll h-screen bg-center bg-cover bg-gradient-to-r from-slate-900 to-slate-700 flex-col justify-center p-10 text-gray-300 font-mono"
      style={{ backgroundImage: `url(${waves})` }}
    >
      <div className="flex justify-between  align-middle mx-10 ">
        <img src={logo} alt="" className="h-[135px]" />

        <div className="flex gap-5">
          {!showModal ? (
            <button
              className="h-12  w-32 w-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => setShowModal(true)}
            >
              Share
            </button>
          ) : (
            <div></div>
          )}
          <button
            className="h-12 w-32 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => connect()}
          >
            Connect
          </button>
          <button
            className=" h-12  w-32 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 "
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      </div>
      <div className="flex  flex-col items-center h-screen">
        <FileUpload />
        <DisplayFile />
        <ShareAccess />
      </div>
    </div>
  );
};

export default Home;
