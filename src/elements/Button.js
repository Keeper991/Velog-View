import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    padding,
    margin,
    width,
    height,
    children,
    bg,
    color,
    _onClick,
    shape,
  } = props;

  if (shape === "circle") {
    return (
      <React.Fragment>
        <ElCircleButton width={width} height={height} onClick={_onClick}>
          {children}
        </ElCircleButton>
      </React.Fragment>
    );
  }
  if (shape === "rectangle") {
    return (
      <React.Fragment>
        <ElRectangleButton width={width} height={height} onClick={_onClick}>
          {children}
        </ElRectangleButton>
      </React.Fragment>
    );
  }
  if (shape === "pill") {
    return (
      <React.Fragment>
        <ElPillButton width={width} height={height} onClick={_onClick}>
          {children}
        </ElPillButton>
      </React.Fragment>
    );
  }
};

Button.defaultProps = {};

const ElCircleButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
`;

const ElRectangleButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 3px;
`;

const ElPillButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.height};
`;

export default Button;
