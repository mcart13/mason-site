"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";

const CELLS_X = 1;
const CELLS_Y = 1;
const ISO_X = 28;
const ISO_Y = 14;
const TILE_U = 1.8;
const TILE_V = 1.0;
const VIEW_W = 265;
const VIEW_H = 262;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = VIEW_H / 2 + 20;
const FLAT_HEIGHT = 8;
const RAISED_HEIGHT = 64;
const CENTER_COL = 0;
const CENTER_ROW = 0;
const CENTER_KEY = `${CENTER_COL}-${CENTER_ROW}`;
const FLIP_COL_THRESHOLD = 1;
const CARD_OFFSET_RIGHT = TILE_U * ISO_X;
const CARD_OFFSET_LEFT = -TILE_U * ISO_X;
const CARD_VERTICAL_ANCHOR_OFFSET = -RAISED_HEIGHT / 2;
const IDLE_ROTATION_MS = 2800;

const TILE_SPRING = { damping: 18, mass: 1 };
const CARD_SPRING = { damping: 22, mass: 0.8 };

interface ScreenPos {
  x: number;
  y: number;
}

const CORNER_R = 3;
const CORNER_JOIN_T = 0.5;

const add = (point: ScreenPos, dx: number, dy: number): ScreenPos => ({
  x: point.x + dx,
  y: point.y + dy,
});

const inset = (corner: ScreenPos, toward: ScreenPos, radius: number): ScreenPos => {
  const dx = toward.x - corner.x;
  const dy = toward.y - corner.y;
  const len = Math.hypot(dx, dy);

  return { x: corner.x + (dx / len) * radius, y: corner.y + (dy / len) * radius };
};

const quadraticPoint = (
  start: ScreenPos,
  control: ScreenPos,
  end: ScreenPos,
  t: number,
): ScreenPos => {
  const mt = 1 - t;

  return {
    x: mt * mt * start.x + 2 * mt * t * control.x + t * t * end.x,
    y: mt * mt * start.y + 2 * mt * t * control.y + t * t * end.y,
  };
};

interface QuadraticSegment {
  start: ScreenPos;
  control: ScreenPos;
  end: ScreenPos;
}

const lerpPoint = (from: ScreenPos, to: ScreenPos, t: number): ScreenPos => ({
  x: from.x + (to.x - from.x) * t,
  y: from.y + (to.y - from.y) * t,
});

const splitQuadraticSegment = (
  start: ScreenPos,
  control: ScreenPos,
  end: ScreenPos,
  t: number,
): [QuadraticSegment, QuadraticSegment] => {
  const startControl = lerpPoint(start, control, t);
  const controlEnd = lerpPoint(control, end, t);
  const join = lerpPoint(startControl, controlEnd, t);

  return [
    { start, control: startControl, end: join },
    { start: join, control: controlEnd, end },
  ];
};

interface RoundedFaceGuide {
  top: ScreenPos;
  right: ScreenPos;
  bottom: ScreenPos;
  left: ScreenPos;
  tOut: ScreenPos;
  tIn: ScreenPos;
  rIn: ScreenPos;
  rOut: ScreenPos;
  bIn: ScreenPos;
  bOut: ScreenPos;
  lIn: ScreenPos;
  lOut: ScreenPos;
}

const getRoundedFaceGuide = (
  top: ScreenPos,
  right: ScreenPos,
  bottom: ScreenPos,
  left: ScreenPos,
  yOffset: number,
): RoundedFaceGuide => {
  const adjustedTop = { x: top.x, y: top.y + yOffset };
  const adjustedRight = { x: right.x, y: right.y + yOffset };
  const adjustedBottom = { x: bottom.x, y: bottom.y + yOffset };
  const adjustedLeft = { x: left.x, y: left.y + yOffset };

  return {
    top: adjustedTop,
    right: adjustedRight,
    bottom: adjustedBottom,
    left: adjustedLeft,
    tOut: inset(adjustedTop, adjustedRight, CORNER_R),
    tIn: inset(adjustedTop, adjustedLeft, CORNER_R),
    rIn: inset(adjustedRight, adjustedTop, CORNER_R),
    rOut: inset(adjustedRight, adjustedBottom, CORNER_R),
    bIn: inset(adjustedBottom, adjustedRight, CORNER_R),
    bOut: inset(adjustedBottom, adjustedLeft, CORNER_R),
    lIn: inset(adjustedLeft, adjustedBottom, CORNER_R),
    lOut: inset(adjustedLeft, adjustedTop, CORNER_R),
  };
};

