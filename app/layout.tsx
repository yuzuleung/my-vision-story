import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIと生きる私",
  description:
    "武蔵野美術大学 マイビジョン物語: AIとの対話を通して、自分の価値を問い直すスクロール型Web物語。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
