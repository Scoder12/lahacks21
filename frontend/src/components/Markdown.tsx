import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export interface MarkdownProps {
  children: string;
}

export const Markdown: FC<MarkdownProps> = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown plugins={[gfm]} renderers={ChakraUIRenderer()}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
