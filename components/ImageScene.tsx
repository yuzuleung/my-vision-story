"use client";

import { motion } from "framer-motion";
import {
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
  brightness?: "dark" | "balanced" | "bright";
  focus?: string;
  placement?: "left" | "center" | "right" | "lowLeft";
  glow?: boolean;
  roles?: boolean;
  dimOnSecond?: boolean;
  onAdvance: () => void;
};

const placementClass = {
  left: "items-center justify-start px-7 sm:px-12 lg:px-24",
  center: "items-center justify-center px-7",
  right: "items-center justify-end px-7 sm:px-12 lg:px-24",
  lowLeft: "items-end justify-start px-7 pb-24 sm:px-12 lg:px-24",
};

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
  onAdvance,
}: ImageSceneProps) {
  const isLight = brightness === "bright";

  return (
    <StorySection id={id} tone={tone} onAdvance={onAdvance}>
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
      <div className={`relative z-10 flex min-h-screen min-h-svh ${placementClass[placement]}`}>
        <div className={placement === "right" ? "ml-auto" : ""}>
          <TextBlock
            title={title}
            body={body}
            muted={!isLight}
            className={isLight ? "text-[#111]" : ""}
          />
          {body2 ? (
            <motion.p
              className={`mt-8 max-w-xl whitespace-pre-line text-2xl font-light leading-[1.75] tracking-normal sm:text-3xl ${
                isLight ? "text-[#111]/78" : "text-white/88"
              }`}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.7 }}
              transition={{ delay: 1.6, duration: 1.1, ease: "easeOut" }}
            >
              {body2}
            </motion.p>
          ) : null}
          {note ? (
            <motion.p
              className={`mt-7 max-w-xl whitespace-pre-line text-sm font-light leading-8 sm:text-base ${
                isLight ? "text-[#111]/58" : "text-white/56"
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.7 }}
              transition={{ delay: 0.55, duration: 1 }}
            >
              {note}
            </motion.p>
          ) : null}
        </div>
      </div>
      {roles ? <RolePanel /> : null}
      <ScrollCue dark={isLight} onClick={onAdvance} />
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
            Creator / Director / Reviewer / Decision Maker
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
