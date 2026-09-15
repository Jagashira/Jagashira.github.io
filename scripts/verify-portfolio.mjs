/** Optional UI audit. Supply Playwright and axe-core from the local test environment. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const axeSource =
  process.env.AXE_SOURCE || require.resolve("axe-core/axe.min.js");
const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3001";
const screenshotDirectory = "docs/screenshots";
fs.mkdirSync(screenshotDirectory, { recursive: true });
const projectIds = fs
  .readdirSync("data/projects/docs")
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.slice(0, -3));
const noteIds = fs
  .readdirSync("data/cooknote/notes")
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.slice(0, -3));
const routes = [
  "/",
  "/projects/",
  "/about/",
  "/cooknote/",
  ...projectIds.map((id) => `/projects/${id}/`),
  ...noteIds.map((id) => `/cooknote/notes/${id}/`),
];
const report = {
  checkedAt: new Date().toISOString(),
  base,
  routes: [],
  interactions: [],
  accessibility: [],
  internalLinks: [],
  externalLinks: [],
  cancelledBackgroundChecks: [],
  errors: [],
};
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
  headless: true,
});
const check = (name, value) => {
  assert.ok(value, name);
  report.interactions.push(name);
};
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") report.errors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    const reason = request.failure()?.errorText;
    // Next.js issues background HEAD revalidation for static data. A navigation can
    // cancel it; retain the record and independently verify its URL below.
    if (
      request.method() === "HEAD" &&
      request.url().includes("/_next/data/") &&
      reason === "net::ERR_ABORTED"
    ) {
      report.cancelledBackgroundChecks.push({ url: request.url(), reason });
    } else
      report.errors.push(`${request.method()} ${request.url()}: ${reason}`);
  });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator("dialog[open]").waitFor();
  check(
    "First visit opens the latte intro",
    (await page.locator("dialog[open]").count()) === 1,
  );
  await page.waitForTimeout(1550);
  await page.screenshot({
    path: path.join(screenshotDirectory, "splash-forming.png"),
  });
  await page.waitForTimeout(1150);
  await page.screenshot({
    path: path.join(screenshotDirectory, "splash-complete.png"),
  });
  await page.locator("dialog[open]").waitFor({ state: "hidden" });
  await page.waitForTimeout(5000);
  check(
    "Intro closes and saves its session state",
    (await page.evaluate(() =>
      sessionStorage.getItem("portfolio-latte-seen-v1"),
    )) === "1",
  );
  check(
    "Hero animation finishes without continuous motion",
    await page.evaluate(() =>
      document
        .querySelector(".semiconductor-scene")
        .getAnimations({ subtree: true })
        .every((animation) => animation.playState !== "running"),
    ),
  );
  const replay = page.getByRole("button", {
    name: "半導体の組み立てアニメーションをもう一度再生",
  });
  await replay.click();
  await page.waitForTimeout(300);
  check(
    "Replay starts the semiconductor assembly",
    await page.evaluate(
      () =>
        document
          .querySelector(".chip-layer--interconnect")
          .getBoundingClientRect().height > 0 &&
        getComputedStyle(document.querySelector(".chip-layer--interconnect"))
          .transform !== "matrix(1, 0, 0, 1, 0, 0)",
    ),
  );
  await page.screenshot({
    path: path.join(screenshotDirectory, "hero-assembly.png"),
  });
  await page.waitForTimeout(4700);
  check("Replay re-enables after completion", await replay.isEnabled());
  await page.reload({ waitUntil: "networkidle" });
  check(
    "Repeat visit skips the intro",
    (await page.locator("dialog[open]").count()) === 0,
  );
  const links = new Set();
  for (const route of routes) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator("h1").count(), 1, `one h1: ${route}`);
    await page.locator("img").evaluateAll((images) =>
      images.forEach((image) => {
        image.loading = "eager";
      }),
    );
    await page.waitForFunction(() =>
      [...document.images].every(
        (image) => image.complete && image.naturalWidth > 0,
      ),
    );
    const viewports = [];
    for (const width of [320, 390, 480, 600, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const metrics = await page.evaluate(() => ({
        viewport: innerWidth,
        content: document.documentElement.scrollWidth,
      }));
      assert.ok(
        metrics.content <= metrics.viewport,
        `${route} overflows at ${width}: ${metrics.content}`,
      );
      viewports.push(metrics);
    }
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((elements) => elements.map((element) => element.href));
    hrefs.forEach((href) => links.add(href));
    await page.addScriptTag({ path: axeSource });
    const violations = await page.evaluate(async () =>
      (
        await window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
          },
        })
      ).violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        targets: violation.nodes.map((node) => node.target),
      })),
    );
    report.accessibility.push({ route, width: 1440, violations });
    report.routes.push({ route, status: response.status(), viewports });
    if (
      [
        "/",
        "/projects/",
        "/about/",
        "/projects/home-assistant/",
        "/projects/ysp-201-serial/",
      ].includes(route)
    ) {
      if (route === "/") await page.waitForTimeout(5000);
      const name =
        route === "/"
          ? "home"
          : route.replaceAll("/", "-").replace(/^-|-$/g, "");
      await page.screenshot({
        path: path.join(screenshotDirectory, `${name}-desktop.png`),
        fullPage: true,
      });
    }
    console.log(`Verified ${route}`);
  }
  for (const href of links) {
    const url = new URL(href);
    if (url.origin === new URL(base).origin) {
      const response = await context.request.get(href);
      assert.equal(response.status(), 200, `Internal link: ${href}`);
      if (url.hash) {
        const html = await response.text();
        assert.ok(
          html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `Anchor: ${href}`,
        );
      }
      report.internalLinks.push({
        path: url.pathname + url.search + url.hash,
        status: response.status(),
      });
    } else if (url.protocol === "https:")
      report.externalLinks.push({ url: href, status: "not checked" });
  }
  await page.goto(base + "/projects/", { waitUntil: "networkidle" });
  for (const [category, count] of [
    ["IoT & Hardware", 3],
    ["Software", 7],
    ["Automation", 2],
    ["All projects", 12],
  ]) {
    await page.getByRole("button", { name: new RegExp(category) }).click();
    await page.waitForFunction(
      (count) => document.querySelectorAll(".project-card").length === count,
      count,
    );
    check(
      `${category} filter displays ${count} projects`,
      (await page.locator(".project-card").count()) === count,
    );
  }
  await page.goto(base + "/projects/?category=hardware", {
    waitUntil: "networkidle",
  });
  check(
    "Category deep link works",
    (await page.locator(".project-card").count()) === 3,
  );
  await page.locator(".project-card-link").first().click();
  await page.waitForURL("**/projects/home-assistant/");
  await page.waitForLoadState("networkidle");
  check(
    "Project cards open the correct detail",
    (await page.locator("h1").textContent()) === "Home Assistant",
  );
  await page.goto(base, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole("button", { name: "メニューを開く" });
  await menu.click();
  check(
    "Mobile menu opens",
    await page.locator("#site-navigation").isVisible(),
  );
  await page.keyboard.press("Escape");
  check(
    "Escape closes the menu and preserves toggle focus",
    (await page.locator("#site-navigation").isHidden()) &&
      (await menu.evaluate((element) => element === document.activeElement)),
  );
  await menu.click();
  await page
    .locator("#site-navigation")
    .getByRole("link", { name: "Research", exact: true })
    .click();
  await page.waitForTimeout(500);
  check(
    "Mobile navigation reaches Research and closes",
    page.url().endsWith("#research") &&
      (await page.locator("#site-navigation").isHidden()),
  );
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(5000);
  await page.screenshot({
    path: path.join(screenshotDirectory, "home-mobile.png"),
    fullPage: true,
  });
  await page.addScriptTag({ path: axeSource });
  report.accessibility.push({
    route: "/",
    width: 390,
    violations: await page.evaluate(async () =>
      (
        await window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
          },
        })
      ).violations.map((violation) => ({
        id: violation.id,
        targets: violation.nodes.map((node) => node.target),
      })),
    ),
  });
  await page.keyboard.press("Tab");
  check(
    "Keyboard skip link is first in tab order",
    await page
      .getByRole("link", { name: "本文へスキップ" })
      .evaluate((element) => element === document.activeElement),
  );
  await page.keyboard.press("Enter");
  check(
    "Skip link focuses main content",
    await page
      .locator("main")
      .evaluate((element) => element === document.activeElement),
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "アドレスをコピー" }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "メールアドレスをコピーしました" })
    .waitFor();
  check(
    "Email copy works",
    (await page.evaluate(() => navigator.clipboard.readText())) ===
      "pyprogjas.3104@gmail.com",
  );
  const reduced = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base, { waitUntil: "networkidle" });
  check(
    "Reduced motion omits intro and replay",
    (await reducedPage.locator("dialog[open]").count()) === 0 &&
      (await reducedPage.locator(".chip-replay").isHidden()),
  );
  check(
    "Reduced motion shows assembled layers without animation",
    await reducedPage.evaluate(
      () =>
        [...document.querySelectorAll(".chip-layer")].every(
          (layer) => getComputedStyle(layer).transform === "none",
        ) &&
        document
          .getAnimations()
          .every((animation) => animation.playState !== "running"),
    ),
  );
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(base);
  check(
    "Static content is readable without JavaScript",
    (await noJsPage.locator("h1").isVisible()) &&
      (await noJsPage.locator("dialog").isHidden()) &&
      (await noJsPage.locator(".project-card").count()) === 4,
  );
  const skipContext = await browser.newContext();
  const skipPage = await skipContext.newPage();
  await skipPage.goto(base, { waitUntil: "domcontentloaded" });
  await skipPage.getByRole("button", { name: "スキップ" }).click();
  await skipPage.locator("dialog[open]").waitFor({ state: "hidden" });
  check(
    "Intro skip button closes the modal",
    (await skipPage.locator("dialog[open]").count()) === 0,
  );
  await skipPage.evaluate(() => sessionStorage.clear());
  await skipPage.reload({ waitUntil: "domcontentloaded" });
  await skipPage.locator("dialog[open]").waitFor();
  await skipPage.keyboard.press("Escape");
  await skipPage.locator("dialog[open]").waitFor({ state: "hidden" });
  check(
    "Escape skips the intro",
    (await skipPage.locator("dialog[open]").count()) === 0,
  );
  const introAuditContext = await browser.newContext();
  const introAuditPage = await introAuditContext.newPage();
  await introAuditPage.goto(base, { waitUntil: "domcontentloaded" });
  await introAuditPage.locator("dialog[open]").waitFor();
  await introAuditPage.addScriptTag({ path: axeSource });
  report.accessibility.push({ route: "/ (intro)", width: 1280, violations: await introAuditPage.evaluate(async () => (await window.axe.run("dialog", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } })).violations.map(violation => ({ id: violation.id, targets: violation.nodes.map(node => node.target) }))) });
  await introAuditContext.close();
  const missing = await context.request.get(base + "/not-a-real-project/");
  check(
    "Unknown routes return the custom 404",
    missing.status() === 404 &&
      (await missing.text()).includes("まだ、かたちのないページ"),
  );
  for (const file of ["robots.txt", "sitemap.xml", "sitemap-0.xml"])
    check(
      `Static export includes ${file}`,
      (await context.request.get(base + "/" + file)).status() === 200,
    );
  for (const entry of report.cancelledBackgroundChecks) {
    entry.verifiedStatus = (await context.request.head(entry.url)).status();
    assert.equal(
      entry.verifiedStatus,
      200,
      "Cancelled background URL must still resolve",
    );
  }
  assert.deepEqual(
    report.errors,
    [],
    "Browser console, runtime and request errors",
  );
  assert.ok(
    report.accessibility.every((audit) => audit.violations.length === 0),
    "Accessibility violations",
  );
  report.result = "passed";
} catch (error) {
  report.result = "failed";
  report.failure = error.stack;
  process.exitCode = 1;
} finally {
  fs.writeFileSync(
    "docs/verification-results.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        result: report.result,
        pages: report.routes.length,
        interactions: report.interactions.length,
        accessibility: report.accessibility.filter(
          (audit) => audit.violations.length,
        ),
        errors: report.errors,
        failure: report.failure,
      },
      null,
      2,
    ),
  );
  await browser.close();
}
