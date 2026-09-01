"use client";

import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";

// Professional Real Estate CRM Palette
const defaultData = [
  { name: "New", value: 40, color: "#4F46E5" },          // Deep Indigo
  { name: "Contacted", value: 30, color: "#0284C7" },    // Slate Sky Blue
  { name: "Qualified", value: 24, color: "#0D9488" },    // Muted Teal
  { name: "Negotiating", value: 18, color: "#D97706" },  // Amber Warmth
  { name: "Unqualified", value: 12, color: "#64748B" },  // Muted Slate Gray
  { name: "Closed", value: 28, color: "#059669" },       // Emerald Victory Green
];

// Dark backdrop tooltip matching PropertiesCityChart
function GaugeTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-150 ease-out">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1">
          {data.name}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shadow-sm"
            style={{ backgroundColor: data.color }}
          />
          <p className="text-xs font-medium text-slate-200">
            Leads:{" "}
            <span className="font-semibold text-white ml-0.5">
              {data.value?.toLocaleString() ?? 0}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}

// Active shape expanding smoothly on hover
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 3}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function LeadStatusGauge({ data = defaultData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalLeads = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.value || 0), 0);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm w-full min-w-0 flex flex-col items-center justify-center min-h-[320px] text-center">
        <p className="text-sm font-medium text-slate-400">No lead data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-full min-w-0 flex flex-col gap-6 font-sans">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            Lead Status Distribution
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real Estate Conversion & Pipeline Overview
          </p>
        </div>

        {/* Header Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
          <span>Total:</span>
          <span className="text-slate-900 font-semibold">
            {totalLeads.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Semi-Donut Canvas */}
      <div className="w-full h-[240px] relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="75%"
              startAngle={180}
              endAngle={0}
              innerRadius={85}
              outerRadius={118}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || defaultData[index % defaultData.length].color}
                  className="transition-all duration-150 cursor-pointer outline-none"
                />
              ))}
            </Pie>

            <Tooltip content={<GaugeTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Readout */}
        <div className="absolute top-[50%] flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {activeIndex !== null ? data[activeIndex].value : totalLeads}
          </span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
            {activeIndex !== null ? data[activeIndex].name : "Total Pipeline"}
          </span>
          <span
            className="text-[10px] font-semibold mt-0.5 transition-colors duration-150"
            style={{
              color: activeIndex !== null ? data[activeIndex].color : "#4F46E5",
            }}
          >
            {activeIndex !== null
              ? `${((data[activeIndex].value / (totalLeads || 1)) * 100).toFixed(1)}% Share`
              : "100% Volume"}
          </span>
        </div>
      </div>

      {/* Interactive Legend Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-100">
        {data.map((item, index) => {
          const isSelected = activeIndex === index;
          return (
            <button
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all duration-150 text-left ${
                isSelected
                  ? "bg-slate-50/90 border-slate-300 shadow-sm"
                  : "bg-white border-slate-100 hover:bg-slate-50/60"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-600 truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold text-slate-900 ml-2 shrink-0">
                {item.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}