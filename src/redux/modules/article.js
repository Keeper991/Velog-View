import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { articleAPI } from "../../shared/API";

const POST = "article/POST";
const GET = "article/GET";
const GET_ONE = "article/GET_ONE";
const PUT = "article/PUT";
const DELETE = "article/DELETE";
const LOADING = "article/LOADING";

const postArticle = createAction(POST, (article) => ({ article }));
const getArticle = createAction(GET, (articleList, totalPageCnt, sortBy) => ({
  articleList,
  totalPageCnt,
  sortBy,
}));
const getOneArticle = createAction(GET_ONE, (article) => ({
  article,
}));
const putArticle = createAction(PUT, (id, article) => ({ id, article }));
const deleteArticle = createAction(DELETE, (id) => ({ id }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const postArticleAPI = (article) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI
      .post(article)
      .then((response) => {
        const data = response.data;
        const id = data.id;
        article.id = id;
        article.createdAt = Date.now();
        article.commentCount = 0;
        article.likeCount = 0;

        dispatch(postArticle(article));
        alert("게시글 작성에 성공했습니다!");
        history.push(`/@${article.username}/${id}`);
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
        alert("게시글 작성에 실패했습니다.");
      });
  };
};

const getArticleAPI = (pageNum, sortBy) => {
  return (dispatch, getState, { history }) => {
    if (sortBy === "createdAt") {
      const { nextPage, totalPageCnt } = getState().article.paging;
      if (nextPage > totalPageCnt && nextPage !== 1) {
        return;
      }
      dispatch(loading(true));

      articleAPI.getPage(nextPage, sortBy).then((response) => {
        const data = response.data;
        const articleList = data.content;
        const totalPageCnt = data.totalPages;

        dispatch(getArticle(articleList, totalPageCnt, sortBy));
      });
    } else {
      const { nextPageOrderByLike, totalPageCntOrderByLike } =
        getState().article.paging;
      if (
        nextPageOrderByLike > totalPageCntOrderByLike &&
        nextPageOrderByLike !== 1
      ) {
        return;
      }
      dispatch(loading(true));

      articleAPI.getPage(nextPageOrderByLike, sortBy).then((response) => {
        const data = response.data;
        const articleList = data.content;
        const totalPageCnt = data.totalPages;

        dispatch(getArticle(articleList, totalPageCnt, sortBy));
      });
    }
  };
};

const getOneArticleAPI = (id) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI.getOne(id).then((response) => {
      const article = [response.data];

      dispatch(getOneArticle(article));
    });
  };
};

const putArticleAPI = (id, article) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI
      .put(id, article)
      .then(() => {
        dispatch(putArticle(article));
        alert("게시글 수정에 성공했습니다!");
        history.push(`/@${article.username}/${id}`);
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
        alert("게시글 수정에 실패했습니다.");
      });
  };
};

const deleteArticleAPI = (id) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    articleAPI.delete(id).then(() => {
      dispatch(deleteArticle(id));
      history.push("/");
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
  articleList: [
    // initialArticle
  ],
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
        draft.articleListOrderByLike.push(action.payload.article);
        draft.isLoading = false;
      }),
    [GET]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.sortBy === "createdAt") {
          draft.articleList.push(...action.payload.articleList);
          draft.articleList = draft.articleList.reduce((acc, cur) => {
            if (acc.findIndex((a) => a.id === cur.id) === -1) {
              return [...acc, cur];
            } else {
              acc[acc.findIndex((a) => a.id === cur.id)] = cur;
              return acc;
            }
          }, []);
          draft.paging.totalPageCnt = action.payload.totalPageCnt;
          draft.paging.nextPage += 1;
          draft.isLoading = false;
        } else {
          draft.articleListOrderByLike.push(...action.payload.articleList);
          draft.articleListOrderByLike = draft.articleListOrderByLike.reduce(
            (acc, cur) => {
              if (acc.findIndex((a) => a.id === cur.id) === -1) {
                return [...acc, cur];
              } else {
                acc[acc.findIndex((a) => a.id === cur.id)] = cur;
                return acc;
              }
            },
            []
          );
          draft.paging.totalPageCntOrderByLike = action.payload.totalPageCnt;
          draft.paging.nextPageOrderByLike += 1;
          draft.isLoading = false;
        }
      }),
    [GET_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.articleList.push(...action.payload.article);
        // draft.articleListOrderByLike.push(...action.payload.article);
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
  getOneArticleAPI,
  putArticleAPI,
};
export default reducer;
