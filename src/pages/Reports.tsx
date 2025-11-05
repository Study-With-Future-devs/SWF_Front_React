import { useData } from '@/contexts/DataContext';
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

export default function Reports() {
  const { grades, subjects, students } = useData();

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
          Exportar PDF
        </Button>
      </div>

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
                <Line type="monotone" dataKey="média" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
