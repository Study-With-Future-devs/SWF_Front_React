# Sistema de Gestão Escolar

Sistema completo de gestão escolar desenvolvido com **React 18**, **TypeScript**, **Tailwind CSS**, **Shadcn/ui** e **Recharts**.

## 🚀 Tecnologias

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI
- **Recharts** - Gráficos e visualizações
- **React Router** - Navegação
- **React Hook Form + Zod** - Formulários e validação

## 👥 Papéis do Sistema

O sistema possui 4 níveis de acesso:

1. **Admin** - Acesso total a todas as funcionalidades
2. **Coordenador** - Gestão de professores, turmas, disciplinas e acompanhamento
3. **Professor** - Lançamento de notas, frequência e visualização de turmas
4. **Aluno** - Consulta de notas e frequência

## 📦 Funcionalidades

### Autenticação
- Login com diferentes papéis
- Proteção de rotas por autorização
- Redirecionamento automático

### Dashboard
- Cards com estatísticas gerais
- Gráficos de desempenho
- Distribuição de alunos por turma
- Visão consolidada do sistema

### Gestão de Alunos
- CRUD completo
- Busca com filtros
- Visualização de turmas
- Status ativo/inativo

### Gestão de Professores
- CRUD completo
- Vinculação com disciplinas
- Gestão de status

### Gestão de Turmas
- Criação e edição de turmas
- Associação com professores
- Visualização de alunos

### Gestão de Disciplinas
- Cadastro de disciplinas
- Carga horária
- Vinculação com professores

### Notas e Avaliações
- Lançamento de notas por bimestre
- Visualização de status (Aprovado/Recuperação/Reprovado)
- Filtros por papel (aluno vê apenas suas notas)

### Relatórios
- Gráficos de desempenho
- Média por disciplina
- Performance por bimestre
- Taxa de aprovação

## 🔐 Usuários de Teste

Todos os usuários usam a senha: **123456**

| Papel | Email | Senha |
|-------|-------|-------|
| Admin | admin@escola.com | 123456 |
| Coordenador | coordenador@escola.com | 123456 |
| Professor | professor@escola.com | 123456 |
| Aluno | aluno@escola.com | 123456 |

## 🏃 Como Executar

1. **Instalar dependências:**
```bash
npm install
```

2. **Iniciar o servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Acessar a aplicação:**
```
http://localhost:5173
```

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── ui/           # Componentes Shadcn/ui
│   ├── AppSidebar.tsx
│   ├── AppHeader.tsx
│   └── ProtectedRoute.tsx
├── contexts/         # Context API (Auth e Data)
├── layouts/          # Layouts da aplicação
├── lib/              # Utilitários e mock data
├── pages/            # Páginas da aplicação
├── types/            # Definições TypeScript
└── App.tsx           # Componente raiz
```

## 🎨 Design System

O projeto utiliza um design system completo com:
- Cores semânticas (primary, secondary, accent, etc.)
- Tema claro/escuro
- Componentes acessíveis
- Responsividade mobile-first
- Paleta profissional (azul educacional + verde sucesso)

## 🔒 Proteção de Rotas

Todas as rotas são protegidas com:
- Verificação de autenticação
- Autorização por papel
- Redirecionamento automático

## 📊 Estado da Aplicação

O estado é gerenciado com **Context API**:
- `AuthContext` - Autenticação e usuário logado
- `DataContext` - Dados do sistema (alunos, professores, etc.)

## 🧪 Dados Mock

O sistema utiliza dados mock para demonstração, armazenados em `src/lib/mock-data.ts`. Em produção, estes seriam substituídos por chamadas API reais.

## 🚀 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 📝 Próximos Passos

Para evolução do sistema:
1. Integrar com API backend real
2. Adicionar testes unitários e E2E
3. Implementar upload de arquivos
4. Adicionar mais relatórios
5. Sistema de notificações em tempo real
6. Exportação de PDF/Excel
7. Calendário escolar interativo