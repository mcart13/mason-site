import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { URL } from "node:url";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("top navigation exposes a UI section", () => {
  const navigation = read("lib/navigation.ts");

  assert.match(navigation, /href:\s*"\/ui"/);
  assert.match(navigation, /label:\s*"UI"/);
});

test("ui route exists and renders the FIG 0.2 showcase", () => {
  assert.equal(existsSync(new URL("../app/ui/page.tsx", import.meta.url)), true);

  const page = read("app/ui/page.tsx");
  const feature = read("components/ui/fig-02-feature.tsx");
  const styles = read("app/globals.css");
  const builtForSpeedFeaturePath = new URL("../components/ui/built-for-speed-feature.tsx", import.meta.url);

  assert.match(page, /Fig02Feature/);
  assert.match(page, /BuiltForSpeedFeature/);
  assert.doesNotMatch(page, /A growing shelf of interface studies\./);
  assert.doesNotMatch(page, /Starting with FIG 0\.2 from Suites\./);
  assert.match(feature, /TensionMesh/);
  assert.match(feature, /ui-showcase-item ui-showcase-item--fig/);
  assert.doesNotMatch(feature, /FIG 0\.2/);
  assert.doesNotMatch(feature, /Structure, not chaos/);
  assert.match(styles, /\.ui-showcase-grid\s*\{[\s\S]*display:\s*flex;/);
  assert.match(styles, /\.ui-showcase-grid\s*\{[\s\S]*flex-wrap:\s*wrap;/);
  assert.match(styles, /\.ui-showcase-item--fig\s*\{[\s\S]*265px/);
  assert.match(styles, /\.ui-showcase-item--speed\s*\{[\s\S]*272px/);
  assert.equal(existsSync(builtForSpeedFeaturePath), true);
});

test("tension mesh component exists as a reusable local component", () => {
  const path = new URL("../components/ui/tension-mesh.tsx", import.meta.url);

  assert.equal(existsSync(path), true);
  assert.doesNotMatch(read("components/ui/tension-mesh.tsx"), /landing-tension-mesh-card/);
});

test("built-for-speed chart exists as a reusable local component", () => {
  assert.equal(
    existsSync(new URL("../components/ui/built-for-speed-chart.tsx", import.meta.url)),
    true,
  );
});
