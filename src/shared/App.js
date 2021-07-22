import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { ArticleDetail, ArticleForm, ArticleList } from "../pages";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoFromLS } from "./Auth";
import { actionCreators as userActions } from "../redux/modules/user";
import { useEffect } from "react";
import Modal from "../components/Modal";
import Sign from "../components/Sign";

function App() {
  const dispatch = useDispatch();
  const { username } = getUserInfoFromLS();
  const isLogin = useSelector((state) => state.user.isLogin);
  const isActiveSign = useSelector((state) => state.user.isActiveSign);
  const isActiveSignupMode = useSelector(
    (state) => state.user.isActiveSignupMode
  );

  const handleModal = (bool) => {
    dispatch(userActions.setActiveSign(bool));
  };

  const handleSignupMode = (bool) => {
    dispatch(userActions.setActiveSignupMode(bool));
  };

  useEffect(() => {
    if (username) {
      dispatch(userActions.loginCheckAPI());
    }
  }, []);

  return (
    <AppDiv>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={ArticleList} exact />
          <Route path="/write" component={ArticleForm} />
          <Route path="/@:username/:title" component={ArticleDetail} />
        </Switch>
      </ConnectedRouter>

      {!isLogin ? (
        <Modal displayState={isActiveSign} setDisplayState={handleModal}>
          <Sign
            isActiveSignupMode={isActiveSignupMode}
            handleSignupMode={handleSignupMode}
            handleModal={handleModal}
          />
        </Modal>
      ) : (
        ""
      )}
    </AppDiv>
  );
}

const AppDiv = styled.div``;

export default App;
