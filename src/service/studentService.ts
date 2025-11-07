import axios from 'axios';
import { Student } from '@/types';

const API_BASE_URL = "http://localhost:5004"
const API = `${API_BASE_URL}/api/Aluno`;

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

export const deleteStudent = async (id: number) => {
  return await axios.delete(`${API}/${id}`);
};