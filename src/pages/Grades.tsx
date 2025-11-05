import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Grades() {
  const { grades, students, subjects } = useData();
  const { user } = useAuth();

  const filteredGrades = user?.role === 'student'
    ? grades.filter(g => g.studentId === user.id)
    : grades;

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || 'N/A';
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || 'N/A';
  };

  const getGradeStatus = (value: number) => {
    if (value >= 7) return { label: 'Aprovado', variant: 'default' as const };
    if (value >= 5) return { label: 'Recuperação', variant: 'secondary' as const };
    return { label: 'Reprovado', variant: 'destructive' as const };
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold">Notas e Avaliações</h2>
        <p className="text-muted-foreground">
          {user?.role === 'student'
            ? 'Acompanhe suas notas'
            : 'Gerencie as notas dos alunos'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {user?.role !== 'student' && <TableHead>Aluno</TableHead>}
                <TableHead>Disciplina</TableHead>
                <TableHead>Bimestre</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((grade) => {
                const status = getGradeStatus(grade.value);
                return (
                  <TableRow key={grade.id}>
                    {user?.role !== 'student' && (
                      <TableCell className="font-medium">{getStudentName(grade.studentId)}</TableCell>
                    )}
                    <TableCell>{getSubjectName(grade.subjectId)}</TableCell>
                    <TableCell>{grade.quarter}º Bimestre</TableCell>
                    <TableCell>
                      <span className="font-semibold">{grade.value.toFixed(1)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>{new Date(grade.date).toLocaleDateString('pt-BR')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
