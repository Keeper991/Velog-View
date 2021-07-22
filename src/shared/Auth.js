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

const Permit = ({ children, ...props }) => {
  const { username } = getUserInfoFromLS();

  if (username) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};

const PermitStrict = ({ username, children, ...props }) => {
  const { username: loginUsername } = getUserInfoFromLS();

  if (username === loginUsername) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};

export { getUserInfoFromLS, setTokenToLS, Permit, PermitStrict };
