"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ChapterLabel,
  ImageBackdrop,
  ScrollCue,
  StorySection,
} from "@/components/StorySection";
import { TypewriterText } from "@/components/TypewriterText";

type ChildReflectionSceneProps = {
  id: string;
  image: string;
  alt: string;
  chapter?: string;
  leftText: string;
  rightText?: string;
  onAdvance: () => void;
};

export function ChildReflectionScene({
  id,
  image,
  alt,
  chapter,
  leftText,
  rightText,
  onAdvance,
}: ChildReflectionSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });
  const [leftDone, setLeftDone] = useState(false);
  const [rightDone, setRightDone] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setLeftDone(false);
      setRightDone(false);
    }
  }, [isInView]);

  const isComplete = rightText ? rightDone : leftDone;

  return (
    <StorySection id={id} tone="hope" onAdvance={onAdvance}>
      {chapter ? <ChapterLabel label={chapter} dark /> : null}
      <ImageBackdrop src={image} alt={alt} brightness="soft" focus="center" />
      <div
        ref={ref}
        className="relative z-10 grid min-h-screen min-h-svh translate-y-[25vh] grid-cols-1 items-center gap-12 px-7 py-20 text-[#F6F1E8] sm:grid-cols-2 sm:px-14 lg:px-24"
      >
        <motion.div
          className="flex min-h-[10rem] items-center justify-center text-center"
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <TypewriterText
            text={leftText}
            delay={1000}
            speed={92}
            className="max-w-xl whitespace-pre-line text-xl font-light leading-[1.8] tracking-normal drop-shadow-[0_8px_28px_rgba(0,0,0,0.48)] sm:text-2xl"
            onComplete={() => setLeftDone(true)}
          />
        </motion.div>

        {rightText ? (
          <motion.div
            className="flex min-h-[10rem] items-center justify-center text-center"
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={
              leftDone
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 18, filter: "blur(10px)" }
            }
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {leftDone ? (
              <TypewriterText
                text={rightText}
                delay={0}
                speed={92}
                className="max-w-xl whitespace-pre-line text-xl font-light leading-[1.8] tracking-normal drop-shadow-[0_8px_28px_rgba(0,0,0,0.48)] sm:text-2xl"
                onComplete={() => setRightDone(true)}
              />
            ) : null}
          </motion.div>
        ) : null}
      </div>
      <ScrollCue show={isComplete} delay={0.6} onClick={onAdvance} />
    </StorySection>
  );
}
