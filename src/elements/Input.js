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
        <ElTextarea placeholder={placeholder}>{value}</ElTextarea>
      ) : (
        <ElInput placeholder={placeholder} value={value} onChange={_onChange} />
      )}
    </React.Fragment>
  );
};

Input.defaultProps = {};

const ElInput = styled.input``;

const ElTextarea = styled.textarea``;

export default Input;
