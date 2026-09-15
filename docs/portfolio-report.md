# Portfolio redesign — 実装・検証レポート

## 1. ブランチと設計方針

`feature/portfolio-astra-motion-redesign` 上で実装。初期状態はmain上のクリーンな作業ツリーで、最初に指定ブランチを作成しました。main/masterへの変更・マージ・公開は行っていません。

既存HTML構造、CSS、レイアウト、Hero、コンポーネント設計を流用せず、白を基調とした新しいUIを作成しました。大きな見出し、控えめな青、設計図を思わせるSVGで Research × Hardware × Software を表現しています。既存の未使用UIコンポーネントは削除しました。

## 2. 技術スタック

- Next.js 15.3.4 / Pages Router / 静的HTML出力
- React 19 / TypeScript（strict）
- Tailwindの基礎スタイルと、新規CSSによるレスポンシブ設計
- 独自SVG/CSSアニメーション、lucide-reactの補助アイコン
- 既存Markdownを remark / remark-gfm / remark-html で静的描画

追加のランタイム依存はありません。ESLint関連の開発依存のみ追加しました。Framer MotionやWebGLは画面の実装に使用していません。外部フォント取得もありません。

## 3. ページと情報構成

| ページ | 内容 |
| --- | --- |
| `/` | Hero、4件のFeatured Projects、Research / 3D Printing、About、Skills、Experience、Contact |
| `/projects/` | 実在する12プロジェクト。All / IoT & Hardware / Software / Automationで絞り込み |
| `/projects/[id]/` | 12件の詳細。概要・画像・使用技術・既存Markdown本文・GitHub等へのリンク |
| `/about/` | プロフィール、スキル、経歴、CookNoteへの導線 |
| `/cooknote/` | 既存3ノートと2025年10月の学習計画 |
| `/cooknote/notes/[slug]/` | index / dashi / hygiene の既存ノート |
| 404 | 共通デザインのエラーページとホームへの導線 |

トップの4件は Home Assistant、YSP-201 Serial Communication CLI Tool、ClipBridge、MinuteDock。研究・IoT・3D Printing・Softwareを共通の文字組み、色、余白、図の注釈でまとめています。

## 4. 主な実装箇所

- `components/portfolio/SiteShell.tsx`: 共通ヘッダー、モバイルナビ、キーボード用スキップリンク、フッター
- `components/portfolio/ProjectCard.tsx`, `ProjectVisual.tsx`: プロジェクトカード、写真・既存画像・オリジナル概念図
- `components/portfolio/Sections.tsx`: Research、3D Printing、About、Skills、Experience、Contact
- `components/portfolio/Seo.tsx`: 各ページのタイトル、説明、canonical、Open Graph情報
- `lib/projects.ts`, `lib/cooknotes.ts`: 既存Markdownの静的読込と安全な描画
- `scripts/preview.mjs`: GitHub Pages向け静的出力を、ローカルで確認する依存不要のプレビュー
- `scripts/verify-portfolio.mjs`: Playwrightとaxe-coreによる画面・操作・リンク検証

## 5. ラテアートのスプラッシュ

実装は `components/portfolio/LatteSplash.tsx` と `styles/globals.css` のintro関連スタイルです。

自作SVGで、真上から見たカップとコーヒー面を描き、ミルクの注入、渦、広がり、7対の葉、ハート、中央の茎を順に表示します。3.1秒で描画し、0.38秒のフェード後にメインへ移ります。動画・Lottie等の外部アニメーション素材は使用していません。

native dialogによるフォーカス制御を使い、Skip / Escapeで終了できます。セッション内の再訪問は `sessionStorage` で省略します。ストレージが利用不可でも例外で止まりません。JavaScript無効時はスプラッシュを表示せず本文が読めます。`prefers-reduced-motion: reduce` でも省略します。

## 6. 半導体Hero

実装は `components/portfolio/SemiconductorScene.tsx` と `styles/semiconductor.css` です。

配線層・デバイス層・基板を、それぞれ独立したSVGグループで描画しています。分解状態から基板、ダイ、透明な配線層の順で組み上がり、エッジに青白い光が走り、回路とノードが点灯します。完成直後の控えめな発光を含む4.6秒の有限アニメーションで、終了後は静止します。Replayで再生できます。

