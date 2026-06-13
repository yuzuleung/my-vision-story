"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ImageBackdrop,
  ScrollCue,
  StorySection,
} from "@/components/StorySection";

type TextSceneProps = {
  id: string;
  text: string;
  onAdvance: () => void;
  image?: string;
  alt?: string;
  tone?: "dark" | "hope";
  brightness?: "dark" | "balanced" | "soft" | "bright";
  focus?: string;
  footer?: boolean;
  mood?: "night" | "dawn" | "light";
  delay?: number;
};

export function TextScene({
  id,
  text,
  onAdvance,
  image,
  alt = "",
  tone = "dark",
  brightness = "balanced",
  focus = "center",
  footer = false,
  mood = "night",
  delay = 0.8,
}: TextSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.55 });
  const [showScrollCue, setShowScrollCue] = useState(false);
  const isImageScene = Boolean(image);
  const isLight = brightness === "bright";

  const backgroundClass = {
    night:
      "bg-[radial-gradient(circle_at_center,rgba(80,100,130,0.18),transparent_45%),linear-gradient(180deg,#050505_0%,#0B0B0D_100%)]",
    dawn:
      "bg-[radial-gradient(circle_at_center,rgba(110,135,165,0.24),transparent_50%),linear-gradient(180deg,#0B1118_0%,#151D25_100%)]",
    light: "bg-[#F5F2EA]",
  }[mood];

  useEffect(() => {
    if (!isInView || footer) {
      setShowScrollCue(false);
      return;
    }

    setShowScrollCue(false);
    const timer = window.setTimeout(() => {
      setShowScrollCue(true);
    }, (delay + 1.75) * 1000);

    return () => window.clearTimeout(timer);
  }, [delay, footer, isInView]);

  return (
    <StorySection
      id={id}
      tone={tone}
      onAdvance={onAdvance}
      className={image ? "" : backgroundClass}
    >
      {image ? (
        <ImageBackdrop
          src={image}
          alt={alt}
          brightness={brightness}
          focus={focus}
        />
      ) : (
        <>
          {mood === "light" ? null : (
            <>
              <motion.div
                className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,199,217,0.1),transparent_62%)] blur-2xl"
                animate={{
                  opacity: [0.45, 0.72, 0.45],
                  scale: [0.96, 1.03, 0.96],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle_at_20%_30%,white_1px,transparent_1px),radial-gradient(circle_at_78%_62%,white_1px,transparent_1px),radial-gradient(circle_at_54%_82%,white_1px,transparent_1px)] [background-size:140px_140px,180px_180px,220px_220px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.16)_54%,rgba(0,0,0,0.46)_100%)]" />
            </>
          )}
        </>
      )}

      <div
        ref={ref}
        className="relative z-10 flex min-h-screen min-h-svh items-center justify-center px-7 text-center"
      >
        <motion.p
          className={`font-story-serif mx-auto max-w-5xl whitespace-pre-line text-3xl font-light leading-[1.65] tracking-normal sm:text-5xl sm:leading-[1.45] ${
            isLight
              ? "text-black/78"
              : isImageScene
                ? "text-white/88 drop-shadow-[0_8px_28px_rgba(0,0,0,0.42)]"
                : mood === "light"
                  ? "text-black/76"
                  : "text-[#EDEAE3]"
          }`}
          initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 24, filter: "blur(14px)" }
          }
          transition={{ delay, duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.p>
      </div>

      {footer ? (
        <footer className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-xs font-light tracking-[0.18em] text-black/45">
          © 2026 Yong Liang
        </footer>
      ) : (
        <ScrollCue
          dark={mood === "light" || isLight}
          show={showScrollCue}
          delay={0}
          onClick={onAdvance}
        />
      )}
    </StorySection>
  );
}
