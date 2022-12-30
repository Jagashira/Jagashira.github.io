import React from "react";
import backgroundImageBase from "./../../static/img//backgroundImage-base.jpg";
import { Bound, boundanim } from "./../modules/poyoyon";
// https://www.beiz.jp/%E7%B4%A0%E6%9D%90/%E7%99%BD/00039.html
//https://zenn.dev/longbridge/articles/34e155bed187af
//https://hodalab.com/portfolio/
// import "./../../src/css/poyoyon.css"

const Profile = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageBase})`,
        backgroundRepeat: "repeat-y",
        textAlign: "center",
      }}
    >
      <div
        style={{
          letterSpacing: "0.08rem",
          // margin: "20px 16px",
        }}
      >
        <div>
          <h3>
            <Bound>
              <span>J</span>
              <span>A</span>
              <span>G</span>
              <span>A</span>
              <span>S</span>
              <span>H</span>
              <span>I</span>
              <span>R</span>
              <span>A</span>
            </Bound>
          </h3>
        </div>
        <div style={{ textAlign: "center", lineHeight: "normal" }}>
          <h1>Abount this site</h1>
          <div>
            <p>
              このサイトはEgashira Satoshiのポートフォリオサイトです。
              <br />
              私がこれまで製作してきたもの、スキル、ブログをまとめています。
              <br />
              このサイトを通して私のことを深く知ることができます。
            </p>
          </div>
        </div>
        <div>
          <h1>About me</h1>

          <p>
            千葉理科大進学
            <br />
            2020年12月にProgateでプログラミング開始
            <br />
            2022年8月に初の案件をもらい、Google Formの返信機能を実装した
            <br />
            そのプログラムが認められ、LINEにも拡張し、さらに似たような会社にも依頼され、4つ程社内システムを実装した
            <br />
            今は自分が通っている大学で使えるアプリの開発を行っている
          </p>
        </div>

        <div>
          <h1>My background</h1>
          <p>
            2002年9月17日生まれ
            <br />
            ポッポ幼稚園卒業
            <br />
            地元の小学校
            <br />
            地元の中学校
            <br />
            佐賀の高校
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
