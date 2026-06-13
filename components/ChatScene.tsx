"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from "react";
import {
  ChapterLabel,
  ScrollCue,
  StorySection,
} from "@/components/StorySection";

type DialogueStep =
  | {
      type: "pair";
      question: string;
      answer: string;
      duration: number;
    }
  | {
      type: "core" | "final";
      text: string;
      duration: number;
    };

const TYPE_SPEED = 72;
const QUESTION_PAUSE_AFTER_TYPED = 2000;
const ANSWER_PAUSE_AFTER_TYPED = 4000;
const CORE_PAUSE_AFTER_TYPED = 2000;
const TYPEWRITER_ENABLED = false;
const SHATTER_DURATION = 1250;
const INTRO_DELAY = 500;
const INTRO_DURATION = 1250;
const ENTRY_DELAY = INTRO_DELAY + INTRO_DURATION + 1000;

const dialogue: DialogueStep[] = [
  {
    type: "pair",
    question: "コーディングすることは、今でも好きだ。でも、AIの方が速く、正確にコードを書けるなら、私はエンジニアとして、どんな価値を持てるのだろう。",
    answer:
      "あなたは、本当に「AIより速くコードを書くこと」に価値を感じていたの？",
    duration: 7200,
  },
  {
    type: "pair",
    question: "違う気がする。私がいちばん価値を感じるのは、新しいプロダクトを考え、形にしていく時だ。",
    answer:
      "そうだと思う。あなたの価値は、きれいなコードを書くことだけではない。\n何を作るべきか。なぜ作るべきか。誰のために作るのか。\nその問いを立て、判断することにある。",
    duration: 7200,
  },
  {
    type: "pair",
    question: "でも、実装をAIに任せるようになったら、私はコードを書かないエンジニアになるのだろうか。",
    answer:
      "コードを書かなくなるのではなく、コードだけに閉じない人になるのだと思う。\nAIは実行できる。でも、課題を見つけ、目的を決め、\n人の気持ちや社会の文脈を読み取ることは、人間にしかできない。",
    duration: 7200,
  },
  {
    type: "core",
    text: "何を作るかを決めるのは、\n人間だ。",
    duration: 4600,
  },
  {
    type: "pair",
    question: "では、AIは私にとって何なのだろう。",
    answer:
      "AIは、あなたの価値を奪うものではない。\nあなたが見つけた課題を、より速く、より遠くまで届けるためのパートナーだと思う。\nあなたが方向を決め、AIが実行を助ける。\nあなたが問いを立て、AIが形にする。",
    duration: 7200,
  },
  {
    type: "pair",
    question: "つまり、私はAIと競争するのではなく、AIを使って、自分が作りたい価値を実現していくということ？",
    answer:
      "そう。AIはアシスタントであり、協働者であり、時には優秀な実行者にもなる。\nでも、何を任せるか。何を判断するか。どこへ向かうか。それを決めるのは、あなた自身だ。",
    duration: 7200,
  },
  {
    type: "pair",
    question: "では、人間に残る価値は何だろう。",
    answer:
      "まだ言葉になっていない不安を拾うこと。\n誰かの小さな違和感に気づくこと。そして、それを未来の形に変えること。",
    duration: 7200,
  },
  {
    type: "pair",
    question: "少し、わかった気がする。私が目指したいのは、ただ手を動かす人ではない。",
    answer:
      "あなたの価値は、AIより速く手を動かすことではない。\n何を信じ、何を作り、誰に届けたいかを決めること。\n人と技術の間に立ち、AIと共に意味のある方向へ進むこと。",
    duration: 7200,
  },
  {
    type: "final",
    text: "私は、課題を見つけ、価値を考え、AIと共に未来を形にする人へ変わっていきたい。",
    duration: 7000,
  },
];

type LineRole = {
  speaker: "me" | "ai";
  text: string;
};

