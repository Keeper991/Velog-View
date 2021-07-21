import axios from "axios";

const api = axios.create({
  baseURL: `http://13.125.83.212/api`, // 중원님
  // baseURL: `http://13.209.82.54/api`, // 팀장님
});

const userAPI = {
  login: (user) => api.post(`/user/login`, user),
  signup: (user) => api.post(`/user/signup`, user),
};

const articleAPI = {
  get: () => api.get("/articles"),
  getOne: (id) => api.get(`/articles/${id}`),
  getPage: (pageNum, sortBy) =>
    api.get(
      `/articles/page?sortBy=${sortBy}&isAsc=${false}&size=10&page=${pageNum}`
    ),
  post: (article) => api.post("/articles", article),
  put: (id, article) => api.put(`/articles/${id}`, article),
  delete: (id) => api.delete(`/articles/${id}`),
};

const commentAPI = {
  get: (articleId) => api.get(`/comment/${articleId}`),
  post: (comment) => api.post(`/comment`, comment),
  put: (id, comment) => api.put(`/comment/${id}`, comment),
  delete: (id) => api.delete(`/comment/${id}`),
};

export { userAPI, articleAPI, commentAPI };
