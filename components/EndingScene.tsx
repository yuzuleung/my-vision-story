"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ChapterLabel,
  ImageBackdrop,
  StorySection,
} from "@/components/StorySection";

export function EndingScene({
  image,
  onAdvance,
}: {
  image: string;
  onAdvance: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(contentRef, { once: false, amount: 0.55 });
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setShowQuestion(false);
      return;
    }

    setShowQuestion(false);
    const questionTimer = window.setTimeout(() => {
      setShowQuestion(true);
    }, 4000);

    return () => {
      window.clearTimeout(questionTimer);
    };
  }, [isInView]);

  return (
    <StorySection id="ending" tone="hope" onAdvance={onAdvance}>
      <ChapterLabel label="08 Ending" dark />
      <ImageBackdrop
        src={image}
        alt="AIと共に未来へ進む私"
        brightness="bright"
        focus="center"
      />
      <motion.div
        className="absolute inset-0 z-[2] bg-white"
        initial={{ opacity: 0.12 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen min-h-svh items-center justify-center px-6 text-center"
      >
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            className="font-story-serif mx-auto flex max-w-3xl flex-col gap-3 text-3xl font-light leading-[1.68] text-black/78 sm:text-5xl sm:leading-[1.45]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 1,
                  staggerChildren: 0.55,
                },
              },
            }}
          >
            {[
              "AIと生きる時代に、",
              "私はコードを書く人から、",
              "問いを立て、価値をつくる人へ変わっていた。",
            ].map((line) => (
              <motion.p
                key={line}
                variants={{
                  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.05, ease: "easeOut" },
                  },
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
          <div className="relative mx-auto mt-12 h-16 w-full sm:h-20">
            <AnimatePresence mode="wait">
              {showQuestion ? (
                <motion.h2
                  key="ending-question"
                  className="font-story-serif absolute inset-x-0 top-0 flex justify-center whitespace-nowrap text-center text-2xl font-light leading-[1.45] text-black sm:text-5xl"
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  transition={{ duration: 1.15, ease: "easeOut" }}
                >
                  あなたは、AIとどのように生きていきますか？
                </motion.h2>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-xs font-light tracking-[0.18em] text-black/45">
        © 2026 Yong Liang
      </footer>
    </StorySection>
  );
}
