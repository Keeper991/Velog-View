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
    isMultiline,
    border,
  } = props;

  return (
    <React.Fragment>
      {isMultiline ? (
        <ElTextarea
          placeholder={placeholder}
          padding={padding}
          margin={margin}
          width={width}
          height={height}
          value={value}
          onChange={_onChange}
          border={border}
          maxLength="150"
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
          border={border}
        />
      )}
    </React.Fragment>
  );
};

Input.defaultProps = {};

const ElTextarea = styled.textarea`
  border: ${(props) =>
    props.border ? props.border : "1px solid rgb(233, 236, 239)"};
  padding: ${(props) =>
    props.padding ? props.padding : "padding: 1rem 1rem 1.5rem"};
  ${(props) => (props.placeholder ? `placeholder: ${props.placeholder};` : "")}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  resize: none;
  outline: none;
  border-radius: 4px;
  min-height: 6.125rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
`;

const ElInput = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.placeholder ? `placeholder: ${props.placeholder};` : "")}
`;

export default Input;
