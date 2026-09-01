"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

// Real estate sales pipeline stages & brand-aligned palette
const defaultData = [
  { name: "New", value: 40, color: "#0F4C5C" },
  { name: "Contacted", value: 30, color: "#2A9D8F" },
  { name: "Qualified", value: 24, color: "#E9C46A" },
  { name: "Negotiating", value: 18, color: "#F4A261" },
  { name: "Unqualified", value: 12, color: "#E76F51" },
  { name: "Closed", value: 28, color: "#1D3557" },
];

export default function LeadStatusChart({ data = defaultData }) {
  const [focusIndex, setFocusIndex] = useState(null);

  const totalLeads = useMemo(
    () => data.reduce((acc, item) => acc + item.value, 0),
    [data]
  );

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 w-full font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Lead Status Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            Active real estate opportunities by stage
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-2xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700">
              Total: {totalLeads} Leads
            </span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
            barCategoryGap="22%"
          >
            {/* SVG Gradient Definitions */}
            <defs>
              {data.map((entry, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`leadGrad-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              horizontal={false}
              stroke="#F1F5F9"
              strokeDasharray="4 4"
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              domain={[0, "dataMax + 5"]}
            />

            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#334155", fontSize: 12, fontWeight: 600 }}
              width={90}
            />

            <Tooltip
              cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  const percentage = ((item.value / totalLeads) * 100).toFixed(1);

                  return (
                    <div className="bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-800 text-xs flex flex-col gap-1 min-w-[140px]">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-slate-300">
                          {item.name}
                        </span>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      </div>
                      <div className="flex items-baseline justify-between gap-2 mt-1">
                        <span className="text-xl font-bold text-white">
                          {item.value}
                        </span>
                        <span className="text-slate-400 font-medium">
                          {percentage}% of total
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="value"
              radius={[0, 8, 8, 0]}
              onMouseEnter={(_, index) => setFocusIndex(index)}
              onMouseLeave={() => setFocusIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#leadGrad-${index})`}
                  opacity={focusIndex === null || focusIndex === index ? 1 : 0.4}
                  className="transition-opacity duration-200 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics Overview */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-100">
        {data.map((item, index) => (
          <div key={index} className="text-center p-2 rounded-xl bg-slate-50/60">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate">
              {item.name}
            </p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}