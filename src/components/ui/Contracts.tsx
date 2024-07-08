"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { Tasks: "Completed", Contracts: 275, fill: "#14532d" },  //Green-900                  //Data from Backend
  { Tasks: "In-Progress",Contracts: 200, fill: "#facc15" }, //Yellow-400
  { Tasks: "No Progress", Contracts: 287, fill: "#EE4B2B" }, //Red-900
]

const chartConfig = {
  Contracts: {
    label: "Contracts",
  },
  chrome: {
    label: "Chrome",
    color: "#FF6384",
  },
  safari: {
    label: "Safari",
    color: "#36A2EB",
  },
  firefox: {
    label: "Firefox",
    color: "#FFCE56",
  },
  edge: {
    label: "Edge",
    color: "#4BC0C0",
  },
  other: {
    label: "Other",
    color: "#9966FF",
  },
} satisfies ChartConfig

export function Contracts() {
  const totalContracts = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.Contracts, 0)
  }, [])

  return (
    <Card className="w-full max-w-3xl bg-neutral-950 text-white p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-medium">Contracts</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="Contracts"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalContracts.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Contracts
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total contracts for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

