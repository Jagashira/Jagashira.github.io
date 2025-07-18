## 課題と目的

所属していた流体研究室のシリンジポンプ「YSP-201」は、独自の**PPL（Pump Programming Language）**でプログラムを組むことができましたが、その言語は簡易的で、プログラムの作成や実行に手間がかかるという課題がありました。

そこで、より直感的で効率的なコマンド体系を Python で独自に設計し、**CLI（コマンドラインインターフェース）から手軽にポンプの複雑な動作をプログラム・実行できる**スクリプトを開発しました。

## 主な機能と特徴

- **⌨️ 柔軟な CLI 操作**
  `python implement.py --port COM3 --dia 14.5` のように、コマンドライン引数で接続ポートやシリンジの内径、流速などを柔軟に指定可能。これにより、様々な実験条件下でスクリプトを再利用できます。

- **🔄 シリアル通信による双方向制御**
  `pySerial`ライブラリを利用し、PC と YSP-201 間のシリアル通信を確立。Python で記述したコマンドを、リアルタイムで PPL に変換してポンプへ送信します。

- **🧪 実験シーケンスの自動化**
  Python の強力なプログラミング機能を活かし、「A 液を 10 分送液後、B 液を 5 分吸引する」といった複雑な一連の操作をスクリプトとして記述・実行可能にしました。

## 工夫した点・技術的な挑戦

- **🔩 独自言語のラッパー開発**
  PPL の仕様を解析し、それを抽象化するラッパーを Python で開発。利用者は PPL を意識することなく、より高水準なコマンドでポンプを制御できるようにしました。

- **🐍 Python によるスタンドアローンツール開発**
  Web 技術とは異なる、コマンドラインベースでのハードウェア制御に挑戦。Python の標準的なライブラリだけで、研究の効率を大幅に向上させる実用的なツールを完成させました。
