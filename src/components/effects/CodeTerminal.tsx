"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { codeSnippets } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function CodeTerminal() {
  const { isRtl } = useLanguage();
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const snippet = codeSnippets[snippetIndex];
  const lines = snippet.split("\n");

  useEffect(() => {
    if (charIndex < lines[lineIndex]?.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 35 + Math.random() * 25);
      return () => clearTimeout(timeout);
    }

    if (lineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLine("");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 120);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedLines([]);
      setCurrentLine("");
      setLineIndex(0);
      setCharIndex(0);
      setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, lines, currentLine, snippetIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLines, currentLine]);

  const highlightLine = (line: string) => {
    return line
      .replace(
        /\b(const|function|return|export|default|className)\b/g,
        '<span class="text-purple-400">$1</span>',
      )
      .replace(/('.*?'|".*?")/g, '<span class="text-emerald-400">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-slate-500">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>');
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0d1117]">
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#161b22] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="mx-auto font-mono text-xs text-muted">portfolio.tsx</span>
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "min-h-0 flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed",
          isRtl ? "text-right" : "text-left",
        )}
        dir="ltr"
      >
        {displayedLines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-6 shrink-0 select-none text-right text-slate-600">
              {i + 1}
            </span>
            <code
              className="flex-1 text-slate-300"
              dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
            />
          </div>
        ))}
        {(lineIndex < lines.length || currentLine) && (
          <div className="flex gap-3">
            <span className="w-6 shrink-0 select-none text-right text-slate-600">
              {displayedLines.length + 1}
            </span>
            <code className="flex-1 text-slate-300">
              <span dangerouslySetInnerHTML={{ __html: highlightLine(currentLine) }} />
              <span className="typing-cursor ml-0.5 inline-block h-4 w-2 bg-indigo-400" />
            </code>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-white/5 bg-[#161b22] px-4 py-2 font-mono text-[10px] text-muted">
        <span>TypeScript React</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          coding...
        </span>
      </div>
    </div>
  );
}
