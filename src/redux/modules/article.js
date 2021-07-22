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
const putArticle = createAction(PUT, (id, article) => ({ id, article }));
const deleteArticle = createAction(DELETE, (id) => ({ id }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const postArticleAPI = (article) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI.post(article).then((response) => {
      const data = response.data;
      const id = data.id;

      article.id = id;

      //mdn 공식문서 참조 (배열이 아닌 dic형태라서 push를 쓰면 안된다.)

      dispatch(postArticle(article));
    });
  };
};

const getArticleAPI = () => {
  return (dispatch, getState, { history }) => {
    const { nextPage, totalPageCnt } = getState().article.paging;
    if (nextPage > totalPageCnt) {
      return;
    }
    dispatch(loading(true));

    // get()을 getPage()로 바꾸고, 인자로 들어갈 적절한 변수를 넣으세욥.
    articleAPI.get().then((response) => {
      // response에서 적절한 값을 찾아서 redux에 알맞게 넣어주세욥.
      const articleList = response.data;

      dispatch(getArticle(articleList));
    });
  };
};

const getOneArticleAPI = (id) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI.getOne(id).then((response) => {
      const article = [response.data];

      dispatch(getArticle(article));
    });
  };
};

const putArticleAPI = (id, article) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI.put(id, article).then(() => {
      dispatch(putArticle(article));
    });
  };
};

const deleteArticleAPI = (id) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI.delete(id).then(() => {
      dispatch(deleteArticle(id));
    });
  };
};

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
  // 최신순
  articleList: [initialArticle],
  // 좋아요순
  articleListOrderByLike: [],
  // 로딩중
  isLoading: true,
  // pagination
  paging: {
    // 최신순
    nextPage: 1,
    totalPageCnt: 0,
    // 좋아요순
    nextPageOrderByLike: 1,
    totalPageCntOrderByLike: 0,
    size: 10,
  },
};

const reducer = handleActions(
  {
    [POST]: (state, action) =>
      produce(state, (draft) => {
        draft.articleList.unshift(action.payload.article);
        draft.isLoading = false;
      }),
    [GET]: (state, action) =>
      produce(state, (draft) => {
        draft.articleList.push(...action.payload.articleList);
        draft.isLoading = false;
      }),
    [PUT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.articleList.findIndex(
          (a) => a.id === action.payload.id
        );

        draft.articleList[idx] = {
          ...draft.articleList[idx],
          ...action.payload.article,
        };
        draft.isLoading = false;
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.articleList.findIndex(
          (a) => a.id === action.payload.id
        );

        if (idx !== -1) {
          draft.articleList.splice(idx, 1);
          draft.isLoading = false;
        }
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload;
      }),
  },
  initialState
);

export const actionCreators = {
  postArticleAPI,
  getArticleAPI,
  deleteArticleAPI,
};
export default reducer;
