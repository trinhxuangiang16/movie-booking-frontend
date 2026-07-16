"use client";
import { Cell } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";

import { TMovie } from "../../types/typeMovie";
import { useMemo } from "react";

export const description = "BXH Phim Hot Nhất Tháng";

const chartConfig = {
  Diem: {
    label: "Diem",
    color: "linear-gradient(90deg, #ffccf2, #97dde8)",
  },
} satisfies ChartConfig;

export function ChartTopHot({
  activeMovie,
  movies,
}: {
  movies: TMovie[];
  activeMovie: TMovie | null;
}) {
  const currentMovie = activeMovie;

  const chartData = useMemo(() => {
    if (!activeMovie) return [];
    return [...movies]
      .sort((a, b) => (b.danh_gia ?? 0) - (a.danh_gia ?? 0))
      .map((movie, index) => ({
        hang: index + 1,
        phim: movie.ten_phim,
        diem: movie.danh_gia ?? 0,
      }));
  }, [activeMovie, movies]);

  const indexOfCurrentMovie = useMemo(() => {
    if (!activeMovie) return 0;
    return chartData.findIndex((item) => item.phim === currentMovie?.ten_phim);
  }, [chartData, activeMovie, currentMovie]);

  return (
    <Card
      className="xep-hang relative w-full overflow-hidden rounded-3xl text-white ring-0
               bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,80,80,0.18)_0%,transparent_55%),linear-gradient(160deg,rgba(12,10,14,0.94),rgba(24,10,14,0.85))]
               backdrop-blur-2xl backdrop-saturate-150
               shadow-[0_20px_60px_-15px_rgba(120,120,120,0.5)]"
    >
      <CardHeader className="flex-row items-center justify-between gap-4 pb-1">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Bảng xếp hạng tháng
          </p>
          <CardTitle className="text-lg font-bold tracking-tight">
            {currentMovie?.ten_phim}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-white/5 px-3 py-1.5 text-center ring-1 ring-white/10">
            <div className="text-lg font-bold leading-none text-[#ff6b6b]">
              {currentMovie?.danh_gia}
            </div>
            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">
              điểm
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-b from-[#ff6b6b] to-[#8c1c2b] px-3 py-1.5 text-center shadow-[0_0_20px_-4px_#ff4d4d]">
            <div className="text-lg font-bold leading-none">
              #{indexOfCurrentMovie + 1}
            </div>
            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/70">
              hạng
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 28, left: -18, right: 4 }}
            barCategoryGap="28%"
          >
            <defs>
              <linearGradient id="barIdle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8a8a" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#5a1420" stopOpacity={0.35} />
              </linearGradient>
              <linearGradient id="barActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff1f1" />
                <stop offset="45%" stopColor="#ff5c5c" />
                <stop offset="100%" stopColor="#a01327" />
              </linearGradient>
              <filter
                id="activeGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="8"
                  floodColor="#ff3b3b"
                  floodOpacity="0.7"
                />
              </filter>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="2 8"
            />
            <YAxis
              domain={[0, 10]}
              tickCount={3}
              axisLine={false}
              tickLine={false}
              width={26}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
            />
            <XAxis
              dataKey="phim"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              interval={0}
              height={40}
              tick={({ x, y, payload, index }) => (
                <text
                  x={x}
                  y={Number(y) + 12}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={index === indexOfCurrentMovie ? 700 : 400}
                  fill={
                    index === indexOfCurrentMovie
                      ? "#ff8a8a"
                      : "rgba(255,255,255,0.45)"
                  }
                >
                  {String(payload.value).length > 12
                    ? `${String(payload.value).slice(0, 12)}…`
                    : payload.value}
                </text>
              )}
            />

            <ChartTooltip
              cursor={{ fill: "rgba(255,255,255,0.04)", radius: 10 }}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="rounded-xl border border-white/10 bg-black/85 px-3 py-2 shadow-2xl backdrop-blur-md">
                    <p className="text-xs font-semibold text-white">{d.phim}</p>
                    <p className="mt-0.5 text-[11px] text-white/50">
                      <span className="text-[#ff6b6b] font-semibold">
                        {d.diem}
                      </span>{" "}
                      điểm · hạng {d.hang}
                    </p>
                  </div>
                );
              }}
            />

            <Bar
              dataKey="diem"
              radius={[999, 999, 6, 6]}
              maxBarSize={26}
              isAnimationActive
            >
              {chartData.map((_, i) => {
                const active = i === indexOfCurrentMovie;
                return (
                  <Cell
                    key={i}
                    fill={active ? "url(#barActive)" : "url(#barIdle)"}
                    filter={active ? "url(#activeGlow)" : undefined}
                  />
                );
              })}
              <LabelList
                dataKey="diem"
                position="top"
                offset={12}
                content={({ x, y, width, value, index }) => (
                  <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) - 8}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={700}
                    fill={
                      index === indexOfCurrentMovie
                        ? "#ffffff"
                        : "rgba(255,255,255,0.35)"
                    }
                  >
                    {value}
                  </text>
                )}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="justify-between border-t border-white/5 pt-3">
        <p className="text-[11px] text-white/35">
          Điểm đánh giá dựa vào người dùng trong tháng.
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-white/35">
          <span className="h-2 w-2 rounded-full bg-[#ff5c5c] shadow-[0_0_8px_#ff5c5c]" />
          Đang xem
        </span>
      </CardFooter>
    </Card>
  );
}
