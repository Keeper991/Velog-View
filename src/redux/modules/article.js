import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { articleAPI } from "../../shared/API";

const POST = "article/POST";
const GET = "article/GET";
const PUT = "article/PUT";
const DELETE = "article/DELETE";
const LOADING = "article/LOADING";

const postArticle = createAction(POST, (article) => ({ article }));
const getArticle = createAction(GET, (id) => ({ id }));
const putArticle = createAction(PUT, (article) => ({ article }));
const deleteArticle = createAction(DELETE, (id) => ({ id }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialArticle = {
  id: "",
  title: "",
  description: "",
  createAt: 0,
  thumbnail: "",
  commentCount: 0,
  username: "user",
  likeCount: 0,
  profileImage: "default",
};

const initialState = {
  articleList: [initialArticle],
  isLoading: false,
};

const reducer = handleActions(
  {
    [POST]: (state, action) => produce(state, (draft) => {}),
    [GET]: (state, action) => produce(state, (draft) => {}),
    [PUT]: (state, action) => produce(state, (draft) => {}),
    [DELETE]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const actionCreators = {};
export default reducer;
