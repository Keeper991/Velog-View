import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api/`,
});

const userAPI = {};

const articleAPI = {
  get: () => api.get("/articles"),
  getOne: (id) => api.get(`/articles/${id}`),
  post: (article) => api.post("/articles", article),
  put: (id, article) => api.put(`/articles/${id}`, article),
  delete: (id) => api.delete(`/articles/${id}`),
};

const commentAPI = {
  post: (comment) => api.post(`/comment`, comment),
  put: (id, comment) => api.put(`/comment/${id}`, comment),
  delete: (id) => api.delete(`/comment/${id}`),
};

export { userAPI, articleAPI, commentAPI };
