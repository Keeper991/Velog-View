import { Image, Text } from "../elements";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";

const Card = (props) => {
  const {
    title,
    subtitle,
    dt_num,
    comment_cnt,
    profile_img,
    user_name,
    like_cnt,
  } = props;

  return (
    <Container width="320px" height="375px" margin="16px">
      <Image src={profile_img} width="100%" height="165px" shape="rectangle" />
      <Container
        width="320px"
        height="165px"
        padding="16px"
        flex_direction="column"
      >
        <Container margin="0 0 4px 0">
          <Text>{title}</Text>
        </Container>
        <Container margin="0 0 24px 0">
          <Text>{subtitle}</Text>
        </Container>
        <Container
          width="320px"
          height="100%"
          flex_direction="row"
          align_items="flex-end"
        >
          <Text margin="0 5px 0 0" fontsize="12px">
            {dt_num}
          </Text>
          <Text margin="0 0 0 5px" fontsize="12px">
            {comment_cnt}개의 댓글
          </Text>
        </Container>
      </Container>
      <Container
        width="320px"
        height="45px"
        padding="10px 16px"
        border_top="1px solid lightgray"
      >
        <Image src={profile_img} shape="circle" />
        <Text>{user_name}</Text>
        <Text>{like_cnt}</Text>
      </Container>
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  ${(props) => (props.border_top ? `border-top: ${props.border_top};` : "")}
  ${(props) =>
    props.flex_direction
      ? `display: flex; flex-direction: ${props.flex_direction};`
      : ""}
  ${(props) => (props.position ? `position: ${props.position};` : "")}
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : "")}
  ${(props) => (props.align_items ? `align-items: ${props.align_items};` : "")}
`;

export default Card;
