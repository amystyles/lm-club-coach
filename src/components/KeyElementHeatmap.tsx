import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Instructor } from '@/data/types';

const ELEMENTS = [
  { key: 'choreography', abbr: 'CHO' },
  { key: 'technique',    abbr: 'TEC' },
  { key: 'coaching',     abbr: 'COA' },
  { key: 'connection',   abbr: 'CON' },
  { key: 'performance',  abbr: 'PER' },
] as const;

type ElementKey = typeof ELEMENTS[number]['key'];

const GRADE_STYLES: Record<number, string> = {
  1: 'bg-red-50 text-red-700 border-red-200',
  2: 'bg-amber-50 text-amber-700 border-amber-200',
  3: 'bg-green-50 text-green-700 border-green-200',
};

function getGrade(instructor: Instructor, element: ElementKey): number {
  return instructor.grades.find((g) => g.element === element)?.grade ?? 1;
}

export default function KeyElementHeatmap({ instructors }: { instructors: Instructor[] }) {
  const sorted = [...instructors].sort((a, b) => a.name.localeCompare(b.name));

  if (sorted.length === 0) {
    return (
      <Card>
        <CardHeader className="p-0">
          <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
            <CardTitle className="text-white text-sm leading-tight">Key Element Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-8 text-sm text-muted-foreground text-center">
          Add instructors to see team grades here.
        </CardContent>
      </Card>
    );
  }

  const averages = ELEMENTS.map(({ key }) => {
    const avg = sorted.reduce((sum, inst) => sum + getGrade(inst, key), 0) / sorted.length;
    return Math.round(avg * 10) / 10;
  });

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
          <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
          <div>
            <CardTitle className="text-white text-sm leading-tight">Key Element Overview</CardTitle>
            <p className="text-white/40 text-xs mt-0.5">Team grades at a glance</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left pt-3 pb-2 pr-3 font-medium text-xs text-muted-foreground w-32">
                Instructor
              </th>
              {ELEMENTS.map(({ key, abbr }) => (
                <th
                  key={key}
                  className="text-center pt-3 pb-2 px-1 text-xs font-bold tracking-wider text-muted-foreground uppercase"
                >
                  {abbr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((instructor) => (
              <tr key={instructor.id}>
                <td className="py-1.5 pr-3 font-medium text-xs text-foreground truncate max-w-[8rem]">
                  {instructor.name}
                </td>
                {ELEMENTS.map(({ key }) => {
                  const grade = getGrade(instructor, key);
                  return (
                    <td key={key} className="py-1.5 px-1 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded border text-xs font-bold ${GRADE_STYLES[grade]}`}
                      >
                        {grade}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border">
              <td className="pt-2 pr-3 text-xs font-bold text-foreground">Team Avg</td>
              {averages.map((avg, i) => {
                const rounded = Math.round(avg);
                const displayGrade = Math.max(1, Math.min(3, rounded));
                return (
                  <td key={i} className="pt-2 px-1 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded border text-xs font-bold ${GRADE_STYLES[displayGrade]}`}
                    >
                      {avg.toFixed(1)}
                    </span>
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </CardContent>
    </Card>
  );
}
