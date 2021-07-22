import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";

export const setContent = async (viewerRef, data) => {
  try {
    const res = await axios.get(data);
    viewerRef.current.getInstance().setMarkdown(res.data);
  } catch (e) {
    console.log(e);
    viewerRef.current.getInstance().setMarkdown();
  }
};

const MdViewer = ({ viewerRef, ...props }) => {
  return (
    <Viewer
      ref={viewerRef}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
};

export default MdViewer;
