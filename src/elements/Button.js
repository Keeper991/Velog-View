import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    padding,
    margin,
    bg,
    color,
    width,
    height,
    children,
    _onClick,
    shape,
    fontSize,
    border,
  } = props;

  if (shape === "circle") {
    return (
      <React.Fragment>
        <ElCircleButton
          width={width}
          height={height}
          onClick={_onClick}
          padding={padding}
          margin={margin}
          bg={bg}
          color={color}
          fontSize={fontSize}
        >
          {children}
        </ElCircleButton>
      </React.Fragment>
    );
  }
  if (shape === "rectangle") {
    return (
      <React.Fragment>
        <ElRectangleButton
          width={width}
          height={height}
          onClick={_onClick}
          padding={padding}
          margin={margin}
          bg={bg}
          color={color}
          fontSize={fontSize}
        >
          {children}
        </ElRectangleButton>
      </React.Fragment>
    );
  }
  if (shape === "pill") {
    return (
      <React.Fragment>
        <ElPillButton
          width={width}
          height={height}
          onClick={_onClick}
          padding={padding}
          margin={margin}
          bg={bg}
          color={color}
          fontSize={fontSize}
        >
          {children}
        </ElPillButton>
      </React.Fragment>
    );
  }
};

Button.defaultProps = {};

const ElCircleButton = styled.button`
  ${(props) => (props.border ? `border: ${props.border};` : "border: none;")}
  border-radius: 50%;
  cursor: pointer;
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
`;

const ElRectangleButton = styled.button`
  font-weight: 600;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${(props) => (props.bg ? props.bg : "rgb(32, 201, 151)")};
  color: ${(props) => (props.color ? props.color : "white")};
  height: ${(props) => (props.height ? props.height : "1.5rem")};
  ${(props) =>
    props.fontSize ? `font-size: ${props.fontSize};` : "fontsize: 1rem;"}
  ${(props) =>
    props.padding ? `padding: ${props.padding};` : "padding: 0px 15px;"}
`;

const ElPillButton = styled.button`
  border: 1px solid rgb(52, 58, 64);
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
  height: 2rem;
  background-color: white;
  padding: 0 15px;
  color: rgb(52, 58, 64);
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
`;

export default Button;
