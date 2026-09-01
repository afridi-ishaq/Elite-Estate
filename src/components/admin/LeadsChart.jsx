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
      <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/60 ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95 duration-150">
        <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-1">
          {label}
        </p>
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
          <span className="text-slate-300 text-xs font-medium">New Leads:</span>
          <span className="text-amber-400 font-extrabold text-base tracking-tight">
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

  // Fetch updated data when user changes timeframe
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    startTransition(async () => {
      const updatedData = await getLeadsOverTime(range);
      setData(updatedData);
    });
  };

  const totalLeads = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.leads || 0), 0);
  }, [data]);

  const percentageChange = useMemo(() => {
    if (data.length < 2) return 0;
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));

    const sum1 = firstHalf.reduce((a, b) => a + (b.leads || 0), 0);
    const sum2 = secondHalf.reduce((a, b) => a + (b.leads || 0), 0);

    if (sum1 === 0) return 100;
    return (((sum2 - sum1) / sum1) * 100).toFixed(1);
  }, [data]);

  const isPositive = percentageChange >= 0;

  if (!mounted) {
    return <div className="w-full h-[320px] bg-slate-100/60 rounded-3xl animate-pulse" />;
  }

  return (
    <div className="w-full flex flex-col justify-between h-full space-y-5 relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">
            {totalLeads.toLocaleString()}
          </span>
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
              isPositive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                : "bg-rose-50 text-rose-700 border-rose-200/80"
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{isPositive ? `+${percentageChange}%` : `${percentageChange}%`}</span>
          </div>
        </div>

        {/* Dynamic Selector Pills */}
        <div className="flex items-center p-1 bg-slate-100/80 border border-slate-200/70 rounded-xl gap-1">
          {["7D", "30D", "3M", "1Y"].map((period) => (
            <button
              key={period}
              disabled={isPending}
              onClick={() => handleTimeRangeChange(period)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1 ${
                timeRange === period
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {isPending && timeRange === period && (
                <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
              )}
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className={`w-full h-[250px] transition-opacity duration-300 ${isPending ? "opacity-40" : "opacity-100"}`}>
        {data.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/60 border border-dashed border-slate-200 rounded-3xl p-6 text-center">
            <Sparkles className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-sm font-bold text-slate-800">No Data for this timeframe</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 15, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="ultraGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.35} />
                  <stop offset="60%" stopColor="#F59E0B" stopOpacity={0.06} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip content={<ModernTooltip />} cursor={{ stroke: "#CBD5E1", strokeWidth: 1, strokeDasharray: "4 4" }} />
              <Area type="monotone" dataKey="leads" stroke="#D97706" strokeWidth={2.5} fillOpacity={1} fill="url(#ultraGradient)" activeDot={<ActiveGlowDot />} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}