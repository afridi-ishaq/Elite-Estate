"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Default fallback data if no prop is supplied
const defaultData = [
  { month: "Jan", leads: 12 },
  { month: "Feb", leads: 19 },
  { month: "Mar", leads: 25 },
  { month: "Apr", leads: 18 },
  { month: "May", leads: 35 },
  { month: "Jun", leads: 42 },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1">
          {data.month}
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <p className="text-xs font-medium text-slate-200">
            Leads:{" "}
            <span className="font-semibold text-white ml-0.5">
              {data.leads?.toLocaleString() ?? 0}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}

export default function LeadsChart({ data = defaultData }) {
  // Dynamically calculate metrics from the passed dataset
  const { totalLeads, growthRate } = useMemo(() => {
    if (!data || data.length === 0) return { totalLeads: 0, growthRate: 0 };
    
    const total = data.reduce((acc, curr) => acc + (curr.leads || 0), 0);
    
    if (data.length < 2) return { totalLeads: total, growthRate: 0 };
    
    const last = data[data.length - 1].leads || 0;
    const previous = data[data.length - 2].leads || 0;
    const growth = previous > 0 ? (((last - previous) / previous) * 100).toFixed(1) : 0;
    
    return { totalLeads: total, growthRate: growth };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-center h-[360px]">
        <p className="text-sm font-medium text-slate-400">No leads data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-full min-w-0 flex flex-col gap-6">
      {/* Dynamic Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            Leads Overview
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time client acquisition and inquiry trends
          </p>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="flex items-center gap-2">
          {growthRate !== 0 && (
            <div
              className={`hidden sm:flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                growthRate >= 0
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-rose-50 text-rose-700 border border-rose-200/60"
              }`}
            >
              {growthRate >= 0 ? `+${growthRate}%` : `${growthRate}%`}
            </div>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
            <span>Total:</span>
            <span className="text-slate-900 font-semibold">
              {totalLeads.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#f1f5f9"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              allowDecimals={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#leadsGradient)"
              activeDot={{
                r: 6,
                fill: "#10b981",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}