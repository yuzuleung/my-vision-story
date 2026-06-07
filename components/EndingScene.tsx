"use client";

import { motion } from "framer-motion";
import {
  ImageBackdrop,
  StorySection,
} from "@/components/StorySection";

export function EndingScene({ onAdvance }: { onAdvance: () => void }) {
  return (
    <StorySection id="ending" tone="hope" onAdvance={onAdvance}>
      <ImageBackdrop
        src="/images/06-leading-ai.png"
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
      <div className="relative z-10 flex min-h-screen min-h-svh items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <motion.p
            className="mx-auto max-w-3xl whitespace-pre-line text-3xl font-light leading-[1.68] text-black/78 sm:text-5xl sm:leading-[1.45]"
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.55 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {"AIと生きる時代に、\n私はコードを書く人から、\n問いを立て、価値をつくる人へ変わっていきたい。"}
          </motion.p>
          <motion.h2
            className="mt-12 text-balance text-3xl font-light leading-[1.45] text-black sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.55 }}
            transition={{ delay: 1.65, duration: 1.15, ease: "easeOut" }}
          >
            あなたは、AIとどのように生きていきますか？
          </motion.h2>
        </div>
      </div>
    </StorySection>
  );
}
