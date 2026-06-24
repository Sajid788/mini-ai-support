import ReactMarkdown from "react-markdown";

const assistantComponents = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 text-[0.925rem] leading-7 text-slate-700">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
  ol: ({ children }) => (
    <ol className="numbered-list my-3 space-y-3">{children}</ol>
  ),
  ul: ({ children }) => (
    <ul className="bullet-list my-3 space-y-2">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="text-[0.925rem] leading-7 text-slate-700">{children}</li>
  ),
  h1: ({ children }) => (
    <h1 className="mb-3 text-lg font-bold text-slate-900">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-2 mt-4 text-base font-bold text-slate-900">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-3 text-sm font-semibold text-slate-900">{children}</h3>
  ),
  hr: () => <hr className="my-4 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-4 border-indigo-300 bg-indigo-50/60 py-2 pl-4 pr-3 text-slate-700 italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");

    if (isBlock) {
      return (
        <code className="block overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
          {children}
        </code>
      );
    }

    return (
      <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.85em] font-medium text-indigo-700">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
      {children}
    </pre>
  ),
};

export default function MessageContent({ content, variant = "assistant" }) {
  if (variant === "user") {
    return (
      <p className="whitespace-pre-wrap text-[0.925rem] leading-7 text-white">{content}</p>
    );
  }

  return (
    <div className="message-content">
      <ReactMarkdown components={assistantComponents}>{content}</ReactMarkdown>
    </div>
  );
}
