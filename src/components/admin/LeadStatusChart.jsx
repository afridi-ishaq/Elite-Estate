"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0F4C5C",
  "#C89B3C",
  "#4CAF50",
  "#7E57C2",
  "#F44336",
];

export default function LeadStatusChart({
  data,
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">
      <h3 className="text-xl font-bold mb-4">
        Lead Status Distribution
      </h3>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}