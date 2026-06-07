# AIと生きる私

武蔵野美術大学の授業「マイビジョン物語」のために制作した、スクロール型のインタラクティブ Web 作品です。

テーマは、AI 時代の中でフロントエンドエンジニアとしての自分の価値を問い直すことです。AI にコード生成を任せられるようになった未来に、人間は何を考え、何を判断し、どのように新しい価値をつくるのかを、個人の視点から物語として表現しています。

## Website の構成

この作品は、通常の縦長ページではなく、1 画面ごとに場面が切り替わる Web Story として構成されています。

1. Opening  
   タイトル「AIと生きる私」と、エンジニアとして自分の価値を考え始めた導入。

2. Before AI  
   AI 以前、自分の手でコードを書き、エラーを読み、問題を解決していた時間。

3. With AI  
   AI がコードを書くようになり、便利さと同時に少し怖さを感じる場面。

4. Lost / 迷う  
   AI が速く正確に作れるなら、自分は何をする人になるのかを考える場面。

5. AI との対話  
   Chat UI と typewriter animation によって、AI との対話を表現。

6. 気づき / Future Work  
   実行者から、創造者・指揮者・評価者へ変化していく仕事像。

7. Future Life  
   AI が仕事だけでなく、日常生活の小さな選択にも自然に入っていく未来。

8. Ending  
   「コードを書く人」から「問いを立て、価値をつくる人」へ変わっていきたいという結論。

## 技術構成

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

画面遷移には CSS scroll-snap を使い、各 section 内の動きには Framer Motion を使っています。全体の色は black / white / gray を中心にし、前半は冷たく静かな印象、後半は少しずつ明るく希望のある印象になるように設計しています。

## ディレクトリ構成

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  ChatScene.tsx
  EndingScene.tsx
  ImageScene.tsx
  StorySection.tsx
public/
  images/
    01-before-ai.png
    02-with-ai.png
    03-lost.png
    04-future-work.png
    05-future-life.png
    06-leading-ai.png
```

## 開発方法

依存関係をインストールします。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで以下を開きます。

```txt
http://localhost:3000
```

## ビルド方法

本番用にビルドします。

```bash
npm run build
```

ビルド後に本番サーバーとして起動する場合は、以下を実行します。

```bash
npm run start
```

## 制作意図

この Web 作品は、AI 技術そのものを紹介するためのページではありません。AI と共に生きる時代に、自分自身の役割や価値がどのように変化していくのかを、スクロールしながら体験する物語として制作しています。

問いを立てること。価値を判断すること。方向を示すこと。  
AI が実行を助ける時代だからこそ、人間に残る本質的な役割を考える作品です。
