"use client";

import { BuiltForSpeedChart } from "@/components/ui/built-for-speed-chart";

export function BuiltForSpeedFeature() {
  return (
    <article className="ui-showcase-card ui-showcase-card--speed">
      <div className="landing-three-col">
        <div className="landing-three-col-item">
          <div className="landing-three-col-illustration">
            <div className="landing-three-col-markup">
              <BuiltForSpeedChart />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
