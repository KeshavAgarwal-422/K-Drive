import { useState, React } from "react";
import { useStateContext } from "../Context/index.js";
import axios from "axios";
const JWT =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmU1ZDUzMy1lMmNmLTRiY2MtYWFlNC01NjhmYmMzOWY1NTciLCJlbWFpbCI6Imtlc2hhdi5hZ2Fyd2FsNDIyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyOTFjNWMxN2YzZGY5NTgxZDRlNiIsInNjb3BlZEtleVNlY3JldCI6IjRiMmIzMTk4ZDc1NDZhZmE5MDY1NDQyMTI4NmUzMDRjNGJhOTRlYTcxYjRhOTg0ZDFjMTM4MGZiZTAxMTZiMmEiLCJpYXQiOjE2ODM1NjM4MzZ9.7spIX4RgajoWYFzYpNKVB4OFekD_EWaTvQjRg_jzDxw";

const FileUpload = () => {
  const { addFiles, connect, address } = useStateContext();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("File Not Selected");
  const [loading, setLoading] = useState(false);

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (file) {
      try {
        const formData = new FormData();

        formData.append("file", file);

        const metadata = JSON.stringify({
          name: "File name",
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
          cidVersion: 0,
        });
        formData.append("pinataOptions", options);

        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `text/plain`,
              Authorization: JWT,
            },
          }
        );

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        if (!address) {
          connect();
        }

        await addFiles(ImgHash, fileName);
        setLoading(false);
        setFileName("File Not Selected");
        setFile(null);
      } catch (error) {
        alert("Unable to upload file to Pinata", error);
      }
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center m-10 text-[30px] gap-5 font-medium "
        onSubmit={handleSubmit}
      >
        <p className="text-green-400">
          Account : {address ? address : "Not connected"}
        </p>
        <label htmlFor="file-upload">Select File:</label>
        <div>
          <input
            disabled={!address}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
            className="pl-36"
          />
        </div>
        <div className="text-red-500">File: {fileName}</div>

        <button
          type="submit"
          className="cursor-pointer h-12 w-52 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-2xl px-5  text-center m-3"
          disabled={!file}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
