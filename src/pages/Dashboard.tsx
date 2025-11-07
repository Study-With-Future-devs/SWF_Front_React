import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { getAllStudents } from '@/service/studentService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, BookOpen, ClipboardList } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function Dashboard() {
  const { user } = useAuth();
  const { teachers = [], classes = [], subjects = [], grades = [] } = useData();

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchStudents();
  }, []);

  // Filtrar stats dependendo do tipo de usuário
  const stats =
    user?.tipoUsuario === 'Aluno'
      ? [
          { title: 'Minhas Notas', value: grades.length, icon: BookOpen, color: 'text-primary' },
        ]
      : [
          { title: 'Total de Alunos', value: students.length, icon: Users, color: 'text-primary' },
          { title: 'Total de Professores', value: teachers.length, icon: GraduationCap, color: 'text-accent' },
          { title: 'Total de Turmas', value: classes.length, icon: BookOpen, color: 'text-chart-3' },
          { title: 'Total de Disciplinas', value: subjects.length, icon: ClipboardList, color: 'text-chart-4' },
        ];

  const gradesByQuarter = [1, 2, 3, 4].map(q => ({
    name: `${q}º Bim`,
    total: grades.filter(g => g.quarter === q)?.length || 0,
  }));

  const studentsByClass = classes.map(c => ({
    name: c.name,
    value: c.studentIds?.length || 0,
  }));

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold">Bem-vindo, {user?.nome}!</h2>
        <p className="text-muted-foreground">Visão geral do sistema de gestão escolar</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {user?.tipoUsuario !== 'Aluno' && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Notas Lançadas por Bimestre</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradesByQuarter}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Alunos por Turma</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentsByClass}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={entry => entry.name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentsByClass.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
