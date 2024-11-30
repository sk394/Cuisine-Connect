"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = () => {
  const [imageUrl, setimageUrl] = useState("");
  return (
    <div>
      <UploadDropzone
        className="text-white font-bold py-2 px-4 rounded"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files", res);
          alert("Files uploaded");
          setimageUrl(res[0].url);
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrl.length ? (
        <div className="ml-6">
          <h2>Image Preview</h2>
          <p>{imageUrl}</p>
          <img src={imageUrl} alt="Uploaded Image" />
        </div>
      ) : 'nothing here, no image uploaded yet'}
    </div>
  );
};

export default ImageUpload;
