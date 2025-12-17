"use client";

import { useState } from "react";
import { useLazyGenerateUploadUrlQuery } from "@/lib/features/account/accountApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onUploadSuccess: (fileUrl: string) => void;
}

export function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [generateUploadUrl, { isLoading }] = useLazyGenerateUploadUrlQuery();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    
    if (!file.type) {
        toast.error("Could not determine file type. Please select a valid file.");
        return;
    }

    try {
      // 1. Get pre-signed URL
      const { signedUrl, finalFileUrl } = await generateUploadUrl({
        fileName: file.name,
        fileType: file.type,
      }).unwrap();

      if (!signedUrl || !finalFileUrl) {
        throw new Error("Failed to get upload URL.");
      }

      // 2. Upload file to S3
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed.");
      }

      // 3. Notify parent component of success
      onUploadSuccess(finalFileUrl);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error(error.message || "An error occurred during file upload.");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={isLoading || !file}>
        {isLoading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}