import { instructors } from '@/data/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function pillStyle(lmqLevel: number): string {
  if (lmqLevel >= 7) return 'border border-green-200 text-green-700 bg-green-50';
  if (lmqLevel >= 4) return 'border border-amber-200 text-amber-700 bg-amber-50';
  return 'border border-red-200 text-red-700 bg-red-50';
}

export default function ProgramProgress() {
  const sorted = [...instructors].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Program Development</CardTitle>
        <p className="text-xs text-muted-foreground">LMQ level per program per instructor</p>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-border">
            {sorted.map((instructor) => (
              <tr key={instructor.id}>
                <td className="py-2 pr-4 font-medium text-xs text-foreground w-36 align-middle">
                  {instructor.name}
                </td>
                <td className="py-2 align-middle">
                  <div className="flex flex-wrap gap-1.5">
                    {instructor.programs.map((program) => (
                      <span
                        key={program.name}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${pillStyle(program.lmqLevel)}`}
                      >
                        {program.name} L{program.lmqLevel}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