const roundedFacePath = (
  top: ScreenPos,
  right: ScreenPos,
  bottom: ScreenPos,
  left: ScreenPos,
  yOffset: number,
): string => {
  const guide = getRoundedFaceGuide(top, right, bottom, left, yOffset);

  return [
    `M${guide.tOut.x} ${guide.tOut.y}`,
    `L${guide.rIn.x} ${guide.rIn.y}`,
    `Q${guide.right.x} ${guide.right.y} ${guide.rOut.x} ${guide.rOut.y}`,
    `L${guide.bIn.x} ${guide.bIn.y}`,
    `Q${guide.bottom.x} ${guide.bottom.y} ${guide.bOut.x} ${guide.bOut.y}`,
    `L${guide.lIn.x} ${guide.lIn.y}`,
    `Q${guide.left.x} ${guide.left.y} ${guide.lOut.x} ${guide.lOut.y}`,
    `L${guide.tIn.x} ${guide.tIn.y}`,
    `Q${guide.top.x} ${guide.top.y} ${guide.tOut.x} ${guide.tOut.y}`,
    "Z",
  ].join("");
};

const rightWallPath = (topGuide: RoundedFaceGuide, baseGuide: RoundedFaceGuide): string => {
  const [topSide] = splitQuadraticSegment(
    topGuide.rIn,
    topGuide.right,
    topGuide.rOut,
    CORNER_JOIN_T,
  );
  const [baseSide] = splitQuadraticSegment(
    baseGuide.rIn,
    baseGuide.right,
    baseGuide.rOut,
    CORNER_JOIN_T,
  );

  return [
    `M${topSide.start.x} ${topSide.start.y}`,
    `Q${topSide.control.x} ${topSide.control.y} ${topSide.end.x} ${topSide.end.y}`,
    `L${baseSide.end.x} ${baseSide.end.y}`,
    `Q${baseSide.control.x} ${baseSide.control.y} ${baseSide.start.x} ${baseSide.start.y}`,
    "Z",
  ].join("");
};

const frontWallPath = (topGuide: RoundedFaceGuide, baseGuide: RoundedFaceGuide): string => {
  const [, topRightFront] = splitQuadraticSegment(
    topGuide.rIn,
    topGuide.right,
    topGuide.rOut,
    CORNER_JOIN_T,
  );
  const [, baseRightFront] = splitQuadraticSegment(
    baseGuide.rIn,
    baseGuide.right,
    baseGuide.rOut,
    CORNER_JOIN_T,
  );
  const [topLeftFront] = splitQuadraticSegment(
    topGuide.lIn,
    topGuide.left,
    topGuide.lOut,
    CORNER_JOIN_T,
  );
  const [baseLeftFront] = splitQuadraticSegment(
    baseGuide.lIn,
    baseGuide.left,
    baseGuide.lOut,
    CORNER_JOIN_T,
  );

  return [
    `M${topRightFront.start.x} ${topRightFront.start.y}`,
    `Q${topRightFront.control.x} ${topRightFront.control.y} ${topRightFront.end.x} ${topRightFront.end.y}`,
    `L${topGuide.bIn.x} ${topGuide.bIn.y}`,
    `Q${topGuide.bottom.x} ${topGuide.bottom.y} ${topGuide.bOut.x} ${topGuide.bOut.y}`,
    `L${topLeftFront.start.x} ${topLeftFront.start.y}`,
    `Q${topLeftFront.control.x} ${topLeftFront.control.y} ${topLeftFront.end.x} ${topLeftFront.end.y}`,
    `L${baseLeftFront.end.x} ${baseLeftFront.end.y}`,
    `Q${baseLeftFront.control.x} ${baseLeftFront.control.y} ${baseLeftFront.start.x} ${baseLeftFront.start.y}`,
    `L${baseGuide.bOut.x} ${baseGuide.bOut.y}`,
    `Q${baseGuide.bottom.x} ${baseGuide.bottom.y} ${baseGuide.bIn.x} ${baseGuide.bIn.y}`,
    `L${baseRightFront.end.x} ${baseRightFront.end.y}`,
    `Q${baseRightFront.control.x} ${baseRightFront.control.y} ${baseRightFront.start.x} ${baseRightFront.start.y}`,
    "Z",
  ].join("");
};

