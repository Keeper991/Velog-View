import { Image, Text } from "../elements";
import styled from "styled-components";
import timeToDate from "../shared/Time";

const Comment = (props) => {
  const { id, comment, username, articleid, createdAt } = props;

  return (
    <Container>
      <UserContainer>
        <LeftBox>
          <Image
            shape="circle"
            imgUrl="https://media.vlpt.us/images/happyd1/profile/d6469687-2ac6-4b09-af2c-dbb530b1b0e2/프사.jpg?w=240"
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
          <OptionButton>수정</OptionButton>
          <OptionButton>삭제</OptionButton>
        </RightBox>
      </UserContainer>
      <Content>
        <Text fontSize="18px">{comment}</Text>
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
`;

const Content = styled.div`
  margin: 18px 0;
`;

export default Comment;
