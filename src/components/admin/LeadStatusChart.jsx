"use client";

import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";

const STATUS_STYLE = {
  NEW: { label: "New", color: "#4F46E5" },
  CONTACTED: { label: "Contacted", color: "#0284C7" },
  INTERESTED: { label: "Interested", color: "#0D9488" },
  VISIT_SCHEDULED: { label: "Visit Scheduled", color: "#D97706" },
  CLOSED: { label: "Closed", color: "#059669" },
};

const FALLBACK_COLORS = ["#4F46E5", "#0284C7", "#0D9488", "#D97706", "#059669", "#64748B"];

function GaugeTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950/95 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-md">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {d.label}
        </p>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
          <p className="text-xs font-medium text-slate-200">
            Leads: <span className="ml-0.5 font-semibold text-white">{d.value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius - 3}
      outerRadius={outerRadius + 5}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

export default function LeadStatusChart({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const items = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        label: STATUS_STYLE[d.name]?.label || d.name,
        color: d.color || STATUS_STYLE[d.name]?.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length],
      })),
    [data]
  );

  const total = useMemo(() => items.reduce((a, c) => a + (c.value || 0), 0), [items]);

  if (!items.length || total === 0) {
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center text-center">
        <p className="text-sm font-medium text-slate-400">No lead data yet</p>
      </div>
    );
  }

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="relative h-[220px] w-full sm:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeShape={renderActiveShape}
              data={items}
              cx="50%"
              cy="78%"
              startAngle={180}
              endAngle={0}
              innerRadius="68%"
              outerRadius="95%"
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {items.map((entry, index) => (
                <Cell key={index} fill={entry.color} className="cursor-pointer outline-none" />
              ))}
            </Pie>
            <Tooltip content={<GaugeTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-x-0 bottom-[20%] flex flex-col items-center text-center">
          <span className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {active ? active.value : total}
          </span>
          <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
            {active ? active.label : "Total leads"}
          </span>
          {active && (
            <span className="mt-0.5 text-[10px] font-semibold" style={{ color: active.color }}>
              {((active.value / total) * 100).toFixed(1)}% share
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition ${
              activeIndex === index
                ? "border-slate-300 bg-slate-50 shadow-sm"
                : "border-slate-100 bg-white hover:bg-slate-50/60"
            }`}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate font-medium text-slate-600">{item.label}</span>
            </span>
            <span className="ml-2 shrink-0 font-semibold text-slate-900">{item.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}