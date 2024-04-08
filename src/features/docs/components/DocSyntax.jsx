import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as highlighter_style } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function DocSyntax({ children }) {
  return (
    <SyntaxHighlighter
      language="jsx"
      style={highlighter_style}
      className="rounded-md"
      codeTagProps={{ className: "text-sm" }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
