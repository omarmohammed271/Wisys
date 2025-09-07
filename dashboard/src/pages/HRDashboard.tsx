import StatsCard from "@/components/Cards/StatsCards";
import { AttendanceChart } from "@/components/Charts/AttendanceChart";
import {
  CalendarSync,
  Repeat2,
  Users,
  Hourglass,
} from "lucide-react";

export default function HRDashboard() {
  return (
    <div className="p-6 flex flex-col h-full space-y-8">
      {/* Stat Cards */}
      <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          className="bg-card via-card to-purple-900/40 border border-border p-4 rounded-2xl"
          title="Total Employees"
          value={128}
          icon={<Users />}
        />

        <StatsCard
          className="bg-card via-card to-purple-900/40 border border-border p-4 rounded-2xl"
          title="Attendance Rate"
          value="92%"
          icon={<CalendarSync />}
        />

        <StatsCard
          className="bg-card via-card to-purple-900/40 border border-border p-4 rounded-2xl"
          title="Turnover Rate"
          value="6%"
          icon={<Repeat2 />}
        />

        <StatsCard
          className="bg-card via-card to-purple-900/40 border border-border p-4 rounded-2xl"
          title="Average Age"
          value="32 yrs"
          icon={<Hourglass />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upper */}
        <div className="lg:h-1/2">
            {/* Attendance / Absence */}
            <AttendanceChart />
        </div>
      </div>
    </div>
  );
}
