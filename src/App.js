import logo from "./logo.svg";
import "./App.css";
import { Input, Text, Button, Image } from "./elements";
import React from "react";
import styled from "styled-components";
import Img from "./cat103.jpg";

function App() {
  return (
    <Container>
      <Input
        value="텍스트에리아"
        placeholder="텍스트를 입력하세요"
        is_multiline
      ></Input>
      <Button width="500px" height="500px" shape="circle">
        이것은동그란버튼
      </Button>
      <Button width="1000px" height="500px" shape="rectangle">
        이것은네모난버튼
      </Button>
      <Button width="1000px" height="500px" shape="pill">
        이것은알약모양버튼
      </Button>
      <Image width="300px" height="300px" src={Img} shape="circle" />
      <Image width="240px" height="180px" src={Img} shape="rectangle" />
      <Image width="250px" height="150px" src={Img} shape="extra" />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
`;

export default App;
