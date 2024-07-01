"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { XCircle, Pencil } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { NextImageOpt } from "@/types";
import { validateImage } from "@/lib/utils";
import { toast } from "sonner";

type ImagePreviewProps = {
  file: File | string | undefined;
  existingImage?: NextImageOpt;
  mode: "create" | "edit";
  type: "single" | "multi";
  onRemove: (event: React.MouseEvent) => void;
};

const ImagePreview = ({ ...props }: ImagePreviewProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (props.file instanceof File) {
      validateImage(props.file, (isValid, errorMessage) => {
        if (isValid) {
          const objectUrl = URL.createObjectURL(props.file);
          setPreview(objectUrl);
          return () => URL.revokeObjectURL(objectUrl);
        } else {
          toast.error(errorMessage, { position: "top-center" });
        }
      });
    } else if (props.existingImage) {
      setPreview(props.existingImage.src);
    } else {
      setPreview(null);
    }
  }, [props.file, props.existingImage]);

  const handleMouseEnter = () => {
    if (props.mode === "edit") {
      setHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (props.mode === "edit") {
      setHover(false);
    }
  };

  return (
    preview && (
      <div
        className={`p-1 ${props.type === "single" ? "w-[190px]" : "w-[80px]"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AspectRatio ratio={1 / 1}>
          <NextImage
            src={preview}
            alt="Preview"
            className="h-auto max-w-full rounded-sm"
            fill
          />
          {props.mode === "edit" && hover && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 rounded-md pointer-events-none">
              <Pencil size={48} color="white" />
            </div>
          )}
          {props.mode === "create" && (
            <XCircle
              className="absolute top-0 right-0 p-1 text-red-500"
              onClick={props.onRemove}
              size={props.type === "single" ? 25 : 22}
            />
          )}
        </AspectRatio>
      </div>
    )
  );
};

export default ImagePreview;
