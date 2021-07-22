import { Image, Text, Input, Button } from "../elements";
import styled from "styled-components";
import timeToDate from "../shared/Time";
import { useState } from "react";
import { PermitStrict, getUserInfoFromLS } from "../shared/Auth";
import { Color } from "../shared/Consts";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Comment = (props) => {
  const dispatch = useDispatch();
  const { id, comment, username, createdAt, articleId } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(comment);

  const { profileImage } = getUserInfoFromLS();

  const handleEditComment = () => {
    const data = {
      id,
      comment: commentValue,
      articleId,
    };
    dispatch(commentActions.putCommentAPI(id, data));
    setIsEditMode(false);
  };

  return (
    <Container>
      <UserContainer>
        <LeftBox>
          <Image
            shape="circle"
            imgUrl={
              profileImage
                ? profileImage
                : "https://velog-s3.s3.ap-northeast-2.amazonaws.com/profiles/default.svg"
            }
            width="54px"
            height="54px"
          />
          <CommentInfo>
            <Text fontSize="16px" isBold>
              {username}
            </Text>
            <Text fontSize="14px">{timeToDate(createdAt)}</Text>
          </CommentInfo>
        </LeftBox>
        <RightBox>
          <PermitStrict username={username}>
            {isEditMode ? (
              ""
            ) : (
              <>
                <OptionButton onClick={() => setIsEditMode(true)}>
                  수정
                </OptionButton>
                <OptionButton
                  onClick={() => {
                    dispatch(commentActions.deleteCommentAPI(id));
                  }}
                >
                  삭제
                </OptionButton>
              </>
            )}
          </PermitStrict>
        </RightBox>
      </UserContainer>
      <Content>
        {isEditMode ? (
          <>
            <Input
              isMultiline
              value={commentValue}
              width="100%"
              _onChange={(e) => setCommentValue(e.target.value)}
            />
            <ButtonWrap>
              <Button
                shape="rectangle"
                bg="gray"
                _onClick={() => setIsEditMode(false)}
              >
                취소
              </Button>
              <Button shape="rectangle" _onClick={handleEditComment}>
                댓글 수정
              </Button>
            </ButtonWrap>
          </>
        ) : (
          <Text fontSize="18px">{commentValue}</Text>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 767px;
  padding: 24px 0;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  & > :nth-child(2) {
    margin-top: 8px;
  }
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  & > :not(first-child) {
    margin-right: 8px;
  }
`;

const OptionButton = styled.div`
  padding: 0px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  color: rgb(134, 142, 150);
  font-size: 14px;
  :hover {
    color: black;
  }
`;

const Content = styled.div`
  margin: 18px 0;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  & > * {
    margin-left: 1em;
  }
`;
export default Comment;
