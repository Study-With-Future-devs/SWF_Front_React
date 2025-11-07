import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeleteModalProps {
  title?: string;
  entityName?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  title = "Confirmar Exclusão",
  entityName = "este item",
  open,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
      <Card className="w-80 animate-slideUp">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Deseja realmente excluir <strong>{entityName}</strong>? <br />
            Essa ação não pode ser desfeita!
          </p>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>

            <Button variant="destructive" onClick={onConfirm}>
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
