import fs from "node:fs/promises";
import path from "node:path";

const OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "github",
  "contributions.svg",
);

async function loadEnvFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);

  try {
    const contents = await fs.readFile(filePath, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

const SVG_WIDTH = 1080;
const SVG_HEIGHT = 180;
const CELL = 14;
const GAP = 4;
const STEP = CELL + GAP;
const GRID_X = 92;
const GRID_Y = 34;
const LABEL_COLOR = "#475569";
const SUBTITLE_COLOR = "#64748b";
const LEVEL_COLORS = {
  NONE: "#ebedf0",
  FIRST_QUARTILE: "#9be9a8",
  SECOND_QUARTILE: "#40c463",
  THIRD_QUARTILE: "#30a14e",
  FOURTH_QUARTILE: "#216e39",
};

async function ensureOutputDir() {
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
}

function levelFromPublicGraph(level) {
  switch (String(level)) {
    case "1":
      return "FIRST_QUARTILE";
    case "2":
      return "SECOND_QUARTILE";
    case "3":
      return "THIRD_QUARTILE";
    case "4":
      return "FOURTH_QUARTILE";
    default:
      return "NONE";
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function monthLabel(month) {
  return new Date(`${month.firstDay}T00:00:00Z`).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
}

function buildSvg({ totalContributions, weeks, months, generatedAt, sourceLabel }) {
  const monthLabels = months
    .map((month) => {
      const x = GRID_X + month.weekIndex * STEP;
      return `<text x="${x}" y="18" font-size="12" fill="${SUBTITLE_COLOR}" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">${escapeHtml(monthLabel(month))}</text>`;
    })
    .join("");

  const weekdayLabels = [
    { label: "Mon", row: 1 },
    { label: "Wed", row: 3 },
    { label: "Fri", row: 5 },
  ]
    .map(({ label, row }) => {
      const y = GRID_Y + row * STEP + 11;
      return `<text x="28" y="${y}" font-size="12" fill="${LABEL_COLOR}" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">${label}</text>`;
    })
    .join("");

  const cells = weeks
    .flatMap((week, weekIndex) =>
      week.contributionDays.map((day) => {
        const x = GRID_X + weekIndex * STEP;
        const y = GRID_Y + day.weekday * STEP;
        const levelColor = LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE;
        const aria = `${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`;
        return `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="3" ry="3" fill="${levelColor}"><title>${escapeHtml(aria)}</title></rect>`;
      }),
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeHtml(`${totalContributions} GitHub contributions in the last year`)}</title>
  <desc id="desc">${escapeHtml(`GitHub contribution chart for ${sourceLabel}, updated ${generatedAt}`)}</desc>
  ${monthLabels}
  ${weekdayLabels}
  ${cells}
</svg>`;
}

function buildPlaceholderSvg(username) {
  const today = new Date();
  const weeks = Array.from({ length: 53 }, (_, weekIndex) => ({
    contributionDays: Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(today);
      date.setUTCDate(today.getUTCDate() - (53 - weekIndex) * 7 + dayIndex);
      return {
        contributionCount: 0,
        contributionLevel: "NONE",
        date: date.toISOString().slice(0, 10),
        weekday: dayIndex + 1,
      };
    }),
  }));

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - (11 - index), 1));
    return {
      firstDay: date.toISOString().slice(0, 10),
      weekIndex: Math.floor((index * 53) / 12),
    };
  });

  return buildSvg({
    totalContributions: 0,
    weeks,
    months,
    generatedAt: "Waiting for token",
    sourceLabel: `@${username}`,
  });
}

async function fetchContributionCalendar(username, token) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "Jagashira.github.io contribution generator",
    },
    body: JSON.stringify({
      query: `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    contributionLevel
                    date
                    weekday
                  }
                }
                months {
                  firstDay
                  name
                  totalWeeks
                  year
                }
              }
            }
          }
        }
      `,
      variables: { login: username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed with ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error("Contribution calendar not found in GitHub response.");
  }

  const monthWeekIndices = new Map();
  calendar.months.forEach((month) => {
    monthWeekIndices.set(month.firstDay, calendar.weeks.findIndex((week) =>
      week.contributionDays.some((day) => day.date === month.firstDay),
    ));
  });

  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
    months: calendar.months.map((month) => ({
      ...month,
      weekIndex: Math.max(monthWeekIndices.get(month.firstDay) ?? 0, 0),
    })),
  };
}

async function fetchPublicContributionCalendar(username) {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: {
      "User-Agent": "Jagashira.github.io contribution generator",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub public contributions request failed with ${response.status}`);
  }

  const svg = await response.text();
  const rectMatches = [...svg.matchAll(
    /<rect\b[^>]*data-date="([^"]+)"[^>]*data-count="(\d+)"[^>]*data-level="(\d+)"[^>]*>/g,
  )];

  if (!rectMatches.length) {
    throw new Error("Public contribution graph not found in GitHub response.");
  }

  const contributionDays = rectMatches
    .map(([, date, count, level]) => ({
      date,
      contributionCount: Number(count),
      contributionLevel: levelFromPublicGraph(level),
      weekday: new Date(`${date}T00:00:00Z`).getUTCDay(),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const weeks = [];
  for (let i = 0; i < contributionDays.length; i += 7) {
    weeks.push({
      contributionDays: contributionDays.slice(i, i + 7),
    });
  }

  const months = [];
  const seenMonths = new Set();
  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day) => {
      const monthKey = day.date.slice(0, 7);
      if (day.date.endsWith("-01") && !seenMonths.has(monthKey)) {
        seenMonths.add(monthKey);
        months.push({
          firstDay: day.date,
          weekIndex,
        });
      }
    });
  });

  return {
    totalContributions: contributionDays.reduce((sum, day) => sum + day.contributionCount, 0),
    weeks,
    months,
  };
}

async function main() {
  await loadEnvFile(".env.local");
  await loadEnvFile(".env");
  await ensureOutputDir();

  const USERNAME = process.env.GITHUB_CONTRIBUTIONS_USER || "Jagashira";
  const TOKEN = process.env.GH_CONTRIBUTIONS_TOKEN;
  let calendar;
  let sourceLabel;

  if (TOKEN) {
    try {
      calendar = await fetchContributionCalendar(USERNAME, TOKEN);
      sourceLabel = `@${USERNAME} private activity`;
    } catch (error) {
      console.warn(
        `Failed to fetch private contribution calendar, falling back to public data: ${error.message}`,
      );
    }
  }

  if (!calendar) {
    calendar = await fetchPublicContributionCalendar(USERNAME);
    sourceLabel = `@${USERNAME} public activity`;
  }

  const generatedAt = new Date().toISOString().slice(0, 10);

  const svg = buildSvg({
    ...calendar,
    generatedAt,
    sourceLabel,
  });

  await fs.writeFile(OUTPUT_PATH, svg, "utf8");
  console.log(`Generated contributions SVG at ${OUTPUT_PATH}`);
}

main().catch(async (error) => {
  await ensureOutputDir();
  const username = process.env.GITHUB_CONTRIBUTIONS_USER || "Jagashira";
  await fs.writeFile(OUTPUT_PATH, buildPlaceholderSvg(username), "utf8");
  console.error(error);
  process.exit(1);
});
