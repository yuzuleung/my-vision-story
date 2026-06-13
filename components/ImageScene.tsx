"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ChapterLabel,
  ImageBackdrop,
  ScrollCue,
  StorySection,
  TextBlock,
} from "@/components/StorySection";

type ImageSceneProps = {
  id: string;
  image: string;
  alt: string;
  body?: string;
  body2?: string;
  title?: string;
  note?: string;
  tone?: "dark" | "light" | "mist" | "hope";
  brightness?: "dark" | "balanced" | "soft" | "bright";
  focus?: string;
  placement?: "left" | "center" | "right" | "lowLeft";
  glow?: boolean;
  roles?: boolean;
  dimOnSecond?: boolean;
  chapter?: string;
  textPanel?: boolean;
  textClassName?: string;
  onAdvance: () => void;
  typewriter?: boolean;
  typewriterDelay?: number;
  bodyNoWrap?: boolean;
  bodyLarge?: boolean;
  titleSize?: "default" | "small";
  delay?: number;
};

const placementClass = {
  left: "items-center justify-start px-7 sm:px-12 lg:px-24",
  center: "items-center justify-center px-7",
  right: "items-center justify-end px-7 sm:px-12 lg:px-24",
  lowLeft: "items-end justify-start px-7 pb-24 sm:px-12 lg:px-24",
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const visibleLineCount = (text?: string) =>
  text?.split("\n").filter((line) => line.trim().length > 0).length ?? 0;

export function ImageScene({
  id,
  image,
  alt,
  body,
  body2,
  title,
  note,
  tone = "dark",
  brightness = "balanced",
  focus = "center",
  placement = "left",
  glow = false,
  roles = false,
  dimOnSecond = false,
  chapter,
  textPanel = false,
  textClassName,
  onAdvance,
  typewriter = false,
  typewriterDelay,
  bodyNoWrap = false,
  bodyLarge = false,
  titleSize = "default",
  delay = 0,
}: ImageSceneProps) {
  const isLight = brightness === "bright" || brightness === "soft";
  const [isBodyComplete, setIsBodyComplete] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!isInView) {
      setIsBodyComplete(false);
    } else if (!typewriter) {
      setIsBodyComplete(true);
    }
  }, [isInView, typewriter]);

  const body2Delay = typewriter ? 1.0 : delay + 1.6;
  const mainLineCount = visibleLineCount(title) + visibleLineCount(body);
  const mainCompleteDelay = delay + Math.max(mainLineCount - 1, 0) * 0.32 + 0.95;
  const body2CompleteDelay = body2
    ? body2Delay + Math.max(visibleLineCount(body2) - 1, 0) * 0.34 + 0.9
    : 0;
  const noteCompleteDelay = note
    ? 1 + delay + Math.max(visibleLineCount(note) - 1, 0) * 0.28 + 0.9
    : 0;
  const staticCueDelay =
    Math.max(mainCompleteDelay, body2CompleteDelay, noteCompleteDelay) + 0.35;
  const cueDelay = typewriter ? (body2 ? 2.4 : 0.45) : staticCueDelay;
  const cueCanStart = typewriter ? isBodyComplete : true;

  useEffect(() => {
    if (!isInView || !cueCanStart) {
      setShowScrollCue(false);
      return;
    }

    setShowScrollCue(false);
    const timer = window.setTimeout(() => {
      setShowScrollCue(true);
    }, cueDelay * 1000);

    return () => window.clearTimeout(timer);
  }, [cueCanStart, cueDelay, isInView]);

  const align =
    placement === "center"
      ? "center"
      : placement === "right"
        ? "right"
        : "left";

  return (
    <StorySection id={id} tone={tone} onAdvance={onAdvance}>
      {chapter ? <ChapterLabel label={chapter} dark={isLight} /> : null}
      <ImageBackdrop
        src={image}
        alt={alt}
        brightness={brightness}
        focus={focus}
        glow={glow}
      />
      {dimOnSecond ? (
        <motion.div
          className="absolute inset-0 z-[2] bg-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.24 }}
          viewport={{ once: false, amount: 0.72 }}
          transition={{ delay: 2.05, duration: 1.2 }}
        />
      ) : null}
      <div
        ref={containerRef}
        className={`relative z-10 flex min-h-screen min-h-svh ${placementClass[placement]}`}
      >
        <div
          className={`${placement === "right" ? "ml-auto" : ""} ${
            textPanel
              ? "max-w-2xl border border-white/18 bg-white/54 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-8"
              : ""
          }`}
        >
          <TextBlock
            title={title}
            body={body}
            align={align}
            muted={!isLight}
            className={textClassName ?? (isLight ? "text-[#111]" : "")}
            delay={delay}
            typewriter={typewriter}
            typewriterDelay={typewriterDelay}
            bodyNoWrap={bodyNoWrap}
            bodyLarge={bodyLarge}
            titleSize={titleSize}
            onTypewriterComplete={() => setIsBodyComplete(true)}
          />
          {body2 ? (
            <motion.p
              className={`mt-8 max-w-xl whitespace-pre-line text-2xl font-light leading-[1.75] tracking-normal sm:text-3xl ${
                isLight ? "text-[#111]/78" : "text-white/88"
              } ${
                placement === "center"
                  ? "text-center mx-auto"
                  : placement === "right"
                    ? "text-right ml-auto"
                    : "text-left mr-auto"
              }`}
              initial="hidden"
              animate={isBodyComplete ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: body2Delay,
                    staggerChildren: 0.34,
                  },
                },
              }}
            >
              {body2.split("\n").map((line, index) => (
                <motion.span
                  key={`${line}-${index}`}
                  className="block"
                  variants={lineVariants}
                >
                  {line}
                </motion.span>
              ))}
            </motion.p>
          ) : null}
          {note ? (
            <motion.p
              className={`mt-7 max-w-xl whitespace-pre-line text-sm font-light leading-8 sm:text-base ${
                isLight ? "text-[#111]/58" : "text-white/56"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.7 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 1 + delay,
                    staggerChildren: 0.28,
                  },
                },
              }}
            >
              {note.split("\n").map((line, index) => (
                <motion.span
                  key={`${line}-${index}`}
                  className="block"
                  variants={lineVariants}
                >
                  {line}
                </motion.span>
              ))}
            </motion.p>
          ) : null}
        </div>
      </div>
      {roles ? <RolePanel /> : null}
      <ScrollCue
        dark={isLight}
        show={showScrollCue}
        delay={0}
        onClick={onAdvance}
      />
    </StorySection>
  );
}

function RolePanel() {
  return (
    <motion.aside
      className="absolute bottom-20 right-5 z-20 w-[min(22rem,calc(100vw-2.5rem))] border border-black/10 bg-white/58 p-5 text-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.10)] backdrop-blur-md sm:right-10"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.65 }}
      transition={{ delay: 1.2, duration: 0.85, ease: "easeOut" }}
    >
      <div className="grid gap-4 text-sm">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-black/38">
            私
          </p>
          <p className="leading-7 text-black/78">
            Creator / Director / Reviewer / Decision Maker / Product Owner
          </p>
        </div>
        <div className="h-px bg-black/10" />
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-black/38">
            AI
          </p>
          <p className="leading-7 text-black/60">
            Developer / Designer / Tester / Assistant
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