const leftWallPath = (topGuide: RoundedFaceGuide, baseGuide: RoundedFaceGuide): string => {
  const [, topSide] = splitQuadraticSegment(
    topGuide.lIn,
    topGuide.left,
    topGuide.lOut,
    CORNER_JOIN_T,
  );
  const [, baseSide] = splitQuadraticSegment(
    baseGuide.lIn,
    baseGuide.left,
    baseGuide.lOut,
    CORNER_JOIN_T,
  );

  return [
    `M${topSide.start.x} ${topSide.start.y}`,
    `Q${topSide.control.x} ${topSide.control.y} ${topSide.end.x} ${topSide.end.y}`,
    `L${baseSide.end.x} ${baseSide.end.y}`,
    `Q${baseSide.control.x} ${baseSide.control.y} ${baseSide.start.x} ${baseSide.start.y}`,
    "Z",
  ].join("");
};

const frontMidSeamPath = (topGuide: RoundedFaceGuide, baseGuide: RoundedFaceGuide): string => {
  const topMid = quadraticPoint(topGuide.bIn, topGuide.bottom, topGuide.bOut, 0.5);
  const baseMid = quadraticPoint(baseGuide.bIn, baseGuide.bottom, baseGuide.bOut, 0.5);

  return `M${topMid.x} ${topMid.y}L${baseMid.x} ${baseMid.y}`;
};

interface CellGeo {
  top: ScreenPos;
  right: ScreenPos;
  bottom: ScreenPos;
  left: ScreenPos;
  cx: number;
  cy: number;
}

const isoPoint = (a: number, b: number): ScreenPos => ({
  x: CENTER_X + a * ISO_X - b * ISO_X,
  y: CENTER_Y + a * ISO_Y + b * ISO_Y,
});

const cellGeo = (): CellGeo => {
  const origin = isoPoint(0, 0);
  const ux = TILE_U * ISO_X;
  const uy = TILE_U * ISO_Y;
  const vx = -TILE_V * ISO_X;
  const vy = TILE_V * ISO_Y;

  const top = origin;
  const right = add(origin, ux, uy);
  const bottom = add(right, vx, vy);
  const left = add(origin, vx, vy);

  return {
    top,
    right,
    bottom,
    left,
    cx: (top.x + right.x + bottom.x + left.x) / 4,
    cy: (top.y + right.y + bottom.y + left.y) / 4,
  };
};

