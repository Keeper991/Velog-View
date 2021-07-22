import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Image, Button, Text, Input, ImageUploadButton } from "../elements";
import { SignImage, CloseButton } from "../images";
import { actionCreators as userActions } from "../redux/modules/user";
import uploadFile from "../shared/Upload";
import { Color } from "../shared/Consts";

const Sign = ({
  handleModal,
  handleSignupMode,
  isActiveSignupMode,
  ...props
}) => {
  const dispatch = useDispatch();
  const defaultProfile =
    "https://velog-s3.s3.ap-northeast-2.amazonaws.com/profiles/default.svg";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState("");
  const [profileImage, setProfileImage] = useState(defaultProfile);

  const handleLoginBtn = () => {
    if (!username || !password) {
      alert("아이디 혹은 비밀번호란이 비어있습니다. 입력해주세요.");
      return;
    }

    dispatch(userActions.loginAPI({ username, password }));
  };

  const handleSignupBtn = () => {
    if (!username || !password || !passwordChecker) {
      alert(
        "아이디 혹은 비밀번호 혹은 비밀번호 확인란이 비어있습니다. 입력해주세요."
      );
      return;
    }

    dispatch(
      userActions.signupAPI({
        username,
        password,
        passwordChecker,
        profileImage,
      })
    );
  };

  return (
    <Container>
      <Column>
        <SignImage />
        <Text isBold>환영합니다.</Text>
      </Column>
      <Column>
        <CloseBtnArea>
          <Button
            shape="circle"
            _onClick={() => handleModal(false)}
            bg="transparent"
          >
            <CloseButton />
          </Button>
        </CloseBtnArea>
        <FormWrap>
          <Text isBold margin="0 0 1em 0">
            {isActiveSignupMode ? "회원가입" : "로그인"}
          </Text>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (isActiveSignupMode) {
                handleSignupBtn();
              } else {
                handleLoginBtn();
              }
            }}
          >
            <Input
              padding="0.5em"
              value={username}
              _onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
            <Input
              padding="0.5em"
              value={password}
              _onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            {isActiveSignupMode ? (
              <>
                <Input
                  padding="0.5em"
                  value={passwordChecker}
                  _onChange={(e) => setPasswordChecker(e.target.value)}
                  placeholder="비밀번호 확인"
                />
                <ProfileImageWrap>
                  <Image
                    shape="circle"
                    width="3em"
                    height="3em"
                    imgUrl={profileImage}
                  />
                  <ProfileBtnWrap>
                    <ImageUploadButton
                      setPreview={setProfileImage}
                      uploader={uploadFile}
                      author={username}
                      type="profile"
                    >
                      이미지 업로드
                    </ImageUploadButton>
                    <Button
                      shape="rectangle"
                      width="100px"
                      _onClick={() => setProfileImage(defaultProfile)}
                    >
                      삭제
                    </Button>
                  </ProfileBtnWrap>
                </ProfileImageWrap>
                <Button shape="rectangle">회원가입</Button>
                <Text fontSize="0.825em">
                  계정이 이미 있으신가요?{" "}
                  <Text
                    _onClick={() => {
                      handleSignupMode(false);
                      setUsername("");
                      setPassword("");
                      setPasswordChecker("");
                    }}
                  >
                    로그인
                  </Text>
                </Text>
              </>
            ) : (
              <>
                <Button shape="rectangle">로그인</Button>
                <Text fontSize="0.825em">
                  아직 회원이 아니신가요?{" "}
                  <Text
                    _onClick={() => {
                      handleSignupMode(true);
                      setUsername("");
                      setPassword("");
                      setProfileImage(defaultProfile);
                    }}
                  >
                    회원가입
                  </Text>
                </Text>
              </>
            )}
          </Form>
        </FormWrap>
      </Column>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 500px;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
  & > * {
    height: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
  }
  & input {
    border: 1px solid ${Color.darkGray};
    border-radius: 2px;
  }
`;
const Column = styled.div`
  width: 70%;
  &:first-child {
    width: 30%;
    background-color: ${Color.gray};
    align-items: center;
    justify-content: center;
    & > svg {
      width: 100%;
      height: 30%;
    }
  }
  &:last-child {
    background-color: ${Color.white};
    justify-content: space-between;
  }
`;
const CloseBtnArea = styled.div`
  align-self: flex-end;
  & > svg {
    cursor: pointer;
  }
`;

const FormWrap = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h2``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 90%;
  justify-content: space-between;
  & > span {
    align-self: flex-end;
  }
  & > span span {
    cursor: pointer;
    color: ${Color.green};
  }
`;

const ProfileImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    background-color: ${Color.darkGray};
  }
`;

const ProfileBtnWrap = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  & > *:first-child {
    margin-bottom: 0.2em;
  }
  & > button {
    background-color: ${Color.gray};
    color: ${Color.black};
  }
`;
export default Sign;
