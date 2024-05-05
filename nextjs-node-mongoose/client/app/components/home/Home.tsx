"use client";
import React, { useRef, useState } from "react";

const HomeMain = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const convertImageToBase64 = async (imageFile: File) => {
    if (imageFile instanceof File && imageFile.type.startsWith("image/")) {
      return new Promise((resolve, reject) => {
        if (!imageFile || !(imageFile instanceof File)) {
          reject("Invalid image file");
        }

        const reader = new FileReader();

        reader.onload = (e: any) => {
          resolve(e.target.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(imageFile);
      });
    } else {
      return imageFile;
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (file) {
      const urlData = await convertImageToBase64(file);
      if (urlData) {
        const data = {
          file: urlData,
          name: file?.name,
          size: "1024",
        };
        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/storages/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          const responseData = await response.json();
          console.log("Response data:", responseData);
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="container mx-auto w-full h-full min-h-screen flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div
          onClick={() => inputRef?.current?.click()}
          className="max-w-[500px] max-h-[300px] border-2 border-dashed border-green-600 w-full h-[300px] rounded-md cursor-pointer hover:bg-green-50 flex justify-center items-center"
        >
          {file && <p>Uploaded</p>}
          <input
            ref={inputRef}
            onChange={(e: any) => setFile(e.target.files[0])}
            type="file"
            multiple={false}
            className="hidden"
          />
        </div>
        {file && (
          <button
            onClick={() => handleUpload()}
            disabled={isLoading}
            className="w-[200px] h-[36px] bg-green-600 hover:bg-green-700 text-center text-white rounded-md"
          >
            {isLoading ? "Loading..." : "Upload"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeMain;
