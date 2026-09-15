# Satoshi Egashira — Portfolio

半導体研究、IoT、3D Printing、ソフトウェア開発を紹介する、白背景の技術ポートフォリオです。既存の事実情報を使い、UIとアニメーションを新規設計しています。

## Run

Node.js 22 / pnpm 9.12.2 を推奨します。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

公開用の静的ファイルを確認する場合：

```sh
pnpm build
pnpm preview
```

`http://127.0.0.1:3001` で `out/` を配信します。`pnpm start` も静的プレビューです。GitHub Pagesへの自動公開は既存のmain向けワークフローにあり、今回のfeatureブランチからは公開されません。

## Quality checks

```sh
pnpm lint
pnpm typecheck
pnpm build
```

UI検証は `scripts/verify-portfolio.mjs` を使用します。プロジェクトの実行依存を増やさないため、Playwrightとaxe-coreは検証環境側のものを使っています。利用環境にインストール済みの場合は、そのまま `node scripts/verify-portfolio.mjs` を実行できます。別の場所にある場合は、`PLAYWRIGHT_MODULE` にPlaywrightの `index.mjs`、`AXE_SOURCE` にaxe-coreの `axe.min.js` の絶対パスを指定してください。既定のブラウザーはChromeです。

検証結果は `docs/verification-results.json`、公開リンクの結果は `docs/link-verification.json`、画面は `docs/screenshots/` にあります。

## Structure

- `pages/index.tsx`: Hero / Featured Projects / Research / About / Skills / Experience / Contact
- `pages/projects/`: カテゴリ絞り込みと12件の静的プロジェクト詳細
- `pages/about.tsx`: プロフィールとスキル・経歴
- `pages/cooknote/`: 既存の料理ノートと学習計画
- `components/portfolio/`: 新しい共通UI、ラテアート、半導体SVG
- `data/projects/projects.ts`, `data/projects/docs/`: 既存プロジェクトの事実情報
- `data/portfolio.ts`: プロフィール、表示カテゴリ、掲載順
- `styles/globals.css`, `styles/semiconductor.css`: 新しいデザインとモーション

## Animation

`LatteSplash.tsx` は自作SVGでコーヒー、ミルクの渦、7対のロゼッタの葉、ハートと茎を順に描画します。3.1秒の演出後、0.38秒でフェードアウト。セッション内の再表示を抑制し、Skip / Escapeで終了できます。

`SemiconductorScene.tsx` は配線層・デバイス層・基板を等角投影した自作SVGです。スプラッシュ終了後に各層を重ね、回路とエッジに光を走らせ、4.6秒で停止します。Replayで再生できます。

`prefers-reduced-motion: reduce` ではスプラッシュを省略し、半導体を静止した完成状態で表示します。外部アニメーション素材、Canvas、WebGL、Three.jsは使っていません。

詳しい制作・検証記録は [docs/portfolio-report.md](docs/portfolio-report.md) を参照してください。