export function ChatScene({ onAdvance }: { onAdvance: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const lastWheelAt = useRef(0);
  const inView = useInView(ref, { amount: 0.58 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [advanceSignal, setAdvanceSignal] = useState(0);

  useEffect(() => {
    if (!inView) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex(-1);
    const timer = window.setTimeout(() => {
      setActiveIndex(0);
    }, ENTRY_DELAY);

    return () => window.clearTimeout(timer);
  }, [inView]);

  const active = activeIndex >= 0 ? dialogue[activeIndex] : null;
  const isComplete = activeIndex >= dialogue.length - 1;

  const goNext = () => {
    setActiveIndex((index) => Math.min(index + 1, dialogue.length - 1));
  };

  const advanceDialogue = () => {
    if (!inView) {
      return;
    }

    if (isComplete) {
      onAdvance();
      return;
    }

    setAdvanceSignal((signal) => signal + 1);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!inView) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const now = Date.now();
    if (now - lastWheelAt.current < 820) {
      return;
    }

    lastWheelAt.current = now;
    advanceDialogue();
  };

  return (
    <StorySection
      id="dialogue"
      tone="dark"
      className="bg-[radial-gradient(circle_at_center,rgba(80,100,130,0.18),transparent_45%),linear-gradient(180deg,#050505_0%,#0B0B0D_100%)]"
    >
      <ChapterLabel label="04 Dialogue" />
      <Atmosphere />

      <div
        ref={ref}
        className="relative z-10 flex min-h-screen min-h-svh items-center justify-center px-6 py-12"
        onClick={advanceDialogue}
        onWheelCapture={handleWheel}
      >
        <motion.div
          className="absolute left-7 top-20 z-20 max-w-sm sm:left-12 lg:left-20"
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.65 }}
          transition={{
            delay: INTRO_DELAY / 1000,
            duration: INTRO_DURATION / 1000,
            ease: "easeOut",
          }}
        >
          <p className="text-sm font-light leading-7 text-white/48">
            私は、自分の価値について長く考えていた。
          </p>
        </motion.div>

        <div className="relative h-[72svh] w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {active?.type === "pair" ? (
              <DialoguePair
                key={`pair-${activeIndex}-${active.question}`}
                question={active.question}
                answer={active.answer}
                advanceSignal={advanceSignal}
                onDone={goNext}
              />
            ) : active ? (
              <CenteredText
                key={`${active.type}-${activeIndex}`}
                text={active.text}
                final={active.type === "final"}
                advanceSignal={advanceSignal}
                onDone={active.type === "final" ? undefined : goNext}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <ScrollCue
        show={active?.type === "final"}
        delay={2.1}
        onClick={advanceDialogue}
      />
    </StorySection>
  );
}

