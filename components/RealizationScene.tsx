"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ChapterLabel,
  ScrollCue,
  StorySection,
} from "@/components/StorySection";

export function RealizationScene({ onAdvance }: { onAdvance: () => void }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(contentRef, { once: false, amount: 0.55 });
  const [showScrollCue, setShowScrollCue] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setShowScrollCue(false);
      return;
    }

    setShowScrollCue(false);
    const timer = window.setTimeout(() => {
      setShowScrollCue(true);
    }, 3900);

    return () => window.clearTimeout(timer);
  }, [isInView]);

  return (
    <StorySection
      id="realization"
      className="quiet-grain bg-[radial-gradient(circle_at_50%_38%,rgba(237,234,227,0.08),transparent_34%),#080808]"
      onAdvance={onAdvance}
    >
      <ChapterLabel label="05 Realization" />
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen min-h-svh items-center justify-center px-7 text-center"
      >
        <div className="max-w-4xl">
          <motion.div
            className="font-story-serif flex flex-col gap-1 text-2xl font-light leading-[1.6] text-[#EDEAE3] sm:text-3xl sm:leading-[1.55]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.65 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 1,
                  staggerChildren: 1.1,
                },
              },
            }}
          >
            {["AIは答えを速く作る。", "でも、問いを立てるのは人間だ。"].map(
              (line) => (
                <motion.p
                  key={line}
                  variants={{
                    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {line}
                </motion.p>
              ),
            )}
          </motion.div>

          <motion.p
            className="font-story-serif mx-auto mt-12 max-w-2xl whitespace-pre-line text-xl font-light leading-[2.05] text-[#EDEAE3]/72 sm:text-3xl sm:leading-[1.9]"
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.65 }}
            transition={{ delay: 2.2, duration: 1.15, ease: "easeOut" }}
          >
            {"何を作るか。\n誰のために作るか。\n何を大切にするか。\n\nそれを決めることが、\nこれからの私の役割になる。"}
          </motion.p>
        </div>
      </div>
      <ScrollCue show={showScrollCue} delay={0} onClick={onAdvance} />
    </StorySection>
  );
}
