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
    color,
    _onClick,
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
          onClick={_onClick}
          color={color}
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
          onClick={_onClick}
          color={color}
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
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
  ${({ color }) => (color ? `color: ${color};` : "")}
`;

const ElText = styled.span`
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
  ${(props) => (props.isBold ? `font-weight: bold;` : "font-weight: 400;")}
  ${({ color }) => (color ? `color: ${color};` : "")}
`;

export default Text;