スプラッシュが終了してからHeroが動き始めるため、組み立て過程を見逃しません。reduced motionでは最初から完成状態を表示し、Replayを隠します。図にはconcept studyの注記を付け、実測結果や特定の研究構造であると誤認させないようにしています。

## 7. 事実情報と素材の出典

- 氏名・メール・GitHub、既存スキル、2019.04 / 2024.02 / 2024.11の経歴：既存プロフィールから文字情報のみを抽出
- 大学院生、半導体研究、IoT、3D Printingの活動：ユーザー提供の制作指示
- 12件のプロジェクト名・概要・使用技術・本文：`data/projects/projects.ts` と `data/projects/docs/*.md`
- 料理ノート：`data/cooknote/` の既存内容
- Home Assistantの概念イラスト、YSP-201の機器画像、Quick Ankiの操作画面、その他の既存プロジェクト画像：`public/projects/`

Home AssistantのPNGはJPEGへ変換し、約1.4 MBから約132 KBへ軽量化しました。元画像は保持しています。人物写真は新たに生成していません。実物画像がない箇所は独自の抽象図で表現し、概念図であることを明示しています。

NodeNest、3D Particle Simulation、CFRP fatigue prediction、半導体の具体的なプロセス・実験成果、特定の3Dプリント制作物は事実を確認できず、掲載していません。現在の大学・専攻も推測で補っていません。

## 8. 品質確認

最終結果：全19ページ×6画面幅、27操作、21回のアクセシビリティ検査が成功。自動検査の違反とコンソール・実行時エラーは0件です。内部リンク46件、外部リンク13件を確認しました。

最終的な機械可読結果は `verification-results.json`、外部リンクの結果は `link-verification.json` を参照してください。

- `pnpm lint`: ESLint、警告も失敗扱い
- `pnpm typecheck`: strict TypeScript、エラーなし
- `pnpm build`: 21静的ページを生成。トップのFirst Load JSは約114 kB
- 19コンテンツページを、320 / 390 / 480 / 600 / 768 / 1440pxで確認
- 初回・再訪問・Skip・Escape・半導体Replay、カテゴリ絞り込み、URL直接指定、モバイルナビ、キーボード移動、メールコピー、reduced motion、JavaScript無効時の本文、404、サイトマップを検証
- axe-coreでデスクトップ全19ページ、モバイルトップ、スプラッシュを確認
- 主要画面をスクリーンショットで目視確認
- 掲載外部リンク13件がHTTP 200。MarketplaceはHEAD非対応のためGETで確認

Next.jsがページ遷移時に行う背景のHEAD再検証は、遷移でキャンセルされる場合があります。検証ではその記録を別に保存し、URLが実際にHTTP 200を返すことも確認します。コンソール・実行時エラーやそれ以外の通信失敗を無視する設定にはしていません。

buildには、既存のBrowserslistデータが古い旨の非阻害警告が残ります。実施したブラウザー検証はChromeです。自動アクセシビリティ検査だけで完全な適合性を保証するものではありません。

## 9. 画面の証拠

- `screenshots/home-desktop.png`, `home-mobile.png`
- `screenshots/splash-forming.png`, `splash-complete.png`
- `screenshots/hero-assembly.png`
- `screenshots/projects-desktop.png`
- `screenshots/projects-home-assistant-desktop.png`, `projects-ysp-201-serial-desktop.png`
- `screenshots/about-desktop.png`

## 10. 今後の改善

公開可能な研究の具体的なテーマ・取り組み・実験写真と、3Dプリント制作物の写真がそろえば、既存の詳細ページ構成を使って内容を深められます。現時点で追加画像は完成の必須条件ではなく、抽象図で適切に補っています。次の段階ではSafari / Firefoxや実機でも確認すると、ブラウザー差への確信をさらに高められます。

## Gitの確認

確認時のHEADとmainの共通ベースは `dba2cd892a1faab8bdaea51e0db9d701cee67391` です。指定ブランチ上に変更を保持し、レビューできる作業差分として残しています（未コミット）。`git diff --check` は成功しました。
