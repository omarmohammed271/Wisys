import StatsCard from './StatsCards';
import { BookCheck, CalendarSync, FileQuestion, Hourglass, Repeat2, Users } from 'lucide-react';

export default function StatsCardData() {
  return (
    <div>
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
    </div>
  );
}
