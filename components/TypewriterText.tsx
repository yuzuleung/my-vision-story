"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type TypewriterTextProps = {
  text: string;
  speed?: number; // ms per character
  delay?: number; // delay before starting in ms
  linePause?: number; // delay after each line in ms
  className?: string;
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  speed = 45,
  delay = 400,
  linePause = 500,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isInView) {
      setDisplayedText("");
      setIsDone(false);
      return;
    }

    const textChars = Array.from(text);
    let currentIndex = 0;
    let timerId: number | null = null;
    let accumulatedText = "";

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < textChars.length) {
          const nextChar = textChars[currentIndex];
          accumulatedText += nextChar;
          setDisplayedText(accumulatedText);
          currentIndex++;
          timerId = window.setTimeout(
            typeNextChar,
            nextChar === "\n" ? linePause : speed,
          );
        } else {
          setIsDone(true);
          onCompleteRef.current?.();
        }
      };
      typeNextChar();
    };

    timerId = window.setTimeout(startTyping, delay);

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, [isInView, text, speed, delay, linePause]);

  return (
    <p ref={ref} className={`${className} relative block`}>
      {/* Ghost text to reserve the layout space */}
      <span className="invisible select-none pointer-events-none block whitespace-pre-line" aria-hidden="true">
        {text}
      </span>
      {/* Actually typed text absolute positioned over it */}
      <span className="absolute inset-0 block whitespace-pre-line">
        {displayedText}
        {!isDone ? (
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.12em",
              marginLeft: "4px",
              backgroundColor: "currentColor",
              verticalAlign: "-0.08em",
              animation: "blink 0.9s steps(2, start) infinite",
            }}
            aria-hidden="true"
          />
        ) : null}
      </span>
    </p>
  );
}
