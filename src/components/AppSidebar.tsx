import { Home, Users, GraduationCap, BookOpen, ClipboardList, FileText, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { user } = useAuth();

const menuItems = [
  { id: 1, title: 'Dashboard', url: '/dashboard', icon: Home },
  { id: 2, title: 'Alunos', url: '/students', icon: Users },
  { id: 3, title: 'Professores', url: '/teachers', icon: GraduationCap },
  { id: 4, title: 'Turmas', url: '/classes', icon: BookOpen },
  { id: 5, title: 'Disciplinas', url: '/subjects', icon: ClipboardList },
  { id: 6, title: 'Notas', url: '/grades', icon: BarChart3 },
  { id: 7, title: 'Relatórios', url: '/reports', icon: FileText },
];

  const allowedItems = menuItems.filter(item =>
  user?.telasPermitidasIds?.includes(item.id)
);


  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold text-primary">Sistema Escolar</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allowedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
