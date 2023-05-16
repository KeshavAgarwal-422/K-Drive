import { React, useState } from "react";
import { useStateContext } from "../Context/index.js";
import file from "../Assets/file.svg";
import EthereumAddress from "ethereum-address";

const DisplayFile = () => {
  const { displayFiles, address } = useStateContext();
  const [otherAddress, setOtherAddress] = useState("");
  const [data, setData] = useState("");

  const handleOtherAddressChange = (e) => {
    setOtherAddress(e.target.value);
  };

  const isValidUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const isImageUrl = (url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg"];
    const lowercasedUrl = url.toLowerCase();
    return imageExtensions.some((extension) =>
      lowercasedUrl.endsWith(extension)
    );
  };

  const getdata = async () => {
    let dataArray;
    try {
      if (otherAddress && EthereumAddress.isAddress(otherAddress)) {
        dataArray = await displayFiles(otherAddress);
      } else if (EthereumAddress.isAddress(otherAddress) == false) {
        alert("Please Enter a Valid Address");
        return;
      } else {
        dataArray = await displayFiles(address);
      }
    } catch (error) {
      alert("You don't have access", error);
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      const files = str_array.map((item, i) => {
        const fileName = item.split("|");
        return (
          <a href={fileName[0]}>
            <div class=" w-[350px]  h-[400px] rounded-lg  bg-gray-800  border-gray-300 border">
              <img
                class="rounded-t-lg h-[250px] w-full p-5 object-contain"
                src={
                  isValidUrl(fileName[0]) && isImageUrl(item)
                    ? fileName[0]
                    : file
                }
                alt="File"
              />

              <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white">
                  {fileName[1]}
                </h5>
              </div>
            </div>
          </a>
        );
      });
      setData(files);
    } else {
      alert("No files to display");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center w-[50%] gap-5 mt-5 p-10 border border-gray-300 ">
        <input
          type="text"
          id="address"
          onChange={handleOtherAddressChange}
          placeholder="Enter Address"
          class="bg-gray-300 border border-gray-300 text-gray-900 text-2xl rounded-lg  w-full p-2.5"
        />

        <button
          className="cursor-pointer h-12 w-40 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-2xl px-5  text-center m-3"
          onClick={getdata}
        >
          Get Data
        </button>
      </div>
      <div className="flex flex-wrap gap-7 justify-center items-center w-[90%] mt-16 mb-16">
        {data}
      </div>
    </>
  );
};
export default DisplayFile;
