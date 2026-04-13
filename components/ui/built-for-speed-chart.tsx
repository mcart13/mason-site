"use client";

import React, { useId } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface BarAnchor {
  x: number;
  y: number;
}

interface SpeedBarProps {
  anchor: BarAnchor;
  defaultHeight: number;
  filterId: string;
  mouseX: MotionValue<number>;
  reducedMotion: boolean;
}

const BAR_ANCHORS: readonly BarAnchor[] = [
  { x: 254.46, y: 188.84 },
  { x: 246.01, y: 193.07 },
  { x: 237.56, y: 197.29 },
  { x: 229.11, y: 201.52 },
  { x: 220.66, y: 205.74 },
  { x: 212.21, y: 209.97 },
  { x: 203.76, y: 214.19 },
  { x: 195.31, y: 218.42 },
  { x: 186.86, y: 222.65 },
  { x: 178.41, y: 226.87 },
  { x: 169.96, y: 231.09 },
  { x: 161.51, y: 235.32 },
  { x: 153.05, y: 239.55 },
  { x: 144.6, y: 243.77 },
  { x: 136.15, y: 248 },
] as const;

const DEFAULT_HEIGHTS = [
  20.529, 34.049, 54.331, 81.373, 128.697, 81.373, 54.331, 34.049, 20.529, 13.768, 10.387, 8.698,
  7.852, 7.853, 7.853,
] as const;

const BAR_SPRING = {
  damping: 18,
  mass: 1,
};

export const getSpeedBarCenter = (anchorX: number): number => {
  return anchorX - 59;
};

export const getSpeedBarHeight = (
  mouseX: number,
  barCenter: number,
  defaultHeight: number,
): number => {
  if (!Number.isFinite(mouseX)) {
    return defaultHeight;
  }

  const distance = Math.abs(mouseX - barCenter);

  if (distance === 0) {
    return 128;
  }

  if (distance <= 25) {
    return 128 - (distance / 25) * 88;
  }

  if (distance <= 60) {
    return 40 - ((distance - 25) / 35) * 28;
  }

  return 12;
};

export const getSpeedBarBrightness = (mouseX: number, barCenter: number): number => {
  if (!Number.isFinite(mouseX)) {
    return 1;
  }

  const distance = Math.abs(mouseX - barCenter);

  if (distance <= 20) {
    return 1;
  }

  if (distance <= 70) {
    return 1 - ((distance - 20) / 50) * 0.6;
  }

  return 0.4;
};

const SpeedBar = ({
  anchor,
  defaultHeight,
  filterId,
  mouseX,
  reducedMotion,
}: SpeedBarProps): React.JSX.Element => {
  const barCenter = getSpeedBarCenter(anchor.x);

  const targetHeight = useTransform(mouseX, (value) => {
    return getSpeedBarHeight(value, barCenter, defaultHeight);
  });

  const springHeight = useSpring(targetHeight, BAR_SPRING);
  const animatedHeight = reducedMotion ? targetHeight : springHeight;

  const targetBrightness = useTransform(mouseX, (value) => {
    return getSpeedBarBrightness(value, barCenter);
  });

  const springBrightness = useSpring(targetBrightness, BAR_SPRING);
  const animatedBrightness = reducedMotion ? targetBrightness : springBrightness;
  const brightnessFilter = useTransform(animatedBrightness, (value) => `brightness(${value})`);

  const pathX = anchor.x - 117.416;

  const mainPath = useTransform(animatedHeight, (height) => {
    const startY = anchor.y - 60.643 - height;
    return `M${pathX} ${startY}a1.44 1.44 0 0 1 1.288 0l115.686 57.843a3.13 3.13 0 0 1 1.73 2.8v${height}a1.44 1.44 0 0 1-.796 1.288l-1.69.845a1.44 1.44 0 0 1-1.288 0l-115.686-57.843a3.13 3.13 0 0 1-1.73-2.8v${-height}c0-.545.308-1.044.796-1.288z`;
  });

  const innerPath = useTransform(animatedHeight, (height) => {
    const startY = anchor.y - 60.643 - height;
    const innerHeight = Math.max(0, height - 2.336);
    return `M${pathX + 0.645} ${startY + 2.778}l113.061 56.531a3.38 3.38 0 0 1 1.868 3.023v${innerHeight}`;
  });

  return (
    <g filter={`url(#${filterId})`}>
      <motion.g strokeWidth="0.5" style={{ filter: brightnessFilter }}>
        <motion.path d={mainPath} fill="#08090A" stroke="#62666D" />
        <motion.path d={innerPath} stroke="#2E2E32" strokeLinecap="round" />
      </motion.g>
    </g>
  );
};

export function BuiltForSpeedChart(): React.JSX.Element {
  const filterId = `barShadow${useId()}`;
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const reducedMotion = useReducedMotion() ?? false;

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>): void => {
    if (reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width) * 272;
    mouseX.set(normalizedX);
  };

  const handleMouseLeave = (): void => {
    mouseX.set(Number.POSITIVE_INFINITY);
  };

  return (
    <svg
      aria-hidden="true"
      className="landing-three-col-speed-chart"
      fill="none"
      focusable="false"
      height="267"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      overflow="visible"
      viewBox="0 0 272 267"
      width="272"
      xmlns="http://www.w3.org/2000/svg"
    >
      {BAR_ANCHORS.map((anchor, index) => (
        <SpeedBar
          anchor={anchor}
          defaultHeight={DEFAULT_HEIGHTS[index]}
          filterId={filterId}
          key={`${anchor.x}-${anchor.y}`}
          mouseX={mouseX}
          reducedMotion={reducedMotion}
        />
      ))}
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
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.0313726 0 0 0 0 0.0352941 0 0 0 0 0.0392157 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
