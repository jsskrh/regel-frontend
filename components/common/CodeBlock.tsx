"use client";

import React, { useEffect, useRef, useState } from "react";

export const CodeBlock = ({
  code,
  language = "json",
  method,
  title,
  theme = "github-dark",
}) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const highlight = async () => {
      if (!codeRef.current || !isMounted) return;

      try {
        const { unified } = await import("unified");
        const rehypeParse = (await import("rehype-parse")).default;
        const rehypePrettyCode = (await import("rehype-pretty-code")).default;
        const rehypeStringify = (await import("rehype-stringify")).default;

        const file = await unified()
          .use(rehypeParse)
          .use(rehypePrettyCode, {
            theme,
            keepBackground: true,
            // Callback hooks for additional processing
            onVisitLine(node) {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            onVisitHighlightedLine(node) {
              node.properties.className = [
                ...(node.properties.className || []),
                "highlighted-line",
              ];
            },
            onVisitHighlightedWord(node) {
              node.properties.className = [
                ...(node.properties.className || []),
                "highlighted-word",
              ];
            },
          })
          .use(rehypeStringify)
          .process(
            `<pre><code class="language-${language}">${code}</code></pre>`
          );

        if (codeRef.current && isMounted) {
          codeRef.current.innerHTML = String(file);
        }
      } catch (error) {
        console.error("Error highlighting code:", error);
        if (codeRef.current && isMounted) {
          // Safe fallback with light text color
          codeRef.current.innerHTML = `<pre><code class="language-${language}" style="color: #e6e6e6;">${code
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre>`;
        }
      }
    };

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, language, theme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        <div className="flex items-center">
          {method && (
            <span className="px-2 py-1 rounded-full mr-1.5 uppercase text-[0.625rem] text-white bg-[#12533A]">
              {method}
            </span>
          )}
          {title && (
            <span className="text-[#fcf6ff] font-medium text-xs opacity-60">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-x-2">
          <span className="language-tag">{language}</span>
          <button
            className="copy-button"
            onClick={copyToClipboard}
            aria-label="Copy code to clipboard"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div ref={codeRef} className="code-content" />
      <style jsx>{`
        .code-block-wrapper {
          margin: 1rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
          background-color: rgb(13, 17, 23);
          border: 1px solid rgba(240, 246, 252, 0.1);
        }
        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: rgba(240, 246, 252, 0.05);
          border-bottom: 1px solid rgba(240, 246, 252, 0.1);
        }
        .language-tag {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgb(139, 148, 158);
        }
        .copy-button {
          padding: 0.25rem 0.5rem;
          font-size: 0.8rem;
          background-color: rgba(240, 246, 252, 0.1);
          color: rgb(240, 246, 252);
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .copy-button:hover {
          background-color: rgba(240, 246, 252, 0.2);
        }
        .code-content {
          padding: 1rem;
          overflow-x: auto;
        }
        .code-content pre {
          margin: 0;
        }
        .highlighted-line {
          background-color: rgba(255, 255, 255, 0.1);
          display: block;
          border-left: 3px solid rgb(88, 166, 255);
        }
        .highlighted-word {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 0.25rem;
          padding: 0.1rem 0.2rem;
        }
      `}</style>
    </div>
  );
};
