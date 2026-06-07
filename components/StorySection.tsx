"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

type StorySectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light" | "mist" | "hope";
  onAdvance?: () => void;
};

const toneClass = {
  dark: "bg-[#050505] text-white",
  light: "bg-[#f7f7f2] text-[#101010]",
  mist: "bg-[#111214] text-white",
  hope: "bg-[#f3f4ef] text-[#111111]",
};

export function StorySection({
  id,
  children,
  className = "",
  tone = "dark",
  onAdvance,
}: StorySectionProps) {
  return (
    <section
      id={id}
      className={`story-section ${toneClass[tone]} ${className}`}
      onClick={onAdvance}
    >
      {children}
    </section>
  );
}

type ScrollCueProps = {
  dark?: boolean;
  onClick?: () => void;
};

export function ScrollCue({ dark = false, onClick }: ScrollCueProps) {
  return (
    <motion.button
      type="button"
      aria-label="次の場面へ進む"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      className={`absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] ${
        dark ? "text-black/45" : "text-white/45"
      }`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.9 }}
    >
      <span>scroll</span>
      <span
        className={`block h-8 w-px overflow-hidden ${
          dark ? "bg-black/12" : "bg-white/15"
        }`}
      >
        <motion.span
          className={`block h-3 w-px ${dark ? "bg-black/55" : "bg-white/65"}`}
          animate={{ y: [0, 28, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.button>
  );
}

type TextBlockProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  align?: "left" | "center" | "right";
  muted?: boolean;
  delay?: number;
  className?: string;
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextBlock({
  eyebrow,
  title,
  body,
  align = "left",
  muted = false,
  delay = 0,
  className = "",
}: TextBlockProps) {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <motion.div
      className={`relative z-10 flex max-w-2xl flex-col gap-5 whitespace-pre-line ${alignment} ${className}`}
      variants={textVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.55 }}
      transition={{ delay }}
    >
      {eyebrow ? (
        <p
          className={`text-xs font-medium uppercase tracking-[0.34em] ${
            muted ? "text-white/45" : "text-white/58"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="text-balance text-4xl font-light leading-[1.22] tracking-normal sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      ) : null}
      {body ? (
        <p
          className={`text-pretty text-[1.08rem] font-light leading-[2.05] tracking-normal sm:text-xl ${
            muted ? "text-white/58" : "text-white/82"
          }`}
        >
          {body}
        </p>
      ) : null}
    </motion.div>
  );
}

type ImageBackdropProps = {
  src: string;
  alt: string;
  brightness?: "dark" | "balanced" | "bright";
  focus?: string;
  glow?: boolean;
};

export function ImageBackdrop({
  src,
  alt,
  brightness = "balanced",
  focus = "center",
  glow = false,
}: ImageBackdropProps) {
  const overlay = {
    dark:
      "bg-[radial-gradient(circle_at_55%_45%,rgba(0,0,0,0.18),rgba(0,0,0,0.48)_45%,rgba(0,0,0,0.88)_100%)]",
    balanced:
      "bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.52)),radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.58))]",
    bright:
      "bg-[linear-gradient(90deg,rgba(245,245,238,0.86),rgba(245,245,238,0.22)_44%,rgba(245,245,238,0.42)),linear-gradient(0deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2))]",
  }[brightness];

  return (
    <div className={`absolute inset-0 ${glow ? "image-glow" : ""}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1, opacity: 0.78 }}
        whileInView={{ scale: 1.055, opacity: 1 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 7, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={src.includes("01-before") || src.includes("02-with")}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </motion.div>
      <div className={`absolute inset-0 z-[1] ${overlay}`} />
    </div>
  );
}

export function OpeningScene({ onAdvance }: { onAdvance: () => void }) {
  return (
    <StorySection id="opening" className="quiet-grain" onAdvance={onAdvance}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_32%),#030303]" />
      <main className="relative z-10 flex min-h-screen min-h-svh flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="text-5xl font-extralight tracking-normal sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          AIと生きる私
        </motion.h1>
        <motion.p
          className="mt-10 max-w-xl whitespace-pre-line text-base font-light leading-9 text-white/68 sm:text-xl sm:leading-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 1.1, ease: "easeOut" }}
        >
          {"私はエンジニアです。\n最近、自分の価値について考えるようになりました。"}
        </motion.p>
      </main>
      <ScrollCue onClick={onAdvance} />
    </StorySection>
  );
}
