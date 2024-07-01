import React from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { NextImageOpt } from "@/types";
import ImagePreview from "./ImagePreview";
import { Upload } from "lucide-react";
import { validateImage } from "@/lib/utils";
import { toast } from "sonner";

type ImageDropzoneProps = {
  mode: "edit" | "create";
  value: (File | string)[] | undefined;
  existingImage?: NextImageOpt;
  maxFiles?: number;
  type: "single" | "multi";
  onChange: (files: (File | string)[] | undefined) => void;
};

const ImageDropzone = ({ ...props }: ImageDropzoneProps) => {
  const maxFiles = props.maxFiles || 4;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const currentFiles = props.value || [];
      const updatedFiles = [...currentFiles];

      if (currentFiles.length + acceptedFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} images.`, {
          position: "top-center",
        });
        return;
      }

      const validationPromises = acceptedFiles.map(
        (file) =>
          new Promise<void>((resolve) => {
            validateImage(file, (isValid, errorMessage) => {
              if (isValid) {
                updatedFiles.push(file);
              } else {
                toast.error(errorMessage, { position: "top-center" });
              }
              resolve();
            });
          }),
      );

      Promise.all(validationPromises).then(() => {
        props.onChange(updatedFiles.filter((file) => file instanceof File));
      });
    },
    maxFiles: maxFiles,
    accept: { "image/*": [] },
  });

  const handleRemoveImage = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    const updatedFiles = [...props.value!];
    updatedFiles.splice(index, 1);
    props.onChange(updatedFiles.length === 0 ? undefined : updatedFiles);
  };

  return (
    <div
      {...getRootProps()}
      className="flex items-start justify-start h-full cursor-pointer w-full image-dropzone-base"
    >
      <input type="file" {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <React.Fragment>
          {!props.value && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Upload />
              <span>Upload image</span>
              <em>(Up to 4 images max)</em>
            </div>
          )}
          <div className="flex flex-wrap items-start justify-start">
            {props.value?.map((value, index) => (
              <ImagePreview
                key={index}
                file={value instanceof File ? value : undefined}
                existingImage={
                  value instanceof File ? undefined : props.existingImage
                }
                mode={props.mode}
                onRemove={(event) => handleRemoveImage(event, index)}
                type={props.type}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ImageDropzone;
