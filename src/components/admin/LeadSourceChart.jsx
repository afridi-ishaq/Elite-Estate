"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Website: "#0F4C5C",
  "Facebook Ads": "#4F46E5",
  "Google Ads": "#0284C7",
  WhatsApp: "#059669",
  Referral: "#C89B3C",
  Manual: "#64748B",
};

function SourceTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950/95 px-3.5 py-2.5 text-white shadow-2xl">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {d.name}
        </p>
        <p className="text-xs font-medium text-slate-200">
          Leads: <span className="ml-0.5 font-semibold text-white">{d.value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export default function LeadSourceChart({ data = [] }) {
  if (!data.length || data.every((d) => d.value === 0)) {
    return (
      <div className="flex min-h-[160px] w-full items-center justify-center text-center">
        <p className="text-sm font-medium text-slate-400">No leads yet</p>
      </div>
    );
  }

  // About 44px per source so bars never get cramped
  const height = Math.max(200, data.length * 44 + 30);

  return (
    <div className="w-full min-w-0" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 24, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={84}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip content={<SourceTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={26}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#0F4C5C"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}