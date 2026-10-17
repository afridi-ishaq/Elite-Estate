"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatNumber = (num) => (num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num);

const shortCity = (name) =>
  String(name).length > 9 ? `${String(name).slice(0, 8)}…` : name;

function CityTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950/95 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-md">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {d.city}
        </p>
        <p className="text-xs font-medium text-slate-200">
          Listings: <span className="ml-0.5 font-semibold text-white">{d.count}</span>
        </p>
      </div>
    );
  }
  return null;
}

export default function PropertiesCityChart({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center text-center">
        <p className="text-sm font-medium text-slate-400">No city data yet</p>
      </div>
    );
  }

  return (
    <div className="h-[240px] w-full min-w-0 sm:h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 12, right: 8, left: -16, bottom: 0 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />

          <XAxis
            dataKey="city"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
            tickFormatter={shortCity}
            interval="preserveStartEnd"
            minTickGap={8}
            dy={8}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            tickFormatter={formatNumber}
            allowDecimals={false}
            domain={[0, (dataMax) => Math.max(1, Math.ceil(dataMax * 1.2))]}
          />

          <Tooltip content={<CityTooltip />} cursor={false} />

          <Bar
            dataKey="count"
            radius={[6, 6, 0, 0]}
            maxBarSize={38}
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={index === activeIndex ? "#C89B3C" : entry.color || "#0F4C5C"}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.65}
                className="cursor-pointer transition-all duration-150"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}