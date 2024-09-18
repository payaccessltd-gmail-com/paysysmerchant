import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const CustomDocument = ({ label, selectedFile, setSelectedFile  }: any) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    // Handle the dropped files here
    setSelectedFile(files[0]);
    console.log("Files:", files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFile(files[0]);
    }
  };
  console.log(selectedFile,'the file')
console.log(selectedFile?.name,'the name')
  return (
    <div className="grid gap-1">
      <p className="text-[14px] text-[#777777]">{label}</p>
      <div
        className="border-[1px] border-[#777777] py-[24px] rounded-md border-dotted cursor-pointer text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) :(
          <label htmlFor="file-upload" className="text-[14px] text-[#9CA3AF] flex items-center gap-1 justify-center ">
          <IoCloudUploadOutline />
            Drag file here to upload document or choose file
          </label>

        )}
<input
  type="file"
  id="file-upload"
  className="hidden"
  onChange={handleFileInput}
/>
      </div>
    </div>
  );
};

export default CustomDocument;
