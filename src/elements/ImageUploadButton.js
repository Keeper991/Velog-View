import styled from "styled-components";
import { Color } from "../shared/Consts";

const ImageUploadButton = ({
  children,
  setPreview,
  uploader,
  author,
  type,
  ...props
}) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (uploader) {
      const url = await uploader(file, author, type);
      setPreview(url);
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <LabelBtn>
        {children}
        <FileInput type="file" onChange={handleChange} accept="image/*" />
      </LabelBtn>
    </>
  );
};

const LabelBtn = styled.label`
  background-color: ${Color.green};
  padding: 0 15px;
  height: 1.5rem;
  color: ${Color.white};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;
const FileInput = styled.input`
  display: none;
`;

export default ImageUploadButton;
