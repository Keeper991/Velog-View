import styled from "styled-components";
import Header from "../components/Header";
import { Button, Text, Image, Input } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Comment from "../components/Comment";
import { actionCreators as articleActions } from "../redux/modules/article";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useEffect, useRef, useState } from "react";
import timeToDate from "../shared/Time";
import MdViewer, { setContent } from "../shared/MdViewer";
import { getUserInfoFromLS } from "../shared/Auth";

const ArticleDetail = (props) => {
  const dispatch = useDispatch();
  const id = parseInt(props.match.params.id);
  const viewerRef = useRef();
  const pathRef = useRef();
  const { username, profileImage } = getUserInfoFromLS();

  const articleList = useSelector((state) => state.article.articleList);
  const article_idx = articleList.findIndex((a) => a.id === id);
  const thisArticle = articleList[article_idx];
  const commentList = useSelector((state) => state.comment.commentList);

  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    if (thisArticle) {
      setContent(viewerRef, thisArticle.contents);
      return;
    }
    if (commentList) {
      return;
    }

    dispatch(articleActions.getOneArticleAPI(id));
    dispatch(commentActions.getCommentAPI(id));
  }, []);

  const handleComment = () => {
    const data = {
      comment: commentValue,
      username,
      articleId: id,
    };

    dispatch(commentActions.postCommentAPI(data));
  };

  return (
    <Container>
      {thisArticle && (
        <>
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
              <UserInfoBox>
                <Text isBold>{thisArticle.username}</Text>
                <span>{" ∙ "}</span>
                <Text>{timeToDate(thisArticle.createAt)}</Text>
              </UserInfoBox>
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
                  <Button
                    shape="circle"
                    _onClick={() => {
                      pathRef.current.select();
                      document.execCommand("copy");
                      pathRef.current.setSelectionRange(0, 0);
                      alert("게시글 주소가 복사되었습니다.");
                    }}
                  >
                    <input
                      style={{ position: "fixed", left: "-100%" }}
                      ref={pathRef}
                      value={document.location.href}
                      readOnly
                    />
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
          <ContentWrap>
            <MdViewer viewerRef={viewerRef} />
          </ContentWrap>
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
                value={commentValue}
                _onChange={(e) => setCommentValue(e.target.value)}
              />
              <ButtonSpace>
                <Button shape="rectangle" _onClick={handleComment}>
                  댓글 작성
                </Button>
              </ButtonSpace>
            </CommentInput>
            <CommentView>
              {commentList.map((a) => (
                <Comment {...a} />
              ))}
            </CommentView>
          </CommentWrap>
        </>
      )}
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

const UserInfoBox = styled.div`
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
  }
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
