import { Image, Text } from "../elements";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import timeToDate from "../shared/Time";

const Card = (props) => {
  const {
    id,
    title,
    description,
    createAt,
    thumbnail,
    commentCount,
    profileImage,
    username,
    likeCount,
  } = props;

  return (
    <Container>
      <ThumbnailBox>
        <Image
          imgUrl={thumbnail}
          shape="rectangle"
          width="100%"
          height="100%"
        />
      </ThumbnailBox>
      <ContentWrap>
        <ContentBox>
          <Text isTitle margin="0 0 5px 0">
            {title}
          </Text>
          <Text padding="5px 0">{description}</Text>
        </ContentBox>
        <DtCmtWrap>
          <Text>{timeToDate(createAt)}</Text>
          {" ∙ "}
          <Text>{commentCount}개의 댓글</Text>
        </DtCmtWrap>
      </ContentWrap>
      <CardInfo>
        <UserBox>
          <Image imgUrl={profileImage} width="24px" height="24px" />
          <p> by </p>
          <Text fontSize="0.75rem" isBold="bold">
            {username}
          </Text>
        </UserBox>
        <LikeBox>
          <FavoriteIcon fontSize="small" />
          <Text margin="0 0 0 8px">{likeCount}</Text>
        </LikeBox>
      </CardInfo>
    </Container>
  );
};

const Container = styled.div`
  width: 325px;
  height: 380px;
  margin: 16px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: 0.5s;
  &: hover {
    cursor: pointer;
    transform: translateY(-12px);
  }
  display: flex;
  flex-direction: column;
`;

const ThumbnailBox = styled.div`
  width: 100%;
  min-height: 165px;
`;

const ContentWrap = styled.div`
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DtCmtWrap = styled.div`
  font-size: 0.75rem;
  color: gray;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  padding: 10px 16px;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  & > p:nth-of-type(1) {
    margin: 0 8px;
    color: gray;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
`;

export default Card;
