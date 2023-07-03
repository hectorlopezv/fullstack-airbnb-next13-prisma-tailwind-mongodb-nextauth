"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
declare global {
  var cloudinary: any;
}
type Props = {
  onChange: (imageSrc: string) => void;
  value: string;
};

export default function ImageUpload({ onChange, value }: Props) {
  const [loading, setLoading] = useState(false);
  const onUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={onUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70
            transition border-dashed border-2 border-neutral-300 
            flex flex-col justify-center items-center
            gap-4 text-neutral-600 rounded-lg p-20"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value ? (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  alt="image upload"
                  className="object-cover rounded-md"
                  src={value}
                />
              </div>
            ) : null}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
