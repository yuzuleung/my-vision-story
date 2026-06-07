"use client";

import { ChatScene } from "@/components/ChatScene";
import { EndingScene } from "@/components/EndingScene";
import { ImageScene } from "@/components/ImageScene";
import { OpeningScene } from "@/components/StorySection";
import { useRef } from "react";

const sections = [
  "opening",
  "before-ai",
  "with-ai",
  "lost",
  "dialogue",
  "future-work",
  "future-life",
  "ending",
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
        body={"以前の私は、\n自分の手でコードを書き、\nエラーを読み、\n原因を探し、\n一つずつ問題を解決していた。"}
        brightness="balanced"
        focus="center"
        placement="left"
        glow
        onAdvance={() => advanceTo(1)}
      />

      <ImageScene
        id="with-ai"
        image={imageSrc("/images/02-with-ai.png")}
        alt="AIと共にコードを見る私"
        body={"今は、AIが数分でコードを書く。\n私はそれを見て、確認し、判断する。"}
        body2={"便利になった。\nでも、少し怖かった。"}
        brightness="balanced"
        focus="center"
        placement="right"
        dimOnSecond
        onAdvance={() => advanceTo(2)}
      />

      <ImageScene
        id="lost"
        image={imageSrc("/images/03-lost.png")}
        alt="迷いの中で自分の価値を考える私"
        body={"AIの方が速く、正確に作れるなら、\n私は何をする人になるのだろう。"}
        body2={"エンジニアとしての価値とは何だろう。"}
        tone="mist"
        brightness="dark"
        focus="center"
        placement="center"
        onAdvance={() => advanceTo(3)}
      />

      <ChatScene onAdvance={() => advanceTo(4)} />

      <ImageScene
        id="future-work"
        image={imageSrc("/images/04-future-work.png")}
        alt="AIと協働しながら未来の仕事へ向かう私"
        title={"私は実行者から、\n創造者・指揮者・評価者へ。"}
        note={"AIは作業を助ける。\n私は問いを立て、価値を決め、方向を示す。"}
        tone="hope"
        brightness="bright"
        focus="center"
        placement="left"
        roles
        onAdvance={() => advanceTo(5)}
      />

      <ImageScene
        id="future-life"
        image={imageSrc("/images/05-future-life.png")}
        alt="生活の中に自然に入り込むAI"
        title={"AIは仕事だけでなく、\n生活の中にも自然に入り込んでいく。"}
        note={"予約、買い物、移動、相談。\nAIは日常の小さな選択にも寄り添う存在になる。"}
        tone="hope"
        brightness="bright"
        focus="center"
        placement="right"
        onAdvance={() => advanceTo(6)}
      />

      <EndingScene
        image={imageSrc("/images/06-leading-ai.png")}
        onAdvance={() => advanceTo(7)}
      />
    </div>
  );
}
