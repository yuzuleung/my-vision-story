"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollCue, StorySection } from "@/components/StorySection";

type Message = {
  speaker: "user" | "ai";
  text: string;
};

const messages: Message[] = [
  {
    speaker: "user",
    text: "私はエンジニアとしての価値とは何だろう。",
  },
  {
    speaker: "ai",
    text: "価値は、コードを書く量だけではありません。何を作るべきかを考え、誰のために作るのかを判断することにもあります。",
  },
  {
    speaker: "user",
    text: "AIの方が技術力が高くなったら、人間は何をするのだろう。",
  },
  {
    speaker: "ai",
    text: "人間は問いを立て、目的を決め、価値を判断します。AIは実行できますが、何を大切にするかを決めるのは人間です。",
  },
  {
    speaker: "user",
    text: "私たちはAIとどのように共存していくべきなのだろう。",
  },
  {
    speaker: "ai",
    text: "AIを恐れるだけでなく、理解し、使いこなし、共に創造すること。その中で、人間はより本質的な役割へ移っていくのだと思います。",
  },
];

export function ChatScene({ onAdvance }: { onAdvance: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.55 });
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
    }
  }, [inView, started]);

  useEffect(() => {
    if (!started) {
      return;
    }

    const current = messages[activeIndex];
    if (!current) {
      return;
    }

    if (typed.length < current.text.length) {
      const delay = current.speaker === "ai" ? 32 : 26;
      const timer = window.setTimeout(() => {
        setTyped(current.text.slice(0, typed.length + 1));
      }, delay);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      if (activeIndex < messages.length - 1) {
        setActiveIndex((index) => index + 1);
        setTyped("");
      }
    }, current.speaker === "ai" ? 740 : 460);

    return () => window.clearTimeout(timer);
  }, [activeIndex, started, typed]);

  const visibleMessages = messages.slice(0, activeIndex);
  const current = messages[activeIndex];

  return (
    <StorySection
      id="dialogue"
      tone="light"
      className="bg-[radial-gradient(circle_at_72%_30%,rgba(120,170,190,0.12),transparent_32%),linear-gradient(180deg,#f8f8f3,#ecefeb)]"
      onAdvance={onAdvance}
    >
      <div
        ref={ref}
        className="relative z-10 flex min-h-screen min-h-svh items-center justify-center px-5 py-12"
      >
        <motion.div
          className="w-full max-w-3xl border border-black/10 bg-white/70 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-7"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-black/38">
              AIとの対話
            </p>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-black/15" />
              <span className="h-2 w-2 rounded-full bg-black/10" />
              <span className="h-2 w-2 rounded-full bg-black/5" />
            </div>
          </div>

          <div className="flex min-h-[28rem] flex-col justify-end gap-3 sm:min-h-[31rem]">
            {visibleMessages.map((message, index) => (
              <ChatBubble
                key={`${message.speaker}-${index}`}
                message={message}
                complete
              />
            ))}
            {current ? (
              <ChatBubble
                message={{ ...current, text: typed }}
                complete={typed.length === current.text.length}
              />
            ) : null}
          </div>
        </motion.div>
      </div>
      <ScrollCue dark onClick={onAdvance} />
    </StorySection>
  );
}

function ChatBubble({
  message,
  complete,
}: {
  message: Message;
  complete: boolean;
}) {
  const isUser = message.speaker === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className={`max-w-[88%] px-4 py-3 text-sm leading-7 shadow-sm sm:max-w-[74%] sm:text-base ${
          isUser
            ? "bg-[#111] text-white"
            : "border border-black/10 bg-[#f8faf8] text-black/78"
        }`}
      >
        <p
          className={`whitespace-pre-wrap ${
            complete ? "" : "message-caret"
          }`}
        >
          {message.text}
        </p>
      </div>
    </motion.div>
  );
}
