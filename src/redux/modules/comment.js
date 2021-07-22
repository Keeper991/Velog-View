import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { commentAPI } from "../../shared/API";
import { useDispatch } from "react-redux";

const POST_COMMENT = "comment/POST";
const PUT_COMMENT = "comment/PUT";
const DELETE_COMMENT = "comment/DELETE";
const LOADING = "article/LOADING";

const postComment = createAction(POST_COMMENT, (comment) => ({ comment }));
const putComment = createAction(PUT_COMMENT, (id, comment) => ({
  id,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (id) => ({ id }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const postCommentAPI = (comment) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    commentAPI.post(comment).then((response) => {
      const data = response.data;
      const id = data.id;

      comment.id = id;

      dispatch(postComment(comment));
    });
  };
};

const putCommentAPI = (id, comment) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    commentAPI.put(id, comment).then(() => {
      dispatch(putComment(id, comment));
    });
  };
};

const deleteCommentAPI = (id) => {
  return (dispatch, getState, { history }) => {
    dispatch(loading(true));
    commentAPI.delete(id).then(() => {
      dispatch(deleteComment(id));
    });
  };
};

const initialComment = {
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
  commentList: [initialComment],
  isLoading: false,
};

const reducer = handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload;
      }),

    [POST_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList.unshift(action.payload.comment);
        draft.isLoading = false;
      }),

    [PUT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.commentList.findIndex(
          (c) => c.id === action.payload.id
        );

        draft.commentList[idx] = {
          ...draft.commentList[idx],
          ...action.payload.comment,
        };
        draft.isLoading = false;
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.commentList.findIndex(
          (c) => c.id === action.payload.id
        );

        if (idx !== -1) {
          draft.commentList.splice(idx, 1);
          draft.isLoading = false;
        }
      }),
  },
  initialState
);

export const actionCreators = {
  postCommentAPI,
  putCommentAPI,
  deleteCommentAPI,
};

export default reducer;
