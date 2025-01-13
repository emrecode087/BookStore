import axios from 'axios';

// API base URL (backend'inize göre değiştirebilirsiniz)
const API_BASE_URL = 'https://localhost:5209/api/books';

export async function getBooks() {
  return await axios.get(API_BASE_URL);
}

export async function createBook(book) {
  return await axios.post(API_BASE_URL, book);
}

export async function deleteBook(id) {
  return await axios.delete(`${API_BASE_URL}/${id}`);
}

export async function updateBook(id, book) {
  return await axios.put(`${API_BASE_URL}/${id}`, book);
}
