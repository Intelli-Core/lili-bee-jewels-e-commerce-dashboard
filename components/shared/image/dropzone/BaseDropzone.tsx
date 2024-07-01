"use client";

import React from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload } from "lucide-react";

type BaseDropzoneProps = {
  maxFiles: number;
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  isMultiple: boolean;
  children: React.ReactNode;
};

const BaseDropzone = ({
  maxFiles,
  onDrop,
  isMultiple,
  children,
}: BaseDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`relative h-full items-center justify-center cursor-pointer ${isMultiple ? "w-full" : "w-[154px]"} image-dropzone-base`}
    >
      <input type="file" {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Upload />
            <span>Upload image</span>
          </div>
          {children}
        </>
      )}
    </div>
  );
};

export default BaseDropzone;
