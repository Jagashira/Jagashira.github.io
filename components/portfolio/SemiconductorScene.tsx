import { useEffect, useId, useState } from "react";

type SemiconductorSceneProps = {
  active?: boolean;
  compact?: boolean;
};

const contacts = Array.from({ length: 13 }, (_, index) => 18 + index * 14);
const cells = Array.from({ length: 16 }, (_, index) => ({
  x: 22 + (index % 4) * 26,
  y: 22 + Math.floor(index / 4) * 26,
}));

const upperTraces = [
  "M18 35H48L64 51H84V78",
  "M14 77H38L55 60H71",
  "M34 14V29L74 69H91",
  "M85 14V39L102 56V73",
  "M122 15V38L112 48V70",
  "M164 39H144L127 56V83",
  "M166 83H143L133 93",
  "M164 133H147L121 107H110",
  "M139 164V145L115 121V111",
  "M92 166V145L101 136V110",
  "M40 163V145L75 110H85",
  "M15 119H48L70 97H80",
];

/** Original, conceptual device illustration; it is not a diagram of a research result. */
export function SemiconductorScene({
  active = true,
  compact = false,
}: SemiconductorSceneProps) {
  const instanceId = useId().replace(/:/g, "");
  const [replay, setReplay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const id = (name: string) => `semiconductor-${instanceId}-${name}`;

  useEffect(() => {
    if (!active || compact) return;
    setPlaying(true);
    const timer = window.setTimeout(() => setPlaying(false), 4600);
    return () => window.clearTimeout(timer);
  }, [active, compact, replay]);

  return (
    <figure
      className={`semiconductor-scene${compact ? " semiconductor-scene--compact" : ""}`}
      data-active={active || compact ? "true" : "false"}
      aria-label={
        compact ? "半導体のレイヤー構造のコンセプトイラスト" : undefined
      }
    >
      <svg
        key={replay}
        className="semiconductor-art"
        viewBox={compact ? "60 175 500 335" : "0 0 620 550"}
        fill="none"
        role="img"
        aria-labelledby={`${id("title")} ${id("description")}`}
      >
        <title id={id("title")}>光をまといながら組み上がる半導体</title>
        <desc id={id("description")}>
          配線層、デバイス層、基板が順番に重なり、青白い光が回路を流れる、半導体の抽象的なイラスト。
        </desc>
        <defs>
          <linearGradient
            id={id("substrate")}
            x1="0"
            y1="0"
            x2="204"
            y2="204"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EDF4FA" />
            <stop offset="0.52" stopColor="#DCE8F2" />
            <stop offset="1" stopColor="#C2D6E7" />
          </linearGradient>
          <linearGradient
            id={id("base-left")}
            x1="106"
            y1="355"
            x2="310"
            y2="482"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9EB7CC" />
            <stop offset="1" stopColor="#BCCEDF" />
          </linearGradient>
          <linearGradient
            id={id("base-right")}
            x1="310"
            y1="482"
            x2="514"
            y2="355"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7796B1" />
            <stop offset="1" stopColor="#ABC1D2" />
          </linearGradient>
          <linearGradient
            id={id("device")}
            x1="0"
            y1="0"
            x2="142"
            y2="142"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#254B6E" />
            <stop offset="0.48" stopColor="#122C47" />
            <stop offset="1" stopColor="#3B6282" />
          </linearGradient>
          <linearGradient
            id={id("device-cell")}
            x1="0"
            y1="0"
            x2="20"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A7C1D5" />
            <stop offset="1" stopColor="#597F9F" />
          </linearGradient>
          <linearGradient
            id={id("glass")}
            x1="0"
            y1="0"
            x2="180"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4FAFF" stopOpacity="0.8" />
            <stop offset="0.45" stopColor="#DDEDFB" stopOpacity="0.54" />
            <stop offset="1" stopColor="#BDDAF3" stopOpacity="0.64" />
          </linearGradient>
          <linearGradient
            id={id("glass-edge")}
            x1="130"
            y1="300"
            x2="490"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A6C8E6" />
            <stop offset="0.5" stopColor="#EFF8FF" />
            <stop offset="1" stopColor="#639BCC" />
          </linearGradient>
          <linearGradient
            id={id("beam")}
            x1="110"
            y1="235"
            x2="490"
            y2="415"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C9E5FF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#BBDDFF" stopOpacity="0.13" />
            <stop offset="1" stopColor="#9CC4EE" stopOpacity="0.01" />
          </linearGradient>
          <radialGradient id={id("ambient")}>
            <stop stopColor="#CDE4F7" stopOpacity="0.44" />
            <stop offset="0.7" stopColor="#ECF4FA" stopOpacity="0.25" />
            <stop offset="1" stopColor="#F9FCFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id("shadow")}>
            <stop stopColor="#456A8C" stopOpacity="0.16" />
            <stop offset="1" stopColor="#456A8C" stopOpacity="0" />
          </radialGradient>
          <filter
            id={id("glow")}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <pattern
            id={id("grid")}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M22 0H0V22"
              stroke="#92B0C8"
              strokeOpacity="0.17"
              strokeWidth="0.65"
            />
          </pattern>
        </defs>

        <ellipse
          cx="311"
          cy="323"
          rx="277"
          ry="216"
          fill={`url(#${id("ambient")})`}
        />
        <ellipse
          className="chip-ground-shadow"
          cx="311"
          cy="452"
          rx="237"
          ry="59"
          fill={`url(#${id("shadow")})`}
        />

        {!compact && (
          <g
            className="chip-background-guides"
            stroke="#DFE8F0"
            strokeWidth="0.8"
          >
            <path d="M71 336L310 198L551 337L310 477Z" strokeDasharray="3 6" />
            <path d="M310 82V171M310 492V510M63 337H80M540 337H558" />
            <circle cx="310" cy="183" r="2" fill="#B4C9DB" stroke="none" />
            <path d="M79 87H101M90 76V98M526 490H548M537 479V501" />
          </g>
        )}

        {/* Each layer has its own finite animation; the final state is an assembled device. */}
        <g className="chip-layer chip-layer--substrate">
          <g
            transform="matrix(1 .577 -1 .577 310 237)"
            stroke="#ADBBC6"
            strokeWidth="5.2"
            strokeLinecap="square"
          >
            {contacts.map((position) => (
              <path
                key={position}
                d={`M${position} -9V0M213 ${position}H204M${position} 213V204M-9 ${position}H0`}
              />
            ))}
          </g>
          <path
            d="M106 352L310 470V482L106 364Z"
            fill={`url(#${id("base-left")})`}
          />
          <path
            d="M310 470L514 352V364L310 482Z"
            fill={`url(#${id("base-right")})`}
          />
          <path
            d="M107 359L310 476L513 359"
            stroke="#D8E6F1"
            strokeWidth="0.8"
          />
          <g transform="matrix(1 .577 -1 .577 310 234)">
            <rect
              width="204"
              height="204"
              rx="2"
              fill={`url(#${id("substrate")})`}
              stroke="#A9C0D4"
              strokeWidth="1.2"
            />
            <rect
              x="9"
              y="9"
              width="186"
              height="186"
              rx="1"
              stroke="#F7FBFE"
              strokeWidth="1.1"
            />
            <rect
              x="14"
              y="14"
              width="176"
              height="176"
              fill={`url(#${id("grid")})`}
            />
            <g stroke="#91AEC5" strokeWidth="0.8" strokeLinejoin="round">
              <path d="M13 30H30L53 53H69M13 43H28L43 58V76M13 72H28L44 88H62M13 122H38L60 100M13 162H26L62 126" />
              <path d="M30 191V174L60 144H75M59 191V172L82 149M104 191V163L98 157M146 191V174L123 151M172 191V171L141 140" />
              <path d="M191 172H175L149 146M191 146H176L150 120M191 101H158M191 61H175L153 83M191 28H173L150 51" />
              <path d="M168 13V30L143 55M126 13V29L112 43M82 13V28L95 41M43 13V27L66 50" />
            </g>
            <g fill="#6F97B5" stroke="#E8F2FA" strokeWidth="0.6">
              <circle cx="18" cy="18" r="3" />
              <circle cx="186" cy="18" r="3" />
              <circle cx="18" cy="186" r="3" />
              <circle cx="186" cy="186" r="3" />
              <circle cx="69" cy="53" r="2" />
              <circle cx="62" cy="88" r="2" />
              <circle cx="75" cy="144" r="2" />
              <circle cx="158" cy="101" r="2" />
            </g>
          </g>
          <path
            className="chip-edge-light chip-edge-light--substrate"
            d="M106 352L310 234L514 352L310 470Z"
            pathLength="1"
            stroke="#5C98CB"
            strokeWidth="1.7"
          />
        </g>

        <path
          className="chip-assembly-beam"
          d="M130 198L310 94L490 198V300L310 404L130 300Z"
          fill={`url(#${id("beam")})`}
        />

        <g className="chip-layer chip-layer--device">
          <path d="M168 323L310 405V419L168 337Z" fill="#667F95" />
          <path d="M310 405L452 323V337L310 419Z" fill="#314F6A" />
          <path
            d="M169 332L310 413L451 332"
            stroke="#B5C6D4"
            strokeWidth="0.8"
          />
          <g transform="matrix(1 .577 -1 .577 310 241)">
            <rect
              width="142"
              height="142"
              rx="1.5"
              fill={`url(#${id("device")})`}
              stroke="#D1E1EF"
              strokeWidth="1.2"
            />
            <rect
              x="8"
              y="8"
              width="126"
              height="126"
              rx="1"
              stroke="#89A9C3"
              strokeWidth="0.75"
            />
            <rect
              x="15"
              y="15"
              width="112"
              height="112"
              stroke="#6C91AF"
              strokeWidth="0.5"
            />
            <g opacity="0.9">
              {cells.map(({ x, y }, index) => (
                <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
                  <rect
                    width="20"
                    height="20"
                    rx="0.6"
                    fill={`url(#${id("device-cell")})`}
                    opacity={index % 3 === 0 ? 0.7 : 0.45}
                  />
                  <path
                    d="M3 5H17M3 8H17M3 11H17M3 14H17"
                    stroke="#BCD1E0"
                    strokeWidth="0.5"
                    strokeOpacity="0.68"
                  />
                  <path
                    d="M5 3V17M11 3V17M17 3V17"
                    stroke="#264863"
                    strokeWidth="0.45"
                  />
                </g>
              ))}
            </g>
            <path
              d="M12 20V121M130 20V121M20 12H121M20 130H121"
              stroke="#BACBD7"
              strokeWidth="2.5"
              strokeDasharray="1.5 3.9"
            />
            <g
              className="chip-device-signals"
              stroke="#BDE4FF"
              strokeWidth="1"
              opacity="0.55"
            >
              <path d="M19 45H123M19 97H123M45 19V123M97 19V123" />
            </g>
          </g>
          <path
            className="chip-edge-light chip-edge-light--device"
            d="M168 323L310 241L452 323L310 405Z"
            pathLength="1"
            stroke="#BBE3FF"
            strokeWidth="1.8"
          />
        </g>

        <g className="chip-layer chip-layer--interconnect">
          <path
            d="M130 300L310 404L490 300V306L310 410L130 306Z"
            fill={`url(#${id("glass-edge")})`}
            fillOpacity="0.83"
          />
          <g transform="matrix(1 .577 -1 .577 310 196)">
            <rect
              width="180"
              height="180"
              rx="1.6"
              fill={`url(#${id("glass")})`}
              stroke="#91B9DC"
              strokeWidth="1"
            />
            <rect
              x="7"
              y="7"
              width="166"
              height="166"
              rx="0.6"
              stroke="#F8FCFF"
              strokeWidth="0.9"
            />
            <path
              d="M12 12H168V168"
              stroke="#FFF"
              strokeOpacity="0.57"
              strokeWidth="0.7"
            />
            <g
              stroke="#7EAAD0"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.74"
            >
              {upperTraces.map((path) => (
                <path key={path} d={path} />
              ))}
              <rect
                x="80"
                y="78"
                width="53"
                height="33"
                rx="2"
                strokeWidth="0.8"
              />
              <rect
                x="86"
                y="83"
                width="41"
                height="23"
                rx="1"
                strokeWidth="0.65"
              />
              <path d="M91 88H122M91 94H122M91 100H112" strokeWidth="0.5" />
            </g>
            <g
              className="chip-trace-glow"
              stroke="#E9F7FF"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter={`url(#${id("glow")})`}
            >
              {upperTraces.map((path) => (
                <path key={path} d={path} pathLength="1" />
              ))}
            </g>
            <g
              className="chip-trace-light"
              stroke="#F8FDFF"
              strokeWidth="1.2"
              strokeLinecap="round"
            >
              {upperTraces.map((path) => (
                <path key={path} d={path} pathLength="1" />
              ))}
            </g>
            <g fill="#6E9EC7" stroke="#E8F4FE" strokeWidth="0.85">
              <circle cx="18" cy="35" r="2.2" />
              <circle cx="14" cy="77" r="2.2" />
              <circle cx="34" cy="14" r="2.2" />
              <circle cx="85" cy="14" r="2.2" />
              <circle cx="122" cy="15" r="2.2" />
              <circle cx="164" cy="39" r="2.2" />
              <circle cx="166" cy="83" r="2.2" />
              <circle cx="164" cy="133" r="2.2" />
              <circle cx="139" cy="164" r="2.2" />
              <circle cx="92" cy="166" r="2.2" />
              <circle cx="40" cy="163" r="2.2" />
              <circle cx="15" cy="119" r="2.2" />
            </g>
            <g className="chip-node-light" fill="#F2FBFF">
              <circle cx="84" cy="78" r="2" />
              <circle cx="112" cy="70" r="2" />
              <circle cx="133" cy="93" r="2" />
              <circle cx="101" cy="110" r="2" />
            </g>
          </g>
          <path
            d="M130 300L310 196L490 300"
            stroke="#EAF7FF"
            strokeWidth="1.7"
          />
          <path
            className="chip-edge-light chip-edge-light--interconnect"
            d="M130 300L310 196L490 300L310 404Z"
            pathLength="1"
            stroke="#EDF9FF"
            strokeWidth="2.2"
          />
        </g>

        {!compact && (
          <g className="chip-annotations">
            <g stroke="#9FB3C3" strokeWidth="0.8" strokeLinejoin="round">
              <path d="M399 248L443 171H559" />
              <path d="M183 323L128 276H33" />
              <path d="M431 407L472 460H577" />
            </g>
            <g fill="#7F9EB7">
              <circle cx="399" cy="248" r="2.2" />
              <circle cx="183" cy="323" r="2.2" />
              <circle cx="431" cy="407" r="2.2" />
            </g>
            <g className="chip-annotation-text" fill="#47617A">
              <text x="446" y="161">
                I. INTERCONNECT
              </text>
              <text x="33" y="266">
                II. DEVICE LAYER
              </text>
              <text x="476" y="450">
                III. SUBSTRATE
              </text>
            </g>
          </g>
        )}
      </svg>
      {!compact && (
        <figcaption className="semiconductor-caption">
          <span>
            <span className="chip-caption-dot" aria-hidden="true" />{" "}
            SEMICONDUCTOR / CONCEPT STUDY
          </span>
          <button
            type="button"
            className="chip-replay"
            aria-label="半導体の組み立てアニメーションをもう一度再生"
            disabled={playing || !active}
            onClick={() => setReplay((value) => value + 1)}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3.3 5.5A5 5 0 1 1 3 9M3.3 2.2v3.5h3.5"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{playing ? "ASSEMBLING" : "REPLAY"}</span>
          </button>
        </figcaption>
      )}
    </figure>
  );
}

export default SemiconductorScene;
