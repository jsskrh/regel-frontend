
"use client";

import React, { useState, useEffect } from "react";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useGenerateApiKeyMutation, useGetAccountQuery } from "@/lib/features/account/accountApi";
import PageHeader from "@/components/common/PageHeader";

const APIKeyManager = () => {
  const { data: user, isLoading: isAccountLoading } = useGetAccountQuery();
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [generateApiKey, { isLoading: isGenerating }] = useGenerateApiKeyMutation();
  const [isNewKey, setIsNewKey] = useState(false);

  const handleGenerateApiKey = async () => {
    try {
      const response = await generateApiKey({}).unwrap();
      setGeneratedKey(response.apiKey || null);
      setShowKey(true);
      setIsNewKey(true);
      toast.success("API Key generated successfully! Please copy it now as it will not be shown again.");
    } catch (error) {
      toast.error(error.data?.message || "Failed to generate API key.");
    }
  };

  const copyAPIKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success("API Key copied to clipboard");
    } catch {
      toast.error("Failed to copy API key");
    }
  };

  if (isAccountLoading) {
    return <p>Loading API key status...</p>;
  }

  return (
    <div>
      <PageHeader title="API Keys" description="Generate and manage your API keys." className="mb-6" />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>API Key Management</CardTitle>
          <Button
            onClick={handleGenerateApiKey}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? "Generating..." : "Generate New API Key"}
          </Button>
        </CardHeader>
        <CardContent>
          {isNewKey && generatedKey ? (
            // Newly generated key
            <div className="space-y-3">
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex-1 max-w-[508px]">
                  <div className="text-sm text-gray-500 truncate w-2/3">
                    {showKey ? generatedKey : "*".repeat(40)}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => copyAPIKey(generatedKey)}>
                    <Copy size={16} />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
          ) : user?.apiKeyId ? (
            // Existing key
            <div className="space-y-3">
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-500">{"*".repeat(40)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    An API key already exists. Generate a new one to replace it.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // No key
            <p className="text-center text-gray-500">
              No API key generated yet. Click "Generate New API Key" to create one.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeyManager;
