import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    padding,
    margin,
    width,
    height,
    children,
    fontSize,
    isTitle,
    isBold,
  } = props;

  return (
    <React.Fragment>
      {isTitle ? (
        <ElTitle
          padding={padding}
          margin={margin}
          width={width}
          height={height}
          fontSize={fontSize}
        >
          {children}
        </ElTitle>
      ) : (
        <ElText
          padding={padding}
          margin={margin}
          width={width}
          height={height}
          fontSize={fontSize}
          isBold={isBold}
        >
          {children}
        </ElText>
      )}
    </React.Fragment>
  );
};

Text.defaultProps = {};

const ElTitle = styled.h1`
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.fontsize ? `font-size: ${props.fontsize};` : "")}
`;

const ElText = styled.span`
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.fontsize ? `font-size: ${props.fontsize};` : "")}
  ${(props) => (props.isBold ? `font-weight: ${props.isBold};` : "")}
`;

export default Text;
