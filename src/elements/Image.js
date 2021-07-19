import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { imgUrl, padding, margin, width, height, shape } = props;

  if (shape === "circle") {
    return (
      <React.Fragment>
        <ElCircleImage
          width={width}
          height={height}
          imgUrl={imgUrl}
          padding={padding}
          margin={margin}
        />
      </React.Fragment>
    );
  }
  if (shape === "rectangle") {
    return (
      <React.Fragment>
        <ElRectangleImage
          width={width}
          height={height}
          imgUrl={imgUrl}
          padding={padding}
          margin={margin}
        />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <ElExtraImage
        width={width}
        height={height}
        imgUrl={imgUrl}
        padding={padding}
        margin={margin}
      />
    </React.Fragment>
  );
};

Image.defaultProps = {
  width: "100%",
};

const ElCircleImage = styled.div`
  border-radius: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const ElRectangleImage = styled.div`
  border-radius: 3px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const ElExtraImage = styled.div`
  border-radius: 1rem;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default Image;
