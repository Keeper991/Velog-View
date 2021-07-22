import jwt_decode from "jwt-decode";

const TOKEN_NAME = "VELOG_USER_TOKEN";

const getUserInfoFromLS = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  try {
    const result = jwt_decode(token);
    return { username: result.sub, profileImage: result.profileImage };
  } catch (e) {
    return { username: null, profileImage: null };
  }
};

const setTokenToLS = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export { getUserInfoFromLS, setTokenToLS };
