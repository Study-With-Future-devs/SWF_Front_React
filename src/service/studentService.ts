import axios from 'axios';
import { Student } from '@/types';

const API = '/api/Aluno';

export const getAllStudents = async (): Promise<Student[]> => {
  const { data } = await axios.get<Student[]>(API);
  return data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const { data } = await axios.get<Student>(`${API}/${id}`);
  return data;
};

export const createStudent = async (student: Partial<Student>): Promise<Student> => {
  const { data } = await axios.post<Student>(API, student);
  return data;
};

export const updateStudent = async (id: number, student: Partial<Student>): Promise<Student> => {
  const { data } = await axios.put<Student>(`${API}/${id}`, student);
  return data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};
