
"use client";

import { useEffect, useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  useGetMessageActivityQuery
} from "@/lib/features/analytics/analyticsApi";
import { GroupBy } from "@/lib/features/analytics/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  messages: {
    label: "Messages",
  },
  Success: {
    label: "Success",
    color: "hsl(var(--chart-1))",
  },
  Pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
  Failed: {
    label: "Failed",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const Statistics = () => {
  const [timeRange, setTimeRange] = useState("90d");

  const queryParams = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    let groupBy: GroupBy = GroupBy.DAY;

    switch (timeRange) {
      case "7d":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(startDate.getDate() - 90);
        groupBy = GroupBy.WEEK;
        break;
      case "180d":
        startDate.setDate(startDate.getDate() - 180);
        groupBy = GroupBy.WEEK;
        break;
      case "365d":
        startDate.setDate(startDate.getDate() - 365);
        groupBy = GroupBy.MONTH;
        break;
      default:
        startDate.setDate(startDate.getDate() - 90);
        groupBy = GroupBy.WEEK;
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      groupBy,
    };
  }, [timeRange]);

  const { data: chartData, isLoading } = useGetMessageActivityQuery(queryParams);

  return (
    <div className="grid lg:grid-cols-3 mb-8">
      <Card className="col-span-3">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b border-b-neutral-200 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-left">
            <CardTitle>Messages sent</CardTitle>
            <CardDescription>
              Showing total messages for the selected period
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="180d" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="365d" className="rounded-lg">
                Last year
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          {isLoading ? (
            <div className="aspect-auto h-[250px] w-full flex items-center justify-center">
              <p>Loading chart data...</p>
            </div>
          ) : (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="Success"
                  type="natural"
                  fill="url(#fillSuccess)"
                  stroke="var(--chart-1)"
                  stackId="a"
                />
                <Area
                  dataKey="Pending"
                  type="natural"
                  fill="url(#fillPending)"
                  stroke="var(--chart-2)"
                  stackId="a"
                />
                <Area
                  dataKey="Failed"
                  type="natural"
                  fill="url(#fillFailed)"
                  stroke="var(--chart-3)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
