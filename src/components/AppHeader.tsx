import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AppHeader() {
  const { user, logout } = useAuth();

  // Função para determinar tipo de usuário com base nas telasPermitidasIds
  const getUserType = (telasPermitidasIds?: number[]) => {
    if (!telasPermitidasIds || telasPermitidasIds.length === 0) return 'Usuário';

    // Exemplo de lógica: você pode ajustar IDs conforme sua regra
    if (telasPermitidasIds.includes(1)) return 'Administrador';
    if (telasPermitidasIds.includes(2)) return 'Coordenador';
    if (telasPermitidasIds.includes(3)) return 'Professor';
    if (telasPermitidasIds.includes(4)) return 'Aluno';

    return 'Usuário';
  };

  const displayName = user?.nome || '';
  const displayInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Sistema de Gestão Escolar</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {displayInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium">{displayName || 'Usuário'}</span>
              <span className="text-xs text-muted-foreground">
                {getUserType(user?.telasPermitidasIds)}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
