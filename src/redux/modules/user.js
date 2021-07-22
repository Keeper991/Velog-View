import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getUserInfoFromLS, setTokenToLS } from "../../shared/Auth";
import { userAPI } from "../../shared/API";

const SET = "user/SET";
const LOGOUT = "user/LOGOUT";
const CHECKING = "user/CHECKING";
const ACTIVE_SIGN = "user/ACTIVE_SIGN";
const ACTIVE_SIGNUP_MODE = "user/ACTIVE_SIGNUP_MODE";

const setUser = createAction(SET, (user) => ({ user }));
const logout = createAction(LOGOUT, () => ({}));
const setChecking = createAction(CHECKING, (bool) => ({ bool }));
const setActiveSign = createAction(ACTIVE_SIGN, (bool) => ({ bool }));
const setActiveSignupMode = createAction(ACTIVE_SIGNUP_MODE, (bool) => ({
  bool,
}));

const loginCheckAPI = () => async (dispatch, getState) => {
  // 서버에 토큰을 전달해서, 유효한 토큰인지 확인.
  // 만약 유효하지 않으면 토큰 삭제 및 로그아웃처리.
  // 유효하면 isLogin = true로 전환.
  dispatch(setChecking(true));
  const user = getUserInfoFromLS();

  dispatch(setUser(user));
};

const signupAPI =
  (user) =>
  async (dispatch, getState, { history }) => {
    dispatch(setChecking(true));

    try {
      await userAPI.signup(user);
      dispatch(setChecking(false));
      dispatch(setActiveSignupMode(false));
      alert("회원가입에 성공했습니다. 로그인해주세요.");
    } catch (e) {
      dispatch(setChecking(false));
      alert("회원가입에 실패했습니다.");
      console.log(e);
    }
  };

const loginAPI =
  (user) =>
  async (dispatch, getState, { history }) => {
    dispatch(setChecking(true));

    try {
      const res = await userAPI.login(user);
      setTokenToLS(res.data);
      dispatch(setUser(getUserInfoFromLS()));
      dispatch(setActiveSign(false));
      alert("로그인되었습니다.");
    } catch (e) {
      dispatch(setChecking(false));
      alert("로그인에 실패했습니다.");
      console.log(e);
    }
  };

const initialState = {
  user: {
    username: "",
    profileImage: "",
    likeList: [],
  },
  isLogin: false,
  isUserChecking: false,
  isActiveSign: false,
  isSignupMode: false,
};

const reducer = handleActions(
  {
    [SET]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isUserChecking = false;
        draft.isLogin = true;
        draft.isUserChecking = false;
      }),
    [CHECKING]: (state, action) =>
      produce(state, (draft) => {
        draft.isUserChecking = action.payload.bool;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = { username: "", profileImage: "", likeList: [] };
        draft.isLogin = false;
        draft.isUserChecking = false;
      }),
    [ACTIVE_SIGN]: (state, action) =>
      produce(state, (draft) => {
        draft.isActiveSign = action.payload.bool;
        draft.isActiveSignupMode = false;
      }),
    [ACTIVE_SIGNUP_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.isActiveSignupMode = action.payload.bool;
      }),
  },
  initialState
);

export const actionCreators = {
  loginCheckAPI,
  logout,
  signupAPI,
  loginAPI,
  setActiveSign,
  setActiveSignupMode,
};
export default reducer;
