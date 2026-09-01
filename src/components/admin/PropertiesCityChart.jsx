"use client";

import React, { useMemo, useState } from "react";
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

// Clean numeric formatting (e.g., 1200 -> 1.2k)
const formatNumber = (num) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num;
};

// Default Real Estate City Data with Professional Indigo Palette
const defaultCityData = [
  { city: "New York", count: 1420, color: "#4F46E5" },    // Deep Indigo
  { city: "Los Angeles", count: 980, color: "#0284C7" }, // Slate Sky Blue
  { city: "Miami", count: 1150, color: "#0D9488" },      // Muted Teal
  { city: "Chicago", count: 640, color: "#D97706" },      // Amber Warmth
  { city: "Austin", count: 830, color: "#059669" },       // Emerald Green
];

// Dark backdrop tooltip matching LeadStatusGauge
function CityTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-150 ease-out">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1">
          {data.city}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shadow-sm"
            style={{ backgroundColor: data.color || "#4F46E5" }}
          />
          <p className="text-xs font-medium text-slate-200">
            Active Listings:{" "}
            <span className="font-semibold text-white ml-0.5">
              {data.count?.toLocaleString() ?? 0}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}

export default function PropertiesCityChart({ data = defaultCityData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Compute total properties across all cities for top header KPI
  const totalProperties = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.count || 0), 0);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm w-full min-w-0 flex flex-col items-center justify-center min-h-[320px] text-center">
        <p className="text-sm font-medium text-slate-400">No city data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-full min-w-0 flex flex-col gap-6 font-sans">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            Properties by City
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Distribution of active listings across market regions
          </p>
        </div>

        {/* Quick KPI Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
          <span>Total:</span>
          <span className="text-slate-900 font-semibold">
            {totalProperties.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 12, left: -16, bottom: 0 }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* SVG Gradient Definitions matching Indigo theme */}
            <defs>
              <linearGradient id="cityBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={1} />
                <stop offset="100%" stopColor="#3730A3" stopOpacity={0.9} />
              </linearGradient>
              <linearGradient id="cityBarGradientHover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                <stop offset="100%" stopColor="#4338CA" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#f1f5f9"
              vertical={false}
            />

            <XAxis
              dataKey="city"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={formatNumber}
              allowDecimals={false}
              domain={[0, (dataMax) => Math.ceil(dataMax * 1.2)]}
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
                  key={`cell-${index}`}
                  fill={
                    index === activeIndex
                      ? "url(#cityBarGradientHover)"
                      : entry.color || "url(#cityBarGradient)"
                  }
                  opacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.65
                  }
                  className="transition-all duration-150 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}