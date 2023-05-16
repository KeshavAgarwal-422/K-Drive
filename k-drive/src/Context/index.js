import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
} from "@thirdweb-dev/react";

const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x91CF5E1af2409754F3Aac1aa69595Bd14da27385"
  );

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const [showModal, setShowModal] = useState(false);

  const addFiles = async (fileHash, fileName) => {
    try {
      if (address) {
        const data = await contract.call("add", [address, fileHash, fileName]);
        alert("File Uploaded Successfully");
      } else {
        alert("Please connect wallet!");
      }
    } catch (error) {
      alert("Failed to add file ...... retry", error);
    }
  };

  const allowAccess = async (address) => {
    try {
      if (address) {
        const data = await contract.call("allow", [address]);
      } else {
        alert("Please connect wallet!");
      }
    } catch (error) {
      alert("Failed to add file ...... retry", error);
    }
  };

  const disallowAccess = async (address) => {
    try {
      if (address) {
        const data = await contract.call("disallow", address);
      } else {
        alert("Please connect wallet!");
      }
    } catch (error) {
      alert("Failed to add file ...... retry", error);
    }
  };

  const displayFiles = async (address) => {
    try {
      const data = await contract.call("display", [address]);

      return data;
    } catch (error) {
      alert("Failed to display", error);
    }
  };

  const displayShareAccess = async () => {
    const data = await contract.call("shareAccess");
    return data;
  };

  return (
    <stateContext.Provider
      value={{
        contract,
        address,
        showModal,
        setShowModal,
        disconnect,
        connect,
        addFiles,
        allowAccess,
        disallowAccess,
        displayFiles,
        displayShareAccess,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
