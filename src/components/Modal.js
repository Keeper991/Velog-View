import styled from "styled-components";
import { Color } from "../shared/Consts";

const Modal = (props) => {
  const { children, setDisplayState, displayState } = props;

  return (
    <Container isDisplay={displayState}>
      <Background onClick={() => setDisplayState(false)} />
      <ContentWrap>{children}</ContentWrap>
    </Container>
  );
};

Modal.defaultProps = {
  children: null,
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: ${({ isDisplay }) => (isDisplay ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: #eee;
  opacity: 0.7;
`;

const ContentWrap = styled.div`
  border-radius: 10px;
  background-color: ${Color.white};
`;

export default Modal;
