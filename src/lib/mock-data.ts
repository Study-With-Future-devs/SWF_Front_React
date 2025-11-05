import { Student, Teacher, Class, Subject, Grade, Attendance, User } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin Sistema', email: 'admin@escola.com', role: 'admin' },
  { id: '2', name: 'Carlos Coordenador', email: 'coordenador@escola.com', role: 'coordinator' },
  { id: '3', name: 'João Professor', email: 'professor@escola.com', role: 'teacher' },
  { id: '4', name: 'Ana Aluna', email: 'aluno@escola.com', role: 'student' },
];

export const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'João Professor',
    email: 'joao.prof@escola.com',
    phone: '(11) 97654-3210',
    subjectIds: ['sub1', 'sub2'],
    status: 'active',
  },
  {
    id: 't2',
    name: 'Maria Educadora',
    email: 'maria.edu@escola.com',
    phone: '(11) 97654-3211',
    subjectIds: ['sub3', 'sub4'],
    status: 'active',
  },
  {
    id: 't3',
    name: 'Ricardo Mentor',
    email: 'ricardo.mentor@escola.com',
    phone: '(11) 98777-5555',
    subjectIds: ['sub5'],
    status: 'active',
  },
];

export const mockClasses: Class[] = [
  {
    id: 'c1',
    name: '8º A',
    grade: '8º ano',
    teacherId: 't1',
    studentIds: ['s1', 's2', 's3'],
    year: 2024,
  },
  {
    id: 'c2',
    name: '9º B',
    grade: '9º ano',
    teacherId: 't2',
    studentIds: ['s4', 's5'],
    year: 2024,
  },
  {
    id: 'c3',
    name: '7º C',
    grade: '7º ano',
    teacherId: 't3',
    studentIds: ['s6', 's7', 's8'],
    year: 2024,
  },
];

export const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Ana Silva',
    email: 'ana.silva@escola.com',
    phone: '(11) 98765-4321',
    birthDate: '2010-03-15',
    enrollmentNumber: '2024001',
    classId: 'c1',
    status: 'active',
  },
  {
    id: 's2',
    name: 'Pedro Santos',
    email: 'pedro.santos@escola.com',
    phone: '(11) 98765-4322',
    birthDate: '2010-05-20',
    enrollmentNumber: '2024002',
    classId: 'c1',
    status: 'active',
  },
  {
    id: 's3',
    name: 'Juliana Rocha',
    email: 'juliana.rocha@escola.com',
    phone: '(11) 95432-7765',
    birthDate: '2010-09-18',
    enrollmentNumber: '2024003',
    classId: 'c1',
    status: 'active',
  },
  {
    id: 's4',
    name: 'Enzo Moreira',
    email: 'enzo.moreira@escola.com',
    phone: '(11) 99654-1188',
    birthDate: '2009-01-30',
    enrollmentNumber: '2024004',
    classId: 'c2',
    status: 'active',
  },
  {
    id: 's5',
    name: 'Beatriz Lima',
    email: 'beatriz.lima@escola.com',
    phone: '(11) 97745-2233',
    birthDate: '2009-06-04',
    enrollmentNumber: '2024005',
    classId: 'c2',
    status: 'active',
  },
  {
    id: 's6',
    name: 'Lucas Martins',
    email: 'lucas.martins@escola.com',
    phone: '(11) 95555-1313',
    birthDate: '2011-07-25',
    enrollmentNumber: '2024006',
    classId: 'c3',
    status: 'active',
  },
  {
    id: 's7',
    name: 'Isabela Costa',
    email: 'isabela.costa@escola.com',
    phone: '(11) 93333-4646',
    birthDate: '2011-11-10',
    enrollmentNumber: '2024007',
    classId: 'c3',
    status: 'active',
  },
  {
    id: 's8',
    name: 'Felipe Araújo',
    email: 'felipe.araujo@escola.com',
    phone: '(11) 92222-9797',
    birthDate: '2011-02-18',
    enrollmentNumber: '2024008',
    classId: 'c3',
    status: 'active',
  },
];

export const mockSubjects: Subject[] = [
  { id: 'sub1', name: 'Matemática', code: 'MAT', workload: 80, teacherId: 't1' },
  { id: 'sub2', name: 'Português', code: 'POR', workload: 80, teacherId: 't1' },
  { id: 'sub3', name: 'História', code: 'HIS', workload: 60, teacherId: 't2' },
  { id: 'sub4', name: 'Geografia', code: 'GEO', workload: 60, teacherId: 't2' },
  { id: 'sub5', name: 'Educação Física', code: 'EDF', workload: 40, teacherId: 't3' },
];

export const mockGrades: Grade[] = [
  { id: 'g1', studentId: 's1', subjectId: 'sub1', classId: 'c1', quarter: 1, value: 8.5, date: '2024-03-10' },
  { id: 'g2', studentId: 's1', subjectId: 'sub2', classId: 'c1', quarter: 1, value: 9.0, date: '2024-03-11' },
  { id: 'g3', studentId: 's2', subjectId: 'sub1', classId: 'c1', quarter: 1, value: 7.0, date: '2024-03-10' },
  { id: 'g4', studentId: 's3', subjectId: 'sub1', classId: 'c1', quarter: 1, value: 6.5, date: '2024-03-10' },
  { id: 'g5', studentId: 's4', subjectId: 'sub3', classId: 'c2', quarter: 1, value: 8.0, date: '2024-03-09' },
  { id: 'g6', studentId: 's5', subjectId: 'sub4', classId: 'c2', quarter: 1, value: 9.5, date: '2024-03-09' },
];

export const mockAttendance: Attendance[] = [
  { id: 'a1', studentId: 's1', subjectId: 'sub1', classId: 'c1', date: '2024-03-20', present: true },
  { id: 'a2', studentId: 's2', subjectId: 'sub1', classId: 'c1', date: '2024-03-20', present: false },
  { id: 'a3', studentId: 's3', subjectId: 'sub1', classId: 'c1', date: '2024-03-20', present: true },
  { id: 'a4', studentId: 's4', subjectId: 'sub3', classId: 'c2', date: '2024-03-18', present: true },
  { id: 'a5', studentId: 's5', subjectId: 'sub4', classId: 'c2', date: '2024-03-18', present: true },
];
