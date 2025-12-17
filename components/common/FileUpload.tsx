
"use client";

import { useState } from "react";
import { useLazyGenerateUploadUrlQuery } from "@/lib/features/account/accountApi";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onUploadSuccess: (fileUrl: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}

export function FileUpload({ onUploadSuccess, onUploadStart, onUploadEnd }: FileUploadProps) {
  const [generateUploadUrl, { isLoading }] = useLazyGenerateUploadUrlQuery();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type) {
      toast.error("Could not determine file type. Please select a valid file.");
      return;
    }
    
    onUploadStart?.();

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
    } finally {
        onUploadEnd?.();
    }
  };

  return (
    <Input type="file" onChange={handleFileChange} disabled={isLoading} />
  );
}
