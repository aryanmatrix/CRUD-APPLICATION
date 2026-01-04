import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/students';

export const getAllStudents = async () => {
  const response = await axios.get(API_BASE_URL);
  return { data: response.data.data };
};

export const getStudentById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return { data: response.data.data };
};

export const addStudent = async (studentData) => {
  const response = await axios.post(API_BASE_URL, studentData);
  return { data: response.data.data };
};

export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, studentData);
  return { data: response.data.data };
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return { data: response.data.data };
};