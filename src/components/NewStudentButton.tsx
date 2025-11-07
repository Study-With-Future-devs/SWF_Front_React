import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createStudent, updateStudent } from "@/service/studentService";
import { Student } from "@/types";
import { Loader2 } from "lucide-react";

interface NewStudentButtonProps {
  studentToEdit?: Student;
  isEdit?: boolean;
  onStudentSaved: () => void;
  children?: React.ReactNode;
}

export default function NewStudentButton({
  studentToEdit,
  isEdit,
  onStudentSaved,
  children,
}: NewStudentButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    matricula: "",
    periodo: "",
    dataNascimento: "",
  });

  useEffect(() => {
    if (open && isEdit && studentToEdit) {
      setForm({
        nome: studentToEdit.nome,
        email: studentToEdit.email,
        senha: "",
        matricula: studentToEdit.matricula ?? "",
        periodo: studentToEdit.periodo ?? "",
        dataNascimento: studentToEdit.dataNascimento?.split("T")[0] ?? "",
      });
    } else if (!open) {
      setForm({
        nome: "",
        email: "",
        senha: "",
        matricula: "",
        periodo: "",
        dataNascimento: "",
      });
    }
  }, [open, isEdit, studentToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.nome.trim() || !form.email.trim()) {
      setError("Nome e Email são obrigatórios!");
      return;
    }

    if (!isEdit && !form.senha.trim()) {
      setError("Senha é obrigatória ao criar aluno!");
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        nome: form.nome.trim(),
        email: form.email.trim(),
        matricula: form.matricula.trim(),
        periodo: form.periodo.trim(),
        dataNascimento: form.dataNascimento
          ? new Date(form.dataNascimento).toISOString()
          : null,
      };

      if (!isEdit || form.senha.trim() !== "") {
        payload.senha = form.senha.trim();
      }

      if (isEdit && studentToEdit) {
        await updateStudent(studentToEdit.id, payload);
      } else {
        await createStudent(payload);
      }

      await onStudentSaved();
      setOpen(false);
    } catch (e) {
      setError("Erro ao salvar aluno!");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {children ? (
        <span onClick={() => setOpen(true)} className="cursor-pointer">
          {children}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)}>
          {isEdit ? "Editar Aluno" : "Novo Aluno"}
        </Button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
          <Card className="w-96 animate-slideUp">
            <CardHeader>
              <CardTitle>{isEdit ? "Editar Aluno" : "Novo Aluno"}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <Input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
              <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
              <Input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} />
              <Input name="matricula" placeholder="Matrícula" value={form.matricula} onChange={handleChange} />
              <select
                name="periodo"
                value={form.periodo}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Selecione o Período</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
              </select>

              <Input name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} />

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button disabled={loading} onClick={handleSubmit}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : (isEdit ? "Salvar" : "Criar")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
