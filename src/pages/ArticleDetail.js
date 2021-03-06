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
import { getUserInfoFromLS, Permit, PermitStrict } from "../shared/Auth";
import { history } from "../redux/configStore";

const ArticleDetail = (props) => {
  const dispatch = useDispatch();
  const id = parseInt(props.match.params.id);
  const viewerRef = useRef();
  const pathRef = useRef();
  const { username } = getUserInfoFromLS();

  const articleList = useSelector((state) => state.article.articleList);
  const article_idx = articleList.findIndex((a) => a.id === id);
  const thisArticle = articleList[article_idx];
  const commentList = useSelector((state) => state.comment.commentList);

  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    if (!thisArticle) {
      dispatch(articleActions.getOneArticleAPI(id));
    } else {
      setContent(viewerRef, thisArticle.contents);
    }
    dispatch(commentActions.getCommentAPI(id));
  }, [thisArticle]);

  const handleComment = () => {
    const data = {
      comment: commentValue,
      username,
      articleId: id,
    };

    dispatch(commentActions.postCommentAPI(data));
    setCommentValue("");
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
                <span>{" ??? "}</span>
                <Text>{timeToDate(thisArticle.createAt)}</Text>
              </UserInfoBox>
              <ArtOptionBox>
                <PermitStrict username={thisArticle.username}>
                  <OptionButton onClick={() => history.push(`/write/${id}`)}>
                    ??????
                  </OptionButton>
                  <OptionButton
                    onClick={() => {
                      dispatch(articleActions.deleteArticleAPI(id));
                    }}
                  >
                    ??????
                  </OptionButton>
                </PermitStrict>
              </ArtOptionBox>
            </InfoContainer>
            <LikeShareWrap>
              <LikeShareContainer>
                <LikeShareBox>
                  <Button bg="white" shape="circle">
                    <FavoriteIcon fontSize="large" />
                    {/* <FavoriteBorderIcon /> */}
                  </Button>
                  <div>{thisArticle.likeCount}</div>
                  <Button
                    bg="white"
                    shape="circle"
                    _onClick={() => {
                      pathRef.current.select();
                      document.execCommand("copy");
                      pathRef.current.setSelectionRange(0, 0);
                      alert("????????? ????????? ?????????????????????.");
                    }}
                  >
                    <input
                      style={{ position: "fixed", top: "-1000%" }}
                      ref={pathRef}
                      value={document.location.href}
                      readOnly
                    />
                    <ShareIcon fontSize="large" />
                  </Button>
                </LikeShareBox>
              </LikeShareContainer>
            </LikeShareWrap>
          </HeadWrap>
          <Image
            shape="rectangle"
            imgUrl={`${thisArticle.thumbnail}`}
            width="768px"
            height="432px"
            margin="0 auto"
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
                {commentList?.length}
                ?????? ??????
              </Text>
              <Permit>
                <Input
                  width="100%"
                  isMultiline
                  padding="16px"
                  margin="16px 0 24px 0"
                  placeholder="????????? ???????????????"
                  value={commentValue}
                  _onChange={(e) => setCommentValue(e.target.value)}
                />
                <ButtonSpace>
                  <Button shape="rectangle" _onClick={handleComment}>
                    ?????? ??????
                  </Button>
                </ButtonSpace>
              </Permit>
            </CommentInput>
            <CommentView>
              {commentList?.map((a) => (
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
  overflow-x: hidden;
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
  :hover {
    color: black;
  }
`;

const LikeShareWrap = styled.div`
  margin-top: 32px;
  position: relative;
`;

const LikeShareContainer = styled.div`
  position: fixed;
  top: 300px;
  transform: translateX(-200%);
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
  word-break: break-all;
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
