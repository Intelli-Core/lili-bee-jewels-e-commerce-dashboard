import { Currency, Upload } from "lucide-react";
import React, { useEffect, useRef } from "react";
import ImagePreview from "./dropzone/ImagePreview";
import { toast } from "sonner";
import { validateImage } from "@/lib/utils";

type ImageInputProps = {
  mode: "create" | "edit";
  value: File | string | undefined;
  formReset: boolean;
  onChange: (file: File | undefined) => void;
};

const ImageInput = ({ ...props }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.formReset && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = event.target.files?.[0] || undefined;
    if (file) {
      validateImage(file, (isValid, errorMessage) => {
        if (isValid) {
          props.onChange(file);
        } else {
          toast.error(errorMessage, { position: "top-center" });
        }
      });
    } else {
      props.onChange(undefined);
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onChange(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="h-full items-center justify-center cursor-pointer w-full image-dropzone-base"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {!props.value && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Upload />
          <span>Upload image</span>
        </div>
      )}
      <ImagePreview
        mode={props.mode}
        file={props.value}
        onRemove={(event) => handleRemoveImage(event)}
        type={"single"}
      />
    </div>
  );
};

export default ImageInput;
