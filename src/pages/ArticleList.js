import styled from "styled-components";
import Card from "../components/Card";
import { Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { actionCreators as articleActions } from "../redux/modules/article";
import InfinityScroll from "../shared/InfinityScroll";
import { history } from "../redux/configStore";
import { Color } from "../shared/Consts";

const ArticleList = (props) => {
  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.article.articleList);
  const articleListOrderByLike = useSelector(
    (state) => state.article.articleListOrderByLike
  );
  const isLoading = useSelector((state) => state.article.isLoading);
  const paging = useSelector((state) => state.article.paging);
  const [sortBy, setSortBy] = useState("createdAt");

  useEffect(() => {
    if (sortBy === "createdAt" && articleList.length < 2) {
      dispatch(articleActions.getArticleAPI(1, "createdAt"));
    }
    if (sortBy === "likeCount" && articleListOrderByLike.length < 2) {
      dispatch(articleActions.getArticleAPI(1, "likeCount"));
    }
  }, [sortBy]);

  return (
    <ContainerWrap>
      <Header isMain />
      <ButtonContainer>
        {sortBy === "createdAt" ? (
          <>
            <DetailButton
              borderColor={Color.darkGray}
              onClick={() => setSortBy("likeCount")}
            >
              <TrendingUpIcon style={{ color: Color.darkGray }} />
              <Text fontSize="18px" isBold color={Color.darkGray}>
                트렌딩
              </Text>
            </DetailButton>
            <DetailButton onClick={() => setSortBy("createdAt")}>
              <QueryBuilderIcon />
              <Text fontSize="18px" isBold>
                최신
              </Text>
            </DetailButton>
          </>
        ) : (
          <>
            <DetailButton onClick={() => setSortBy("likeCount")}>
              <TrendingUpIcon />
              <Text fontSize="18px" isBold>
                트렌딩
              </Text>
            </DetailButton>
            <DetailButton
              borderColor={Color.darkGray}
              onClick={() => setSortBy("createdAt")}
            >
              <QueryBuilderIcon style={{ color: Color.darkGray }} />
              <Text fontSize="18px" isBold color={Color.darkGray}>
                최신
              </Text>
            </DetailButton>
          </>
        )}
      </ButtonContainer>
      <Container>
        <CardList>
          {sortBy === "createdAt" ? (
            <InfinityScroll
              callNext={() => {
                dispatch(articleActions.getArticleAPI(paging.nextPage, sortBy));
              }}
              isNext={paging.nextPage > paging.totalPageCnt ? false : true}
              loading={isLoading}
            >
              {articleList.map((a, idx) => (
                <Card
                  {...a}
                  key={idx}
                  _onClick={() => {
                    history.push(`/@${a.username}/${a.id}`);
                  }}
                />
              ))}
            </InfinityScroll>
          ) : (
            <InfinityScroll
              callNext={() => {
                dispatch(
                  articleActions.getArticleAPI(
                    paging.nextPageOrderByLike,
                    sortBy
                  )
                );
              }}
              isNext={
                paging.nextPageOrderByLike > paging.totalPageCntOrderByLike
                  ? false
                  : true
              }
              loading={isLoading}
            >
              {articleListOrderByLike.map((a, idx) => (
                <Card
                  {...a}
                  key={idx}
                  _onClick={() => {
                    history.push(`/@${a.username}/${a.id}`);
                  }}
                />
              ))}
            </InfinityScroll>
          )}
        </CardList>
      </Container>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100vw;
  min-height: 100vh;
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
  border-bottom: 3px solid
    ${({ borderColor }) => (borderColor ? borderColor : "rgb(52, 58, 64)")};
  margin: 16px;
  cursor: pointer;
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
  display: flex;
  flex-wrap: wrap;
  width: 1785px;
  margin: auto;
  @media only screen and (max-width: 1785px) {
    width: 1428px;
  }
  @media only screen and (max-width: 1428px) {
    width: 1071px;
  }
  @media only screen and (max-width: 1071px) {
    width: 714px;
  }
  @media only screen and (max-width: 714px) {
    width: 100%;
    & > div {
      width: 100%;
    }
  }
`;

export default ArticleList;
