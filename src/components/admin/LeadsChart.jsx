"use client";

import { useEffect, useState, useMemo, useTransition } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, Sparkles, Loader2 } from "lucide-react";
import { getLeadsOverTime } from "@/lib/dashboard-service";

const ModernTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
          <span className="text-xs font-medium text-slate-300">New Leads:</span>
          <span className="text-base font-extrabold tracking-tight text-amber-400">
            {payload[0].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const ActiveGlowDot = (props) => {
  const { cx, cy } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill="#F59E0B" fillOpacity={0.25} />
      <circle cx={cx} cy={cy} r={5} fill="#0F172A" stroke="#F59E0B" strokeWidth={2.5} />
    </g>
  );
};

export default function LeadsChart({ initialData = [] }) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(initialData);
  const [timeRange, setTimeRange] = useState("3M");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    startTransition(async () => {
      const updatedData = await getLeadsOverTime(range);
      setData(updatedData);
    });
  };

  const totalLeads = useMemo(
    () => data.reduce((acc, curr) => acc + (curr.leads || 0), 0),
    [data]
  );

  const percentageChange = useMemo(() => {
    if (data.length < 2) return 0;
    const half = Math.floor(data.length / 2);
    const sum1 = data.slice(0, half).reduce((a, b) => a + (b.leads || 0), 0);
    const sum2 = data.slice(half).reduce((a, b) => a + (b.leads || 0), 0);
    if (sum1 === 0) return 100;
    return (((sum2 - sum1) / sum1) * 100).toFixed(1);
  }, [data]);

  const isPositive = percentageChange >= 0;

  if (!mounted) {
    return <div className="h-[280px] w-full animate-pulse rounded-3xl bg-slate-100/60" />;
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {totalLeads.toLocaleString()}
          </span>
          <div
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${
              isPositive
                ? "border-emerald-200/80 bg-emerald-50 text-emerald-700"
                : "border-rose-200/80 bg-rose-50 text-rose-700"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>{isPositive ? `+${percentageChange}%` : `${percentageChange}%`}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-slate-200/70 bg-slate-100/80 p-1">
          {["7D", "30D", "3M", "1Y"].map((period) => (
            <button
              key={period}
              type="button"
              disabled={isPending}
              onClick={() => handleTimeRangeChange(period)}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                timeRange === period
                  ? "border border-slate-200/60 bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {isPending && timeRange === period && (
                <Loader2 className="h-3 w-3 animate-spin text-amber-600" />
              )}
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div
        className={`h-[220px] w-full min-w-0 transition-opacity duration-300 sm:h-[260px] ${
          isPending ? "opacity-40" : "opacity-100"
        }`}
      >
        {data.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
            <Sparkles className="mb-2 h-5 w-5 text-amber-600" />
            <p className="text-sm font-bold text-slate-800">No data for this timeframe</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 15, right: 8, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="ultraGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.35} />
                  <stop offset="60%" stopColor="#F59E0B" stopOpacity={0.06} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="month"
                stroke="#94A3B8"
                fontSize={11}
                fontWeight={600}
                tickLine={false}
                axisLine={false}
                dy={10}
                minTickGap={16}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                fontWeight={600}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={<ModernTooltip />}
                cursor={{ stroke: "#CBD5E1", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#D97706"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#ultraGradient)"
                activeDot={<ActiveGlowDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}