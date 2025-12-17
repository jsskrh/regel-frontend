
"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Ban,
  CircleDashed,
  ClockArrowDown,
  HelpCircle,
  MailCheck,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useGetAccountQuery } from "@/lib/features/account/accountApi"; // Assuming this is needed for BalanceInfo

// Helper Icon
function CircleCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// BalanceInfo (local to this component, or import if already generic)
export const BalanceInfo = ({
  title,
  score,
  maxScore,
  icon,
  badgeColor,
  progressColor,
  amonut,
}: {
  title: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
  badgeColor: string;
  progressColor: string;
  amonut: number;
}) => {
  return (
    <Card className="bg-white shadow-md rounded-lg p-2 w-full ">
      <CardHeader className="flex-row items-center p-0 ml-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <div className="flex items-center w-full">
        <div className="w-6 h-6 shrink-0 mr-1 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-sm">₦</span>
        </div>

        <CardContent className="p-1 w-full ">
          <div className="flex mb-1">
            <div className="flex items-center w-full">
              <span className="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {amonut?.toLocaleString()}
              </span>
              <span
                className={`px-2 py-1 rounded-lg ${badgeColor} text-${badgeColor}-500 text-xs`}
              >
                {score} / {maxScore}
              </span>
            </div>
          </div>
          <Progress
            value={(score / maxScore) * 100}
            className={`overflow-hidden bg-${progressColor}-50 h-1 rounded-full w-full`}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export function SuccessfulPopup({
  title,
  message,
  details = [],
  iconProps,
  className,
  buttonTitle,
  isOpen,
  onClose,
  balance,
  smsCost,
}: {
  title: string;
  message: string;
  details?: { label: string; value: string }[];
  iconProps?: React.SVGProps<SVGSVGElement>;
  className?: string;
  buttonTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  balance?: number;
  smsCost?: number;
}) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50",
        className
      )}
    >
      <div className="bg-white rounded-lg shadow-md p-4 w-96 space-y-4">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-1 ">
          <CircleCheckIcon
            className="h-12 w-12 text-green-500"
            {...iconProps}
          />
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>
        <div className="flex justify-between space-x-2">
          {/* Note: BalanceInfo here is the local one, not the common one */}
          <BalanceInfo
            title="Balance"
            amonut={balance || 0}
            score={0} // Placeholder
            maxScore={0} // Placeholder
            icon={<HelpCircle className="text-blue-500 w-5 h-5" />}
            badgeColor="bg-green-50"
            progressColor="blue"
          />
          <BalanceInfo
            title="SMS Cost"
            amonut={smsCost || 0}
            score={0} // Placeholder
            maxScore={0} // Placeholder
            icon={<HelpCircle className="text-blue-500 w-5 h-5" />}
            badgeColor="bg-red-50"
            progressColor="blue"
          />
        </div>

        {/* Card Section */}
        {details.length > 0 && (
          <Card className="mb-2">
            <CardHeader className=" p-4">
              <CardTitle className="text-base font-normal ">
                Report Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1">
              {details.map((detail, index) => (
                <div key={index}>
                  {detail.value !== "0" ? (
                    <div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-muted-foreground flex items-center">
                          {detail.label === "Processed" ? (
                            <CircleDashed className="h-4 w-4 text-green-400" />
                          ) : detail.label === "Sent" ? (
                            <MailCheck className="h-4 w-4 text-green-400" />
                          ) : detail.label === "Queued" ? (
                            <ClockArrowDown className="h-4 w-4 text-green-400" />
                          ) : (
                            <Ban className="h-4 w-4 text-green-500" />
                          )}
                          <span className="text-muted-foreground px-2">
                            {detail.label}
                          </span>
                        </span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                      {index < details.length - 1 && <Separator />}
                    </div>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Footer Section */}
        {buttonTitle && (
          <div className="w-full">
            <Button onClick={onClose} className="w-full">
              {buttonTitle}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Removed PaymentSuccessful and PaymentSuccessful3 as they are not needed here
