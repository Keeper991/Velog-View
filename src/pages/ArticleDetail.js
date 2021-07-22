import styled from "styled-components";
import Header from "../components/Header";
import { Button, Text, Image, Input } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Comment from "../components/Comment";
import { actionCreators as articleActions } from "../redux/modules/article";
import { useEffect } from "react";
import timeToDate from "../shared/Time";

const ArticleDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const articleList = useSelector((state) => state.article.articleList);
  const article_idx = articleList.findIndex((a) => a.id === id);

  const thisArticle = articleList[article_idx];

  useEffect(() => {
    if (thisArticle) {
      return;
    }

    dispatch(articleActions.getOneArticleAPI(id));
  }, []);

  return (
    <Container>
      <Header />
      <HeadWrap>
        <TitleBox>
          <Text fontSize="48px" isBold>
            {thisArticle.title}
          </Text>
        </TitleBox>
        <SubtitleBox>
          <Text fontSize="24px">{thisArticle.description}</Text>
        </SubtitleBox>
        <InfoContainer>
          <userInfoBox>
            <Text isBold>{thisArticle.username}</Text>
            <span>{" ∙ "}</span>
            <Text>{timeToDate(thisArticle.createAt)}</Text>
          </userInfoBox>
          <ArtOptionBox>
            <OptionButton>통계</OptionButton>
            <OptionButton>수정</OptionButton>
            <OptionButton>삭제</OptionButton>
          </ArtOptionBox>
        </InfoContainer>
        <LikeShareWrap>
          <LikeShareContainer>
            <LikeShareBox>
              <Button shape="circle" border="1px solid ">
                <FavoriteIcon />
                {/* <FavoriteBorderIcon /> */}
              </Button>
              <div>{thisArticle.likeCount}</div>
              <Button shape="circle">
                <ShareIcon />
              </Button>
            </LikeShareBox>
          </LikeShareContainer>
        </LikeShareWrap>
      </HeadWrap>
      <Image
        shape="rectangle"
        imgUrl={thisArticle.thumbnail}
        width="768px"
        height="432px"
        margin="auto"
      />
      <ContentWrap>{thisArticle.contents}</ContentWrap>
      <UserContainer>
        <UserInfo>
          <Image
            imgUrl={thisArticle.profileImage}
            shape="circle"
            width="128px"
            height="128px"
            margin="0 16px 0 0"
          />
          <Text isBold fontSize="24px">
            {thisArticle.username}
          </Text>
        </UserInfo>
      </UserContainer>
      <CommentWrap>
        <CommentInput>
          <Text fontSize="18px" isBold>
            {thisArticle.commentCount}
            개의 댓글
          </Text>
          <Input
            width="100%"
            isMultiline
            padding="16px"
            margin="16px 0 24px 0"
            placeholder="댓글을 작성하세요"
          />
          <ButtonSpace>
            <Button shape="rectangle">댓글 작성</Button>
          </ButtonSpace>
        </CommentInput>
        <CommentView>
          {/* {articleList.map((a) => (
            <Comment {...a} />
          ))} */}
          <Comment
            comment="이것은 댓글 입니다. 이것은 댓글 입니다. 이것은 댓글입니다."
            username="happyd1"
            createdAt={parseInt(1578290155000)}
          />
          <Comment
            comment="이것은 댓글 입니다. 이것은 댓글 입니다. 이것은 댓글입니다."
            username="happyd1"
            createdAt={parseInt(1578290155000)}
          />
          {/* {commentList} */}
        </CommentView>
      </CommentWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  & > :nth-child(1) {
    margin: auto;
  }
`;

const HeadWrap = styled.div`
  width: 768px;
  margin: 88px auto;
`;

const TitleBox = styled.div`
  margin-bottom: 64px;
`;

const SubtitleBox = styled.div`
  background-color: #f8f9fa;
  padding: 32px 24px;
  margin-bottom: 32px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const userInfoBox = styled.div`
  display: flex;
  align-items: center;
  & > :nth-child(2) {
    margin: 0 8px;
  }
`;

const ArtOptionBox = styled.div`
  & > :not(first-child) {
    margin-left: 8px;
  }
`;

const OptionButton = styled.button`
  padding: 0px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  color: rgb(134, 142, 150);
  font-size: 16px;
`;

const LikeShareWrap = styled.div`
  margin-top: 32px;
  position: relative;
`;

const LikeShareContainer = styled.div`
  position: absolute;
  left: -7rem;
`;

const LikeShareBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: rgb(248, 249, 250);
  border: 1px solid rgb(241, 243, 245);
  width: 4rem;
  border-radius: 2rem;
  & > :nth-child(2) {
    margin: 8px 0 16px 0;
  }
`;

const ContentWrap = styled.div`
  width: 768px;
  margin: auto;
`;

const UserContainer = styled.div`
  width: 767px;
  margin: 256px auto 96px auto;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CommentWrap = styled.div`
  width: 767px;
  margin: auto;
`;

const CommentInput = styled.div`
  position: relative;
`;

const ButtonSpace = styled.div`
  & > :nth-child(1) {
    position: absolute;
    right: 0;
`;

const CommentView = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > :not(last-child) {
    border-bottom: 1px solid rgb(233, 236, 239);
  }
  margin-top: 56px;
`;

export default ArticleDetail;
