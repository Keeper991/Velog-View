import { useRef, useState } from "react";
import styled from "styled-components";
import { Text, Button, Image, Input, ImageUploadButton } from "../elements";
import MdEditor from "../shared/MdEditor";
import MdViewer from "../shared/MdViewer";
import uploadFile from "../shared/Upload";
import axios from "axios";
import { ReactComponent as ThumbnailEmptyImg } from "../images/thumbnail.svg";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as articleActions } from "../redux/modules/article";
import { useEffect } from "react";
import { Color } from "../shared/Consts";
import { getUserInfoFromLS } from "../shared/Auth";

const ArticleForm = (props) => {
  const dispatch = useDispatch();
  const [isActiveInfoWindow, setIsActiveInfoWindow] = useState(false);
  const id = props.match.params.id;
  const isEdit = id ? true : false;
  const articleList = useSelector((state) => state.article.articleList);
  const isLoading = useSelector((state) => state.article.isLoading);
  let article = isEdit ? articleList.find((a) => a.id === id) : null;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const contentRef = useRef();
  const viewerRef = useRef();
  const { username, profileImage } = getUserInfoFromLS();

  useEffect(() => {
    if (isEdit && !article && !isLoading) {
      alert("게시글 정보가 없습니다.");
      history.goBack();
    }

    if (article) {
      axios.get(article.contents).then((res) => {
        contentRef.current.getInstance().setMarkdown(res.data);
      });
    }

    if (isEdit) {
      dispatch(articleActions.getOneArticleAPI(id));
    }
  }, []);

  //
  const callUpload = async (content) => {
    const blob = new Blob([content]);
    const file = new File([blob], `${Date.now()}.md`, {
      type: "text/markdown",
    });
    return await uploadFile(file, username, "article");
  };

  const handlePublishBtn = async () => {
    const data = {
      title,
      contents: await callUpload(
        contentRef.current.getInstance().getMarkdown()
      ),
      description,
      thumbnail,
    };

    if (!id) {
      Object.assign(data, { username, profileImage });
      dispatch(articleActions.postArticleAPI(data));
    } else {
      dispatch(articleActions.putArticleAPI(id, data));
    }
  };

  return (
    <Container>
      <WriteContainer>
        <FormLeft>
          <LeftTop>
            <Input value={title} _onChange={(e) => setTitle(e.target.value)} />
            <Divider />
            <MdEditor contentRef={contentRef} viewerRef={viewerRef} />
          </LeftTop>
          <LeftBottom>
            <Button
              shape="rectangle"
              _onClick={() => history.goBack()}
              bg={Color.gray}
              color={Color.black}
            >
              뒤로가기
            </Button>
            <ButtonWrapper>
              <Button
                shape="rectangle"
                _onClick={() => setIsActiveInfoWindow(true)}
              >
                출간하기
              </Button>
            </ButtonWrapper>
          </LeftBottom>
        </FormLeft>
        <FormRight>
          <PreviewHeader>{title}</PreviewHeader>
          <PreviewContent>
            <MdViewer viewerRef={viewerRef} />
          </PreviewContent>
        </FormRight>
      </WriteContainer>

      {/* Information Area */}
      <InfoContainer isActive={isActiveInfoWindow}>
        <InfoInnerWrap>
          <ThumbnailArea>
            <Text isBold margin="1em 0">
              포스트 미리보기
            </Text>
            {thumbnail && (
              <ThumbnailController>
                <ImageUploadButton
                  setPreview={setThumbnail}
                  author={username}
                  uploader={uploadFile}
                  type="image"
                >
                  재업로드
                </ImageUploadButton>
                <div
                  style={{
                    width: "2px",
                    height: "2px",
                    borderRadius: "1px",
                    backgroundColor: "black",
                  }}
                ></div>
                <Text _onClick={() => setThumbnail("")}>제거</Text>
              </ThumbnailController>
            )}
            <ThumbnailCover>
              {thumbnail ? (
                <Image imgUrl={thumbnail} />
              ) : (
                <>
                  <ThumbnailEmptyImg />
                  <ImageUploadButton
                    setPreview={setThumbnail}
                    author={username}
                    uploader={uploadFile}
                    type="image"
                  >
                    썸네일 업로드
                  </ImageUploadButton>
                </>
              )}
            </ThumbnailCover>
          </ThumbnailArea>
          <DescriptionArea>
            <Text isBold>{title}</Text>
            <Input
              isMultiline
              value={description}
              _onChange={(e) => setDescription(e.target.value)}
            />
            {description.length === 150 ? (
              <Text fontSize="0.75rem" color="red">
                {description.length}/150
              </Text>
            ) : (
              <Text fontSize="0.75rem">{description.length}/150</Text>
            )}
          </DescriptionArea>
          <InfoBtnArea>
            <Button
              shape="rectangle"
              _onClick={() => setIsActiveInfoWindow(false)}
            >
              취소
            </Button>
            <Button shape="rectangle" _onClick={handlePublishBtn}>
              출간하기
            </Button>
          </InfoBtnArea>
        </InfoInnerWrap>
      </InfoContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const WriteContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  & > * {
    height: 100%;
    width: 50%;
  }
`;
const FormLeft = styled.section`
  display: flex;
  flex-direction: column;
`;
const LeftTop = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em;
  & > input {
    border: none;
    font-size: 2.5rem;
    font-weight: 700;
    color: ${Color.black};
    &:focus,
    &:active {
      outline: none;
    }
  }
  & > *:last-child {
    height: 100%;
  }
`;
const Divider = styled.div`
  width: 2em;
  height: 0.2em;
  background-color: ${Color.darkGray};
  font-size: 2rem;
  margin-top: 1em;
  margin-bottom: 0.75em;
`;

const LeftBottom = styled.div`
  display: flex;
  padding: 1em;
  border-top: 1px solid ${Color.gray};
  justify-content: flex-end;
  & button {
    margin-left: 1em;
  }
`;
const ButtonWrapper = styled.div``;

const FormRight = styled.section`
  background-color: ${Color.gray};
  padding: 2em;
  overflow-y: scroll;
`;
const PreviewHeader = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${Color.black};
`;
const PreviewContent = styled.div``;

//----------------------------------------
// InfoContainer
//----------------------------------------
const InfoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.2s linear;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: ${Color.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isActive }) =>
    isActive ? `transform: translateY(0);` : `transform: translateY(100%);`}
`;
const InfoInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const ThumbnailArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;
const ThumbnailController = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > * {
    font-size: 1rem;
    font-weight: 400;
    color: ${Color.black};
    padding: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.2em;
    cursor: pointer;
  }
`;
const ThumbnailCover = styled.div`
  position: relative;
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Color.darkGray};
  & > *:first-child {
    margin-bottom: 1em;
  }
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  & > span:first-child {
    margin-bottom: 0.5em;
  }
  & > textarea {
    height: 120px;
    border: none;
    padding: 1em;
    font-size: 0.875rem;
    margin-bottom: 0.5em;
  }
  & > span:last-child {
    align-self: flex-end;
  }
`;
const InfoBtnArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > *:first-child {
    margin-right: 1em;
    background-color: ${Color.darkGray};
    color: ${Color.black};
  }
`;

export default ArticleForm;
