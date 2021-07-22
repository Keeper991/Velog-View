import styled from "styled-components";
import Card from "../components/Card";
import { Button, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/modules/article";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Header from "../components/Header";

const ArticleList = (props) => {
  // const dispatch = useDispatch();

  // dispatch(actionCreators.getArticleAPI());

  // const cardData = useSelector((state) => state.articleList);
  // const isLoading = useSelector((state) => state.isLoading);

  return (
    <ContainerWrap>
      <Header isMain />
      <ButtonContainer>
        <DetailButton state="">
          <TrendingUpIcon />
          <Text fontSize="18px" isBold>
            트렌딩
          </Text>
        </DetailButton>
        <DetailButton>
          <QueryBuilderIcon />
          <Text fontSize="18px" isBold>
            최신
          </Text>
        </DetailButton>
      </ButtonContainer>
      <Container>
        {/* <CardList>
          {cardData.map((c) => (
            <Card {...c} />
          ))}
        </CardList> */}
      </Container>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f8f9fa;
  & > :nth-child(1) {
    margin: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 1785px;
  margin: auto;
  margin-top: 24px;
`;

const DetailButton = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  & > :nth-child(2) {
    margin-left: 8px;
  }
  border-bottom: 3px solid rgb(52, 58, 64);
  margin: 16px;
`;

// const LatestButton = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 15px;
//   & > :nth-child(2) {
//     margin-left: 8px;
//   }
//   margin: 16px;
// `;

const Container = styled.div``;

const CardList = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 1785px;
`;

export default ArticleList;
