"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ChapterLabel,
  ImageBackdrop,
  ScrollCue,
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
  const [showScrollCue, setShowScrollCue] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setShowScrollCue(false);
      return;
    }

    setShowScrollCue(false);
    const timer = window.setTimeout(() => {
      setShowScrollCue(true);
    }, 3500);

    return () => window.clearTimeout(timer);
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
        className="absolute inset-0 z-[2] bg-black"
        initial={{ opacity: 0.24 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen min-h-svh items-center justify-center px-6 text-center"
      >
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            className="font-story-serif mx-auto flex max-w-3xl flex-col gap-3 text-3xl font-light leading-[1.68] text-white/88 drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)] sm:text-5xl sm:leading-[1.45]"
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
              "私は人に共感し、価値をつくる人へ変わっていた。",
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
        </div>
      </div>
      <ScrollCue show={showScrollCue} delay={0} onClick={onAdvance} />
    </StorySection>
  );
}
