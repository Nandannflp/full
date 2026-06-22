"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATA = [
  { d: "Mon", v: 1240, l: 980 },
  { d: "Tue", v: 1680, l: 1120 },
  { d: "Wed", v: 1420, l: 1340 },
  { d: "Thu", v: 2240, l: 1610 },
  { d: "Fri", v: 2980, l: 2010 },
  { d: "Sat", v: 2640, l: 2380 },
  { d: "Sun", v: 3520, l: 2640 },
];

type Props = { height?: number };

/**
 * Premium animated analytics chart used inside the hero dashboard mockup.
 * Two gradient area series (visitors + leads) with a glassy custom tooltip.
 */
export function AnalyticsChart({ height = 90 }: Props) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={DATA}
          margin={{ top: 6, right: 4, left: 4, bottom: 0 }}
        >
          <defs>
            <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="d"
            tick={{ fill: "#64748b", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis hide domain={[0, "dataMax + 600"]} />
          <Tooltip
            cursor={{ stroke: "#38bdf8", strokeWidth: 1, strokeDasharray: "3 3" }}
            contentStyle={{
              background: "rgba(7,17,38,0.92)",
              border: "1px solid rgba(59,130,246,0.35)",
              borderRadius: 10,
              fontSize: 11,
              color: "#e2e8f0",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px -8px rgba(2,6,23,0.9)",
            }}
            labelStyle={{ color: "#94a3b8", fontSize: 10 }}
          />
          <Area
            type="monotone"
            dataKey="v"
            name="Visitors"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#visitorsGrad)"
            isAnimationActive
            animationDuration={1400}
            dot={false}
            activeDot={{ r: 3, fill: "#38bdf8", stroke: "#0b1224", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="l"
            name="Leads"
            stroke="#06b6d4"
            strokeWidth={1.8}
            fill="url(#leadsGrad)"
            isAnimationActive
            animationDuration={1600}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
