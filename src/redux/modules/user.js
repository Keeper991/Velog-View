import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const initialState = {
  username: "",
  profileImage: "",
  likeList: "",
};

const reducer = handleActions({}, initialState);

export const actionCreators = {};
export default reducer;
