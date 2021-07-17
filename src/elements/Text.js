import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { padding, margin, width, height } = props;

  return (
    <React.Fragment>
      <ElText></ElText>
    </React.Fragment>
  );
};

Text.defaultProps = {};

const ElText = styled.span``;

export default Text;