const pointInQuad = (
  px: number,
  py: number,
  a: ScreenPos,
  b: ScreenPos,
  c: ScreenPos,
  d: ScreenPos,
): boolean => {
  const points: Array<[number, number]> = [
    [a.x, a.y],
    [b.x, b.y],
    [c.x, c.y],
    [d.x, d.y],
  ];
  let inside = false;

  for (let index = 0, previous = points.length - 1; index < points.length; previous = index++) {
    const [xi, yi] = points[index];
    const [xj, yj] = points[previous];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
};

const getTileHeight = (mx: number, my: number): number => {
  if (!Number.isFinite(mx) || !Number.isFinite(my)) return FLAT_HEIGHT;
  const geo = TILE_ENTRIES[0]?.geo;
  if (!geo) return FLAT_HEIGHT;

  return pointInQuad(mx, my, geo.top, geo.right, geo.bottom, geo.left) ? RAISED_HEIGHT : FLAT_HEIGHT;
};

interface MeshTileProps {
  geo: CellGeo;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reducedMotion: boolean;
}

const MeshTile = ({ geo, mouseX, mouseY, reducedMotion }: MeshTileProps) => {
  const targetHeight = useTransform([mouseX, mouseY], ([mx, my]: number[]) =>
    getTileHeight(mx, my),
  );
  const springHeight = useSpring(targetHeight, TILE_SPRING);
  const animatedHeight = reducedMotion ? targetHeight : springHeight;

  const { top, right, bottom, left } = geo;

  const topFacePath = useTransform(animatedHeight, (height) =>
    roundedFacePath(top, right, bottom, left, -height),
  );

  const rightFacePath = useTransform(animatedHeight, (height) => {
    if (height < 0.5) return "";
    const topGuide = getRoundedFaceGuide(top, right, bottom, left, -height);
    const baseGuide = getRoundedFaceGuide(top, right, bottom, left, 0);

    return rightWallPath(topGuide, baseGuide);
  });

  const frontFacePath = useTransform(animatedHeight, (height) => {
    if (height < 0.5) return "";
    const topGuide = getRoundedFaceGuide(top, right, bottom, left, -height);
    const baseGuide = getRoundedFaceGuide(top, right, bottom, left, 0);

    return frontWallPath(topGuide, baseGuide);
  });

  const leftFacePath = useTransform(animatedHeight, (height) => {
    if (height < 0.5) return "";
    const topGuide = getRoundedFaceGuide(top, right, bottom, left, -height);
    const baseGuide = getRoundedFaceGuide(top, right, bottom, left, 0);

    return leftWallPath(topGuide, baseGuide);
  });

  const innerPath = useTransform(animatedHeight, (height) => {
    if (height < 0.5) return "";
    const topGuide = getRoundedFaceGuide(top, right, bottom, left, -height);
    const baseGuide = getRoundedFaceGuide(top, right, bottom, left, 0);

    return frontMidSeamPath(topGuide, baseGuide);
  });

  return (
    <motion.g strokeWidth="0.5">
      <motion.path d={rightFacePath} fill="#08090A" stroke="#62666D" />
      <motion.path d={leftFacePath} fill="#08090A" stroke="#62666D" />
      <motion.path d={frontFacePath} fill="#08090A" stroke="#62666D" />
      <motion.path d={topFacePath} fill="#08090A" stroke="#62666D" />
      <motion.path d={innerPath} fill="none" stroke="#2E2E32" strokeLinecap="round" />
    </motion.g>
  );
};

interface TileEntry {
  col: number;
  row: number;
  geo: CellGeo;
}

const TILE_ENTRIES: TileEntry[] = [];
for (let row = 0; row < CELLS_Y; row += 1) {
  for (let col = 0; col < CELLS_X; col += 1) {
    TILE_ENTRIES.push({
      col,
      row,
      geo: cellGeo(),
    });
  }
}
TILE_ENTRIES.sort((a, b) => a.col + a.row - (b.col + b.row));

const pointInPillarSlab = (px: number, py: number, height: number): boolean => {
  const geo = TILE_ENTRIES[0]?.geo;
  if (!geo) return false;
  const { top, right, bottom, left } = geo;
  const points: Array<[number, number]> = [
    [top.x, top.y - height],
    [right.x, right.y - height],
    [right.x, right.y],
    [bottom.x, bottom.y],
    [left.x, left.y],
    [left.x, left.y - height],
  ];
  let inside = false;

  for (let index = 0, previous = points.length - 1; index < points.length; previous = index++) {
    const [xi, yi] = points[index];
    const [xj, yj] = points[previous];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
};

const findHoveredTile = (mx: number, my: number, raisedKey: string | null): TileEntry | null => {
  if (!Number.isFinite(mx) || !Number.isFinite(my)) return null;

  if (raisedKey) {
    const raised = TILE_ENTRIES.find((entry) => `${entry.col}-${entry.row}` === raisedKey);
    if (raised && pointInPillarSlab(mx, my, RAISED_HEIGHT)) {
      return raised;
    }
  }

  for (const entry of TILE_ENTRIES) {
    if (pointInPillarSlab(mx, my, FLAT_HEIGHT)) {
      return entry;
    }
  }

  return null;
};

interface EmployeeRecord {
  initials: string;
  role: string;
  status: string;
  metric: { label: string; value: string };
}

type RoleTitle =
  | "Chief of Staff"
  | "Operations Lead"
  | "Finance Lead"
  | "Sales Director"
  | "Product Manager"
  | "Engineering Manager"
  | "Design Lead"
  | "Customer Success Lead"
  | "Marketing Director"
  | "RevOps Manager"
  | "Program Manager"
  | "Research Lead"
  | "Procurement Lead"
  | "Support Lead";

const ROLE_TITLES: readonly RoleTitle[] = [
  "Chief of Staff",
  "Operations Lead",
  "Finance Lead",
  "Sales Director",
  "Product Manager",
  "Engineering Manager",
  "Design Lead",
  "Customer Success Lead",
  "Marketing Director",
  "RevOps Manager",
  "Program Manager",
  "Research Lead",
  "Procurement Lead",
  "Support Lead",
];

const STATUS_LABELS = [
  "Online · Synced 2m ago",
  "Planning · Reviewed 7m ago",
  "Executing · 3 items active",
  "Waiting · 2 dependencies open",
  "Focused · Drafting handoff",
  "In review · Updated 12m ago",
] as const;

const METRIC_PAIRS = [
  { label: "Context loaded", value: "94%" },
  { label: "Tasks closed", value: "12" },
  { label: "Forecast delta", value: "+3.4%" },
  { label: "Open reviews", value: "4" },
  { label: "Pipeline", value: "8" },
  { label: "SLA", value: "1.2h" },
  { label: "Spend reviewed", value: "$82k" },
  { label: "Docs synced", value: "11" },
] as const;

const createExampleEmployee = (index: number): EmployeeRecord => {
  const role = ROLE_TITLES[index % ROLE_TITLES.length];
  const status = STATUS_LABELS[index % STATUS_LABELS.length];
  const metric = METRIC_PAIRS[index % METRIC_PAIRS.length];
  const initials = role
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return { initials, role, status, metric };
};

const EMPLOYEES = Object.fromEntries(
  TILE_ENTRIES.map((entry, index) => {
    const key = `${entry.col}-${entry.row}`;
    if (key === CENTER_KEY) {
      return [
        key,
        {
          initials: "CS",
          role: "Chief of Staff",
          status: "Online · Synced 2m ago",
          metric: { label: "Context loaded", value: "94%" },
        },
      ];
    }

    return [key, createExampleEmployee(index)];
  }),
) as Record<string, EmployeeRecord>;

const TILE_BY_KEY = Object.fromEntries(
  TILE_ENTRIES.map((entry) => [`${entry.col}-${entry.row}`, entry]),
) as Record<string, TileEntry>;

const IDLE_PILLAR_KEYS = [CENTER_KEY] as const;

const CENTER_GEO = cellGeo();

type CardSide = "left" | "right";

interface HoveredPillar {
  key: string;
  side: CardSide;
}

const resolveCardSide = (col: number): CardSide => (col >= FLIP_COL_THRESHOLD ? "left" : "right");

const cardOffsetForSide = (side: CardSide): number =>
  side === "left" ? CARD_OFFSET_LEFT : CARD_OFFSET_RIGHT;

const INITIAL_SIDE: CardSide = resolveCardSide(CENTER_COL);

const getNextIdleEmployeeKey = (currentKey: string, randomValue: number = Math.random()): string => {
  const candidates = IDLE_PILLAR_KEYS.filter((key) => key !== currentKey);
  if (candidates.length === 0) return currentKey;

  const normalized = Math.min(Math.max(randomValue, 0), 0.999999);

  return candidates[Math.floor(normalized * candidates.length)];
};

export function TensionMesh() {
  const filterId = `tileShadow${useId()}`;
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);
  const reducedMotion = useReducedMotion() ?? false;

  const cardAnchorX = useMotionValue(CENTER_GEO.cx + cardOffsetForSide(INITIAL_SIDE));
  const cardAnchorY = useMotionValue(CENTER_GEO.cy + CARD_VERTICAL_ANCHOR_OFFSET);
  const springX = useSpring(cardAnchorX, CARD_SPRING);
  const springY = useSpring(cardAnchorY, CARD_SPRING);
  const effectiveCardX = reducedMotion ? cardAnchorX : springX;
  const effectiveCardY = reducedMotion ? cardAnchorY : springY;
  const cardLeftPct = useTransform(effectiveCardX, (x) => `${(x / VIEW_W) * 100}%`);
  const cardTopPct = useTransform(effectiveCardY, (y) => `${(y / VIEW_H) * 100}%`);

  const [hovered, setHovered] = useState<HoveredPillar | null>(null);
  const hoveredKeyRef = useRef<string | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const activatePillar = useCallback(
    (key: string) => {
      if (key === hoveredKeyRef.current) return;
      const tile = TILE_BY_KEY[key];
      if (!tile) return;

      hoveredKeyRef.current = key;
      const side = resolveCardSide(tile.col);
      setHovered({ key, side });
      mouseX.set(tile.geo.cx);
      mouseY.set(tile.geo.cy);
      cardAnchorX.set(tile.geo.cx + cardOffsetForSide(side));
      cardAnchorY.set(tile.geo.cy + CARD_VERTICAL_ANCHOR_OFFSET);
    },
    [cardAnchorX, cardAnchorY, mouseX, mouseY],
  );

  useEffect(() => {
    if (reducedMotion) return;

    const scheduleIdleCycle = (delay: number) => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = window.setTimeout(() => {
        const nextKey = getNextIdleEmployeeKey(hoveredKeyRef.current ?? CENTER_KEY);
        activatePillar(nextKey);
        scheduleIdleCycle(IDLE_ROTATION_MS);
      }, delay);
    };

    scheduleIdleCycle(IDLE_ROTATION_MS);

    return clearTimers;
  }, [activatePillar, clearTimers, reducedMotion]);

  const deactivate = () => {
    mouseX.set(Number.POSITIVE_INFINITY);
    mouseY.set(Number.POSITIVE_INFINITY);
    hoveredKeyRef.current = null;
    setHovered(null);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    clearTimers();
    const rect = event.currentTarget.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * VIEW_W;
    const my = ((event.clientY - rect.top) / rect.height) * VIEW_H;
    const tile = findHoveredTile(mx, my, hoveredKeyRef.current);

    if (!tile) {
      if (hoveredKeyRef.current !== null) deactivate();
      return;
    }

    activatePillar(`${tile.col}-${tile.row}`);
  };

  const employee = hovered ? (EMPLOYEES[hovered.key] ?? null) : null;

  return (
    <div
      className="landing-tension-mesh-stage"
      onMouseLeave={deactivate}
      onMouseMove={handleMouseMove}
    >
      <svg
        aria-hidden="true"
        className="landing-three-col-tension-mesh"
        fill="none"
        focusable="false"
        height="262"
        overflow="visible"
        viewBox="0 0 265 262"
        width="265"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter={`url(#${filterId})`}>
          {TILE_ENTRIES.map((entry) => (
            <MeshTile
              geo={entry.geo}
              key={`${entry.col}-${entry.row}`}
              mouseX={mouseX}
              mouseY={mouseY}
              reducedMotion={reducedMotion}
            />
          ))}
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            height="200%"
            id={filterId}
            width="200%"
            x="-50%"
            y="-50%"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0.0313726 0 0 0 0 0.0352941 0 0 0 0 0.0392157 0 0 0 1 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
      {hovered ? (
        <motion.div
          aria-hidden="true"
          className={`landing-tension-mesh-card is-side-${hovered.side}`}
          style={{ left: cardLeftPct, top: cardTopPct }}
        >
          {employee ? (
            <>
              <header className="landing-tension-mesh-card-header">
                <span className="landing-tension-mesh-card-avatar">{employee.initials}</span>
                <span className="landing-tension-mesh-card-role">{employee.role}</span>
              </header>
              <div className="landing-tension-mesh-card-body">
                <span className="landing-tension-mesh-card-status">{employee.status}</span>
                <div className="landing-tension-mesh-card-metric">
                  <span>{employee.metric.label}</span>
                  <span>{employee.metric.value}</span>
                </div>
              </div>
            </>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}
