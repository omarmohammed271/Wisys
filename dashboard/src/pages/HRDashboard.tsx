import StatsCard from "@/components/Cards/StatsCards";
import { AgeDist } from "@/components/Charts/HRDashboardCharts/AgeDist";
import { AttendanceChart } from "@/components/Charts/HRDashboardCharts/AttendanceChart";
import { GenderDist } from "@/components/Charts/HRDashboardCharts/GenderDist";
import { TurnoverChart } from "@/components/Charts/HRDashboardCharts/TurnoverChart";
import {
  CalendarSync,
  Repeat2,
  Users,
  Hourglass,
  BookCheck,
  FileQuestion,
} from "lucide-react";

export default function HRDashboard() {
  return (
    <div className="p-3 flex flex-col h-full space-y-2">
      {/* Stat Cards */}
      <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Total Employees"
          value={128}
          icon={<Users />}
        />

        <StatsCard
            className="border border-border p-4 rounded-2xl"
            title="Present Today"
            value={112}
            icon={<BookCheck />}
        />

        <StatsCard
            className="border border-border p-4 rounded-2xl"
            title="Absent Today"
            value={16}
            icon={<FileQuestion />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Attendance Rate"
          value="92%"
          icon={<CalendarSync />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Turnover Rate"
          value="6%"
          icon={<Repeat2 />}
        />

        <StatsCard
          className="border border-border p-4 rounded-2xl"
          title="Average Age"
          value="32 yrs"
          icon={<Hourglass />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Upper */}
        <div className=" flex flex-col space-y-2 col-span-2">
            {/* Attendance / Absence */}
            <AttendanceChart />
            {/* Turnover */}
            <TurnoverChart />
        </div>
        <div className=" flex flex-col gap-y-2 col-span-1 overflow-hidden">
            {/* Gender Distribution */}
            <GenderDist />
            {/* Age Distribution */}
            <AgeDist />
        </div>
      </div>
    </div>
  );
}
