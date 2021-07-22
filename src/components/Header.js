import { Image, Text, Button } from "../elements";
import styled from "styled-components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Title, SearchIcon } from "../images";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { getUserInfoFromLS } from "../shared/Auth";

const Header = (props) => {
  const dispatch = useDispatch();
  const { isMain, userName } = props;

  const isLogin = useSelector((state) => state.user.isLogin);
  const { profileImage } = getUserInfoFromLS();
  return (
    <>
      <Container>
        {isMain ? (
          <Button
            shape="rectangle"
            bg="#f8f9fa"
            padding="16px 0"
            color="rgb(52, 58, 64)"
            fontSize="25px"
          >
            <Title />
          </Button>
        ) : (
          <DesignWrap>
            <Button
              shape="rectangle"
              width="30px"
              height="30px"
              padding="0 10px"
              color="#FFFFFF"
              bg="#2E2E2E"
            >
              <Text isBold>V</Text>
            </Button>
            <Button shape="rectangle" bg="#FFFFFF" color="#2E2E2E">
              <Text isBold> {userName}.log </Text>
            </Button>
          </DesignWrap>
        )}

        <ButtonContainer>
          <Button shape="circle" bg="#f8f9fa">
            <SearchIcon />
          </Button>
          {!isLogin ? (
            <Button
              shape="pill"
              _onClick={() => dispatch(userActions.setActiveSign(true))}
            >
              로그인
            </Button>
          ) : (
            <>
              <Button shape="pill" _onClick={() => history.push("/write")}>
                새 글 작성
              </Button>
              <ProfileButtons>
                <Button shape="circle" bg="#f8f9fa">
                  <Image width="40px" height="40px" imgUrl={profileImage} />
                </Button>
                <ArrowDropDownIcon />
              </ProfileButtons>
            </>
          )}
        </ButtonContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 2em;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  & > :nth-child(1) {
    margin-right: 12px;
  }
  & > :nth-child(2) {
    margin-right: 20px;
  }
`;

const ProfileButtons = styled.div`
  display: flex;
  align-items: center;
`;

const DesignWrap = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
