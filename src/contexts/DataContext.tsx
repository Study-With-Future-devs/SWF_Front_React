import React, { createContext, useContext, useState } from 'react';
import { Student, Teacher, Class, Subject, Grade, Attendance } from '@/types';
import { mockStudents, mockTeachers, mockClasses, mockSubjects, mockGrades, mockAttendance } from '@/lib/mock-data';

interface DataContextType {
  students: Student[];
  teachers: Teacher[];  
  classes: Class[];
  subjects: Subject[];
  grades: Grade[];
  attendance: Attendance[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  addClass: (classItem: Class) => void;
  updateClass: (id: string, classItem: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addGrade: (grade: Grade) => void;
  addAttendance: (att: Attendance) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);

  return (
    <DataContext.Provider
      value={{
        students,
        teachers,
        classes,
        subjects,
        grades,
        attendance,
        addStudent: (s) => setStudents([...students, s]),
        updateStudent: (id, s) => setStudents(students.map(st => st.id === id ? { ...st, ...s } : st)),
        deleteStudent: (id) => setStudents(students.filter(s => s.id !== id)),
        addTeacher: (t) => setTeachers([...teachers, t]),
        updateTeacher: (id, t) => setTeachers(teachers.map(te => te.id === id ? { ...te, ...t } : te)),
        deleteTeacher: (id) => setTeachers(teachers.filter(t => t.id !== id)),
        addClass: (c) => setClasses([...classes, c]),
        updateClass: (id, c) => setClasses(classes.map(cl => cl.id === id ? { ...cl, ...c } : cl)),
        deleteClass: (id) => setClasses(classes.filter(c => c.id !== id)),
        addSubject: (s) => setSubjects([...subjects, s]),
        updateSubject: (id, s) => setSubjects(subjects.map(su => su.id === id ? { ...su, ...s } : su)),
        deleteSubject: (id) => setSubjects(subjects.filter(s => s.id !== id)),
        addGrade: (g) => setGrades([...grades, g]),
        addAttendance: (a) => setAttendance([...attendance, a]),
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}

