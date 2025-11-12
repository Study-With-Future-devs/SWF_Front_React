import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, BarChart3 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// --- MOCK DE DADOS RICOS ---
const mockSubjects = [
  { id: 1, name: 'Matemática' },
  { id: 2, name: 'Português' },
  { id: 3, name: 'História' },
  { id: 4, name: 'Geografia' },
  { id: 5, name: 'Ciências' },
  { id: 6, name: 'Inglês' },
];

const mockStudents = [
  { id: 1, name: 'Ana Silva' },
  { id: 2, name: 'Bruno Souza' },
  { id: 3, name: 'Carla Mendes' },
  { id: 4, name: 'Diego Santos' },
  { id: 5, name: 'Eduarda Lima' },
];

const mockGrades = [
  // Matemática
  { studentId: 1, subjectId: 1, value: 8.5, quarter: 1 },
  { studentId: 1, subjectId: 1, value: 7.9, quarter: 2 },
  { studentId: 1, subjectId: 1, value: 9.2, quarter: 3 },
  { studentId: 1, subjectId: 1, value: 8.8, quarter: 4 },

  { studentId: 2, subjectId: 1, value: 6.5, quarter: 1 },
  { studentId: 2, subjectId: 1, value: 7.1, quarter: 2 },
  { studentId: 2, subjectId: 1, value: 8.0, quarter: 3 },
  { studentId: 2, subjectId: 1, value: 7.7, quarter: 4 },

  // Português
  { studentId: 1, subjectId: 2, value: 9.0, quarter: 1 },
  { studentId: 2, subjectId: 2, value: 7.5, quarter: 1 },
  { studentId: 3, subjectId: 2, value: 8.8, quarter: 2 },
  { studentId: 4, subjectId: 2, value: 6.7, quarter: 3 },
  { studentId: 5, subjectId: 2, value: 8.3, quarter: 4 },

  // História
  { studentId: 1, subjectId: 3, value: 7.2, quarter: 1 },
  { studentId: 3, subjectId: 3, value: 6.5, quarter: 2 },
  { studentId: 4, subjectId: 3, value: 8.1, quarter: 3 },
  { studentId: 5, subjectId: 3, value: 7.9, quarter: 4 },

  // Geografia
  { studentId: 1, subjectId: 4, value: 8.4, quarter: 1 },
  { studentId: 2, subjectId: 4, value: 7.8, quarter: 2 },
  { studentId: 3, subjectId: 4, value: 8.0, quarter: 3 },
  { studentId: 5, subjectId: 4, value: 9.2, quarter: 4 },

  // Ciências
  { studentId: 1, subjectId: 5, value: 8.9, quarter: 1 },
  { studentId: 2, subjectId: 5, value: 6.9, quarter: 2 },
  { studentId: 3, subjectId: 5, value: 9.1, quarter: 3 },
  { studentId: 4, subjectId: 5, value: 7.5, quarter: 4 },

  // Inglês
  { studentId: 1, subjectId: 6, value: 9.5, quarter: 1 },
  { studentId: 2, subjectId: 6, value: 8.2, quarter: 2 },
  { studentId: 3, subjectId: 6, value: 7.8, quarter: 3 },
  { studentId: 4, subjectId: 6, value: 8.9, quarter: 4 },
];

export default function Reports() {
  const grades = mockGrades;
  const subjects = mockSubjects;
  const students = mockStudents;

  const gradesBySubject = subjects.map(subject => {
    const subjectGrades = grades.filter(g => g.subjectId === subject.id);
    const average = subjectGrades.length > 0
      ? subjectGrades.reduce((sum, g) => sum + g.value, 0) / subjectGrades.length
      : 0;
    return {
      name: subject.name,
      média: Number(average.toFixed(2)),
    };
  });

  const performanceByQuarter = [1, 2, 3, 4].map(quarter => {
    const quarterGrades = grades.filter(g => g.quarter === quarter);
    const average = quarterGrades.length > 0
      ? quarterGrades.reduce((sum, g) => sum + g.value, 0) / quarterGrades.length
      : 0;
    return {
      name: `${quarter}º Bim`,
      média: Number(average.toFixed(2)),
    };
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Relatórios</h2>
          <p className="text-muted-foreground">Análises e relatórios do desempenho escolar</p>
        </div>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar Excel
        </Button>
      </div>

      {/* Indicadores principais */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grades.length > 0
                ? (grades.reduce((sum, g) => sum + g.value, 0) / grades.length).toFixed(1)
                : '0.0'}
            </div>
            <p className="text-xs text-muted-foreground">De todas as disciplinas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grades.length > 0
                ? ((grades.filter(g => g.value >= 7).length / grades.length) * 100).toFixed(0)
                : '0'}%
            </div>
            <p className="text-xs text-muted-foreground">Notas acima de 7.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grades.length}</div>
            <p className="text-xs text-muted-foreground">Notas lançadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Média por Disciplina</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradesBySubject}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="média" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Bimestre</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceByQuarter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="média"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
