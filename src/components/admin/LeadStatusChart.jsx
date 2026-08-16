"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const defaultData = [
  { name: "New", value: 40 },
  { name: "Contacted", value: 30 },
  { name: "Qualified", value: 20 },
  { name: "Negotiating", value: 27 },
  { name: "Unqualified", value: 18 },
  { name: "Closed", value: 23 },
];

export default function LeadStatusChart({ data = defaultData }) {
  return (
    <div className="bg-white p-2 rounded-3xl shadow-md w-full">
      <h3 className="text-xl font-bold mb-4 text-slate-800">
        Lead Status Distribution
      </h3>

      <div className="h-80 w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, "auto"]}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              stroke="#cbd5e1"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg">
                      <p className="font-semibold">{payload[0].payload.name}</p>
                      <p className="text-teal-300">
                        Leads: {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Lead Status"
              dataKey="value"
              stroke="#0F4C5C"
              fill="#0F4C5C"
              fillOpacity={0.35}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}