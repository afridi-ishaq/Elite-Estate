"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector,
} from "recharts";

const defaultData = [
  { name: "New", value: 40, color: "#0F4C5C" },
  { name: "Contacted", value: 30, color: "#E36414" },
  { name: "Qualified", value: 20, color: "#FB8B24" },
  { name: "Negotiating", value: 27, color: "#5F0F40" },
  { name: "Unqualified", value: 18, color: "#9A031E" },
  { name: "Closed", value: 23, color: "#2A9D8F" },
];

// Renders an enlarged sector when a slice is hovered
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function LeadStatusChart({ data = defaultData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalLeads = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md w-full border border-slate-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-slate-800">
          Lead Status Distribution
        </h3>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
          Total: {totalLeads}
        </span>
      </div>

      <div className="h-80 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || defaultData[index % defaultData.length].color}
                  className="transition-all duration-300 cursor-pointer outline-none"
                />
              ))}
            </Pie>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0];
                  const percentage = ((item.value / totalLeads) * 100).toFixed(1);
                  return (
                    <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-xl border border-slate-800">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-teal-300">
                        Leads: <span className="font-bold">{item.value}</span> ({percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs font-medium text-slate-600 mr-2">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center overlay text for donut metrics */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-2xl font-extrabold text-slate-800">
            {activeIndex !== null ? data[activeIndex].value : totalLeads}
          </span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            {activeIndex !== null ? data[activeIndex].name : "Total Leads"}
          </span>
        </div>
      </div>
    </div>
  );
}