import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, padding, margin, width, height, shape } = props;

  if (shape === "circle") {
    return (
      <React.Fragment>
        <ElCircleImage width={width} height={height} src={src} />
      </React.Fragment>
    );
  }
  if (shape === "rectangle") {
    return (
      <React.Fragment>
        <ElRectangleImage width={width} height={height} src={src} />
      </React.Fragment>
    );
  }
  if (shape === "extra") {
    return (
      <React.Fragment>
        <ElExtraImage width={width} height={height} src={src} />
      </React.Fragment>
    );
  }
};

Image.defaultProps = {};

const ElCircleImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  src: ${(props) => props.src};
`;

const ElRectangleImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 3px;
  src: ${(props) => props.src};
`;

const ElExtraImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 1rem;
  src: ${(props) => props.src};
`;

export default Image;
