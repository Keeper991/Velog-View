import styled from "styled-components";
import Card from "../components/Card";
import { Button, Image, Input, Text } from "../elements";
import db from "../db.json";

const ArticleList = () => {
  const cardData = db.api.articles;

  return (
    <Container>
      <CardList>
        {cardData.map((c) => (
          <Card {...c} />
        ))}
      </CardList>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
`;

const CardList = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 1785px;
`;

export default ArticleList;
