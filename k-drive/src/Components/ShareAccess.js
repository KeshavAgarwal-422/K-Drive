import { React, useMemo, useState } from "react";
import { useStateContext } from "../Context/index.js";

const ShareAccess = () => {
  const {
    allowAccess,
    disallowAccess,
    displayShareAccess,

    contract,
    showModal,
    setShowModal,
  } = useStateContext();

  const [sharedAddress, setSharedAddress] = useState();

  const handleAddressChange = (e) => {
    setSharedAddress(e.target.value);
  };

  const sharing = async () => {
    await allowAccess(sharedAddress);
    setShowModal(false);
  };
  useMemo(() => {
    const accessList = async () => {
      const addressList = await displayShareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      {showModal && (
        <div className="flex flex-col w-[50%] gap-5 mt-5 border border-gray-300 p-10">
          <div className="text-[30px] ">Share Access:</div>
          <div className="body">
            <input
              type="text"
              className="bg-gray-300 border border-gray-300 text-gray-900 text-2xl rounded-lg flex w-full p-2.5"
              placeholder="Enter Address"
              onChange={handleAddressChange}
            ></input>
          </div>
          <form id="myForm">
            <select
              id="selectNumber"
              className="bg-gray-300 border border-gray-300 text-gray-900 text-2xl rounded-lg flex w-full p-2.5"
            >
              <option className="bg-gray-300 border border-gray-300 text-gray-900 text-2xl rounded-lg flex w-full p-2.5">
                People With Access
              </option>
            </select>
          </form>
          <div className="flex w-full justify-center gap-16 ">
            <button
              className=" h-12  w-32 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg text-center mr-2 mb-2 "
              onClick={() => {
                setShowModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              className="h-12  w-32 w-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg  text-center mr-2 mb-2"
              onClick={() => sharing()}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ShareAccess;
