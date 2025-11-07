import { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "@/service/studentService";
import { Student } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewStudentButton from "@/components/NewStudentButton";
import DeleteModal from "@/components/DeleteModal";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal Delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.nome.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.matricula?.includes(search) ?? false)
  );

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      await deleteStudent(studentToDelete.id);
      fetchStudents();
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
    } finally {
      setOpenDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  if (loading) return <p>Carregando alunos...</p>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Gestão de Alunos</h2>
          <p className="text-muted-foreground">
            Gerencie os alunos da instituição
          </p>
        </div>

        <NewStudentButton isEdit={false} onStudentSaved={fetchStudents}>
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" /> Novo Aluno
          </Button>
        </NewStudentButton>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou matrícula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matrícula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.matricula}
                  </TableCell>
                  <TableCell>{student.nome}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.turmaNome ?? "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      {student.tipoUsuario === "Aluno" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <NewStudentButton
                      studentToEdit={student}
                      isEdit={true}
                      onStudentSaved={fetchStudents}
                    >
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </NewStudentButton>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setStudentToDelete(student);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal genérico de exclusão */}
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        entityName={studentToDelete?.nome ?? ""}
        title="Excluir Aluno"
      />
    </div>
  );
}
