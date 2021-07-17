import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { ArticleDetail, ArticleForm, ArticleList } from "../pages";
import { history } from "../redux/configStore";

function App() {
  return (
    <AppDiv>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={ArticleList} exact />
          <Route path="/write" component={ArticleForm} />
          <Route path="/@:username/:title" component={ArticleDetail} />
        </Switch>
      </ConnectedRouter>
    </AppDiv>
  );
}

const AppDiv = styled.div``;

export default App;
