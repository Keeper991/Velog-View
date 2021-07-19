import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    value,
    placeholder,
    padding,
    margin,
    width,
    height,
    _onChange,
    is_multiline,
  } = props;

  return (
    <React.Fragment>
      {is_multiline ? (
        <ElTextarea
          placeholder={placeholder}
          padding={padding}
          margin={margin}
          width={width}
          height={height}
          value={value}
          onChange={_onChange}
        ></ElTextarea>
      ) : (
        <ElInput
          placeholder={placeholder}
          padding={padding}
          margin={margin}
          width={width}
          height={height}
          value={value}
          onChange={_onChange}
        />
      )}
    </React.Fragment>
  );
};

Input.defaultProps = {};

const ElTextarea = styled.textarea`
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.placeholder ? `placeholder: ${props.placeholder};` : "")}
`;

const ElInput = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.placeholder ? `placeholder: ${props.placeholder};` : "")}
`;

export default Input;
