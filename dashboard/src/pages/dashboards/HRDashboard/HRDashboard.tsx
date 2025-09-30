import StatsCard from "@/pages/Home/componenets/Cards/StatsCards";
import { AcceptanceRateChart } from "@/components/Charts/HRDashboardCharts/AcceptanceRate";
import { AttendanceChart } from "@/components/Charts/HRDashboardCharts/AttendanceChart";
import { AverageTenureChart } from "@/components/Charts/HRDashboardCharts/AverageTenure";
import { CostPerHireChart } from "@/components/Charts/HRDashboardCharts/CostPerHire";
import { EngagementScoreChart } from "@/components/Charts/HRDashboardCharts/EngagementScore";
import { MeetingsSurvivabilityChart } from "@/components/Charts/HRDashboardCharts/MeetingsSurvivability";
import { TimeToFillChart } from "@/components/Charts/HRDashboardCharts/TimeToFill";
import { TimeToHireChart } from "@/components/Charts/HRDashboardCharts/TimeToHire";
import { TurnoverChart } from "@/components/Charts/HRDashboardCharts/TurnoverChart";
import Chatbot from "@/components/Chatbot/Chatbot";
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
    <div className="p-3 flex flex-col h-[90vh] overflow-hidden space-y-2">
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
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-5 gap-2">
        {/* Upper */}
        <div className=" flex flex-col space-y-2 col-span-1">
            {/* Attendance / Absence */}
            <AttendanceChart />
            {/* Turnover */}
            <TurnoverChart />
        </div>
        <div className=" flex flex-col space-y-2 col-span-1">
            {/* Attendance / Absence */}
            <TimeToHireChart />
            {/* Turnover */}
            <TimeToFillChart />
        </div>
        <div className=" flex flex-col space-y-2 col-span-1">
            {/* Attendance / Absence */}
            <AcceptanceRateChart />
            {/* Turnover */}
            <CostPerHireChart />
        </div>
        <div className=" flex flex-col *:h-1/2 space-y-2 col-span-2">
            {/* Turnover */}
            <EngagementScoreChart />
            <div className="grid grid-cols-2 gap-2">
              {/* Attendance / Absence */}
              <AverageTenureChart />
              {/* Attendance / Absence */}
              <MeetingsSurvivabilityChart />
            </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}