function DialoguePair({
  question,
  answer,
  advanceSignal,
  onDone,
}: {
  question: string;
  answer: string;
  advanceSignal: number;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<"question" | "answer" | "done">(
    "question",
  );
  const questionLength = Array.from(question).length;
  const answerLength = Array.from(answer).length;
  const [questionCount, setQuestionCount] = useState(
    TYPEWRITER_ENABLED ? 0 : questionLength,
  );
  const [answerCount, setAnswerCount] = useState(
    TYPEWRITER_ENABLED ? 0 : answerLength,
  );
  const [shattering, setShattering] = useState(false);
  const lastSignal = useRef(advanceSignal);
  const doneTimer = useRef<number | null>(null);

  const beginShatter = useCallback(() => {
    if (shattering || doneTimer.current) {
      return;
    }

    setPhase("done");
    setShattering(true);
    doneTimer.current = window.setTimeout(() => {
      onDone();
    }, SHATTER_DURATION);
  }, [onDone, shattering]);

  useEffect(() => {
    return () => {
      if (doneTimer.current) {
        window.clearTimeout(doneTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      !TYPEWRITER_ENABLED ||
      phase !== "question" ||
      questionCount >= questionLength
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setQuestionCount((count) => Math.min(count + 1, questionLength));
    }, TYPE_SPEED);

    return () => window.clearTimeout(timer);
  }, [phase, questionCount, questionLength]);

  useEffect(() => {
    if (phase !== "question" || questionCount < questionLength) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase("answer");
    }, QUESTION_PAUSE_AFTER_TYPED);

    return () => window.clearTimeout(timer);
  }, [phase, questionCount, questionLength]);

  useEffect(() => {
    if (
      !TYPEWRITER_ENABLED ||
      phase !== "answer" ||
      answerCount >= answerLength
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setAnswerCount((count) => Math.min(count + 1, answerLength));
    }, TYPE_SPEED);

    return () => window.clearTimeout(timer);
  }, [answerCount, answerLength, phase]);

  useEffect(() => {
    if (phase !== "answer" || answerCount < answerLength) {
      return;
    }

    const timer = window.setTimeout(() => {
      beginShatter();
    }, ANSWER_PAUSE_AFTER_TYPED);

    return () => window.clearTimeout(timer);
  }, [answerCount, answerLength, beginShatter, phase]);

  useEffect(() => {
    if (advanceSignal === lastSignal.current) {
      return;
    }
    lastSignal.current = advanceSignal;

    if (phase === "question" && questionCount < questionLength) {
      setQuestionCount(questionLength);
      return;
    }
    if (phase === "question") {
      setPhase("answer");
      return;
    }
    if (phase === "answer" && answerCount < answerLength) {
      setAnswerCount(answerLength);
      return;
    }
    if (phase === "answer" || phase === "done") {
      beginShatter();
    }
  }, [
    advanceSignal,
    answerCount,
    answerLength,
    beginShatter,
    onDone,
    phase,
    questionCount,
    questionLength,
  ]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit="exit"
      variants={{
        exit: {
          opacity: 1,
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingLine
        speaker="me"
        text={question}
        visibleCount={questionCount}
        shattering={shattering}
        className="right-0 top-[14%] w-[min(42rem,calc(100vw-3rem))] items-end text-right sm:right-[4%] sm:w-[min(42rem,48vw)]"
      />
      {phase === "answer" || phase === "done" ? (
        <FloatingLine
          speaker="ai"
          text={answer}
          visibleCount={answerCount}
          shattering={shattering}
          className="left-0 top-[58%] w-[min(42rem,calc(100vw-3rem))] items-start text-left sm:left-[4%] sm:w-[min(42rem,48vw)]"
        />
      ) : null}
    </motion.div>
  );
}

function FloatingLine({
  speaker,
  text,
  visibleCount,
  shattering,
  className,
}: LineRole & {
  visibleCount: number;
  shattering: boolean;
  className: string;
}) {
  const isMe = speaker === "me";

  return (
    <motion.div
      className={`font-story-sans absolute flex max-w-[calc(100vw-3rem)] flex-col gap-4 ${className}`}
      initial="hidden"
      animate={shattering ? "exit" : "visible"}
      exit="exit"
      variants={{
        hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          opacity: 1,
          y: -8,
          filter: "blur(0px)",
          transition: {
            staggerChildren: 0.004,
          },
        },
      }}
    >
      <motion.span
        className={`${
          isMe
            ? "text-[13px] tracking-[0.26em] text-[#EDEAE3]/58"
            : "text-[12px] tracking-[0.18em] text-[#B8C7D9]/62"
        }`}
        variants={{
          exit: {
            opacity: 0,
            filter: "blur(6px)",
            transition: { duration: 0.7, ease: "easeOut" },
          },
        }}
      >
        {isMe ? "私" : "もう一人の私"}
      </motion.span>
      <ShatterText
        text={text}
        visibleCount={visibleCount}
        className={`whitespace-pre-line text-pretty leading-[1.55] ${
          isMe
            ? "text-lg font-light text-[#EDEAE3] sm:text-2xl"
            : "text-lg font-light text-[#B8C7D9] sm:text-2xl"
        }`}
      />
    </motion.div>
  );
}

function CenteredText({
  text,
  final,
  advanceSignal,
  onDone,
}: {
  text: string;
  final: boolean;
  advanceSignal: number;
  onDone?: () => void;
}) {
  const [typedCount, setTypedCount] = useState(
    final || !TYPEWRITER_ENABLED ? Array.from(text).length : 0,
  );
  const [done, setDone] = useState(false);
  const lastSignal = useRef(advanceSignal);
  const targetLength = Array.from(text).length;

  useEffect(() => {
    if (final || !TYPEWRITER_ENABLED || typedCount >= targetLength) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTypedCount((count) => Math.min(count + 1, targetLength));
    }, TYPE_SPEED);

    return () => window.clearTimeout(timer);
  }, [final, targetLength, text, typedCount]);

  useEffect(() => {
    if (final || typedCount < targetLength || done) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDone(true);
      onDone?.();
    }, CORE_PAUSE_AFTER_TYPED);

    return () => window.clearTimeout(timer);
  }, [done, final, onDone, targetLength, typedCount]);

  useEffect(() => {
    if (advanceSignal === lastSignal.current) {
      return;
    }
    lastSignal.current = advanceSignal;

    if (final) {
      return;
    }
    if (typedCount < targetLength) {
      setTypedCount(targetLength);
      return;
    }
    setDone(true);
    onDone?.();
  }, [advanceSignal, final, onDone, targetLength, typedCount]);

  if (final) {
    return (
      <motion.p
        className="font-story-serif absolute inset-x-0 top-1/2 mx-auto max-w-4xl -translate-y-1/2 whitespace-pre-line text-center text-3xl font-light leading-[1.65] text-[#F7F2EA] drop-shadow-[0_0_26px_rgba(237,234,227,0.18)] sm:text-5xl sm:leading-[1.55]"
        initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        transition={{ duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.p>
    );
  }

  return (
    <motion.div
      className="font-story-serif absolute inset-x-0 top-1/2 mx-auto max-w-4xl -translate-y-1/2 text-center font-light drop-shadow-[0_0_26px_rgba(237,234,227,0.18)]"
      initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit="exit"
      variants={{
        exit: {
          opacity: 1,
          y: -10,
          transition: {
            duration: 1,
            staggerChildren: 0.004,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      transition={{ duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <ShatterText
        text={text}
        visibleCount={typedCount}
        className="whitespace-pre-line text-4xl leading-[1.65] text-white sm:text-6xl"
      />
    </motion.div>
  );
}

function ShatterText({
  text,
  visibleCount,
  className,
}: {
  text: string;
  visibleCount: number;
  className: string;
}) {
  const chars = Array.from(text);
  const visibleChars = chars.slice(0, visibleCount);
  const shatterTransition = {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
  } as const;

  const renderVisibleChar = (char: string, index: number) => {
    if (char === "\n") {
      return <br key={`visible-break-${index}`} />;
    }

    const x = ((index % 7) - 3) * 10;
    const y = -18 - (index % 5) * 7;
    const rotate = ((index % 6) - 2.5) * 4;

    return (
      <motion.span
        key={`visible-${char}-${index}`}
        className="inline-block"
        variants={{
          exit: {
            opacity: 0,
            x,
            y,
            rotate,
            filter: "blur(7px)",
            transition: {
              ...shatterTransition,
              delay: Math.min(index * 0.006, 0.18),
            },
          },
        }}
      >
        {char}
      </motion.span>
    );
  };

  if (!TYPEWRITER_ENABLED) {
    return (
      <motion.p
        className={`${className} block`}
        variants={{
          exit: {
            opacity: 1,
            transition: {
              duration: 1,
              staggerChildren: 0.006,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
      >
        {chars.map(renderVisibleChar)}
      </motion.p>
    );
  }

  return (
    <motion.p
      className={`${className} relative block`}
      variants={{
        exit: {
          opacity: 1,
          transition: {
            duration: 1,
            staggerChildren: 0.006,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <span aria-hidden="true" className="invisible">
        {chars.map((char, index) =>
          char === "\n" ? (
            <br key={`ghost-break-${index}`} />
          ) : (
            <span key={`ghost-${char}-${index}`}>
              {char === " " ? "\u00A0" : char}
            </span>
          ),
        )}
      </span>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        variants={{
          exit: {
            transition: {
              staggerChildren: 0.006,
            },
          },
        }}
      >
        {visibleChars.map(renderVisibleChar)}
      </motion.span>
    </motion.p>
  );
}

function Atmosphere() {
  return (
    <>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,199,217,0.1),transparent_62%)] blur-2xl"
        animate={{ opacity: [0.45, 0.72, 0.45], scale: [0.96, 1.03, 0.96] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle_at_20%_30%,white_1px,transparent_1px),radial-gradient(circle_at_78%_62%,white_1px,transparent_1px),radial-gradient(circle_at_54%_82%,white_1px,transparent_1px)] [background-size:140px_140px,180px_180px,220px_220px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.24)_54%,rgba(0,0,0,0.72)_100%)]" />
    </>
  );
}
