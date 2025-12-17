"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BalanceInfo = ({
  score = 0,
  maxScore = 0,
  amount = 0,
}: {
  score?: number;
  maxScore?: number;
  amount?: number;
}) => {
  const calculatedMaxScore = maxScore > 0 ? maxScore : 1; // Avoid division by zero
  const progressValue = (score / calculatedMaxScore) * 100;

  return (
    <Card className="bg-white rounded-xl p-4 w-full">
      <CardContent className="p-0 flex items-center gap-x-4">
        <div className="space-y-2 text-[#08261C] flex-1">
          <h2 className="text-sm font-normal leading-[145%]">Credit balance</h2>
          <p className="font-semibold leading-[120%] text-xl">₦{amount.toLocaleString()}</p>
          <Progress
            value={progressValue}
            className={`overflow-hidden bg-blue-50 h-3 rounded-full w-full`}
          />
          <p className="inline-flex items-center gap-1 text-[#04802E] text-xs leading-[145%]">
            <span className="tracking-[-0.5%] bg-[#EEFBF4] rounded-[0.625rem] px-1 flex items-center gap-x-0.5">
              <Image
                className={`size-3`}
                src="/icons/graph.svg"
                alt="graph icon"
                width={12}
                height={12}
                priority
              />
              <span>
                {score} / {maxScore}
              </span>
            </span>
            <span className="whitespace-nowrap">
              {score > amount ? "Inadequate balance" : "Adequate balance"}
            </span>
          </p>
        </div>
        <div className="size-10 border-gray-200 border flex items-center justify-center rounded-full">
          <Image
            className={`size-5`}
            src={`/icons/money.svg`}
            alt={`money icon`}
            width={20}
            height={20}
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceInfo;