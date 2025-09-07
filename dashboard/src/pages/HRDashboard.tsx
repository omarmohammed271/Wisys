import StatsCard from "@/components/Cards/StatsCards";
import { AttendanceChart } from "@/components/Charts/AttendanceChart";
import { GenderAgeDist } from "@/components/Charts/GenderAgeDist";
import { TurnoverChart } from "@/components/Charts/TurnoverChart";
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
    <div className="p-6 flex flex-col h-full space-y-2">
      {/* Stat Cards */}
      <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
        <StatsCard
          className="bg-card via-card to-purple-900/40 border border-border p-4 rounded-2xl"
          title="Total Employees"
          value={128}
          icon={<Users />}
        />

        <StatsCard
            className="bg-card border border-border p-4 rounded-2xl"
            title="Present Today"
            value={112}
            icon={<BookCheck />}
        />

        <StatsCard
            className="bg-card border border-border p-4 rounded-2xl"
            title="Absent Today"
            value={16}
            icon={<FileQuestion />}
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
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 gap-x-2">
        {/* Upper */}
        <div className=" flex flex-col space-y-2 col-span-2">
            {/* Attendance / Absence */}
            <AttendanceChart />
            {/* Turnover */}
            <TurnoverChart />
        </div>
        <div className=" flex flex-col space-y-2 col-span-1 h-full overflow-clip">
            {/* Gender Distribution */}
            <GenderAgeDist />
            {/* Age Distribution */}
            {/* <GenderAgeDist /> */}
        </div>
      </div>
    </div>
  );
}
