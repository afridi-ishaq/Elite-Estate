"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function LeadsChart() {
  const data = [
    { month: "Jan", leads: 12 },
    { month: "Feb", leads: 19 },
    { month: "Mar", leads: 25 },
    { month: "Apr", leads: 18 },
    { month: "May", leads: 35 },
    { month: "Jun", leads: 42 },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Leads Overview
      </h2>

      <div className="h-75">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#0F4C5C"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}