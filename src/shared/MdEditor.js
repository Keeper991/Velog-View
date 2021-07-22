import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import uploadFile from "./Upload";

const MdEditor = ({ viewerRef, contentRef, username, ...props }) => {
  const upload = async (file, cb) => {
    const url = await uploadFile(file, username, "image");
    cb(url);
  };

  return (
    <Editor
      ref={contentRef}
      previewStyle="none"
      useCommandShortcut={true}
      height="100%"
      placeholder="당신의 이야기를 적어보세요..."
      usageStatistics={false}
      events={{
        change: () => {
          const data = contentRef.current.getInstance().getMarkdown();
          viewerRef.current.getInstance().setMarkdown(data);
        },
      }}
      toolbarItems={[
        ["heading"],
        ["bold", "italic", "strike"],
        ["quote", "link", "image", "codeblock"],
      ]}
      hooks={{ addImageBlobHook: upload }}
    />
  );
};

export default MdEditor;
