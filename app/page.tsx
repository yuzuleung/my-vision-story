"use client";

// import { ChatScene } from "@/components/ChatScene";
import { ChildReflectionScene } from "@/components/ChildReflectionScene";
import { EndingScene } from "@/components/EndingScene";
import { ImageScene } from "@/components/ImageScene";
// import { RealizationScene } from "@/components/RealizationScene";
import { OpeningScene } from "@/components/StorySection";
import { TextScene } from "@/components/TextScene";
import { useRef } from "react";

const sections = [
  "opening",
  "before-ai",
  "with-ai",
  "lost",
  "inner-thought",
  "child-pain",
  "child-empathy",
  "child-empathy-thought",
  "future-work",
  "child-future",
  "future-care-thought",
  // "dialogue",
  // "realization",
  "ending",
  "ending-question",
];

const imageSrc = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function Home() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const advanceTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }
    const nextIndex = Math.min(index + 1, sections.length - 1);
    container.scrollTo({
      top: nextIndex * container.clientHeight,
      behavior: "smooth",
    });
  };

  return (
    <div ref={scrollRef} className="story-scroll">
      <OpeningScene onAdvance={() => advanceTo(0)} />

      <ImageScene
        id="before-ai"
        image={imageSrc("/images/01-before-ai.png")}
        alt="AI以前、自分の手でコードと向き合う私"
        chapter="01 Before"
        body={"以前の私は、\n自分の手できれいなコードを書き、\n自分の価値を確かめてきた。"}
        body2={"コードを書くことが最高だと思っていた。"}
        brightness="balanced"
        focus="center"
        placement="left"
        glow
        typewriter
        typewriterDelay={1000}
        onAdvance={() => advanceTo(1)}
      />

      <ImageScene
        id="with-ai"
        image={imageSrc("/images/02-with-ai.png")}
        alt="AIと共にコードを見る私"
        chapter="02 Now"
        body={"今は、AIが数分でコードを書く。\n私はそれを見て、\n便利になった。でも、少し不安だった。"}
        body2={"AIの方が速く、正確に作れるなら、\n私はどんな価値を持つ人になるのだろう。"}
        brightness="balanced"
        focus="center"
        placement="left"
        typewriter
        typewriterDelay={1000}
        onAdvance={() => advanceTo(2)}
      />

      <ImageScene
        id="lost"
        image={imageSrc("/images/03-lost.png")}
        alt="迷いの中で自分の価値を考える私"
        chapter="03 Lost"
        body={"エンジニアとしての私の価値は何だろう。"}
        tone="mist"
        brightness="dark"
        focus="center"
        placement="center"
        bodyNoWrap
        bodyLarge
        delay={1}
        onAdvance={() => advanceTo(3)}
      />

      <TextScene
        id="inner-thought"
        text="私は、自分の価値について長く考えていた。"
        onAdvance={() => advanceTo(4)}
      />

      <ChildReflectionScene
        id="child-pain"
        image={imageSrc("/images/07-child.png")}
        alt="AIには共感できない人間の感情と痛み"
        chapter="05 Feeling"
        leftText="AIは涙を認識できる。"
        rightText="でも、その痛みに心を動かされるのは人間だ。"
        onAdvance={() => advanceTo(5)}
      />

      <ChildReflectionScene
        id="child-empathy"
        image={imageSrc("/images/08-child_3.png")}
        alt="AIには共感できない人間の感情"
        chapter="06 Feeling"
        leftText="AIは状態を分析できる。"
        rightText="でも、安心をつくるのは人間だ。"
        onAdvance={() => advanceTo(6)}
      />

      <TextScene
        id="child-empathy-thought"
        text="AIは、人間の感情に共感できないのだ。"
        mood="dawn"
        onAdvance={() => advanceTo(7)}
      />

      {/* <ChatScene onAdvance={() => advanceTo(4)} /> */}

      {/* <RealizationScene onAdvance={() => advanceTo(5)} /> */}

      <ImageScene
        id="future-work"
        image={imageSrc("/images/04-future-work.png")}
        alt="AIと協働しながら未来の仕事へ向かう私"
        chapter="06 Future Work"
        body={"私は課題を見つけ、価値を決め、方向を示す。\nAIは作業を助ける。"}
        body2={"私は実行者から、創造者へ。"}
        tone="hope"
        brightness="bright"
        focus="center"
        placement="left"
        typewriter
        typewriterDelay={1000}
        bodyTextClassName="text-[#111]/62"
        onAdvance={() => advanceTo(8)}
      />

      <ImageScene
        id="child-future"
        image={imageSrc("/images/08-child_2.png")}
        alt="痛みを未来の安心へ変えていく私"
        chapter="07 Care"
        title="人を守るのは、私の価値だ。"
        tone="hope"
        brightness="soft"
        focus="center"
        placement="center"
        textClassName="text-white/90 drop-shadow-[0_8px_28px_rgba(0,0,0,0.5)]"
        delay={1}
        onAdvance={() => advanceTo(9)}
      />

      <TextScene
        id="future-care-thought"
        text={"私が気づいた痛みを、\nAIとともに未来の安心に変える。"}
        tone="hope"
        mood="light"
        onAdvance={() => advanceTo(10)}
      />

      <EndingScene
        image={imageSrc("/images/06-leading-ai.png")}
        onAdvance={() => advanceTo(11)}
      />

      <TextScene
        id="ending-question"
        text="あなたは、AIとどのように生きていきますか？"
        tone="hope"
        mood="light"
        delay={1}
        footer
        onAdvance={() => advanceTo(12)}
      />
    </div>
  );
}
