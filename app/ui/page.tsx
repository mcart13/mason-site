import { AnimatedEnter } from "@/components/animated-enter";
import { BuiltForSpeedFeature } from "@/components/ui/built-for-speed-feature";
import { Fig02Feature } from "@/components/ui/fig-02-feature";

export default function UiPage() {
  return (
    <main className="px-6 pt-32 pb-24 md:px-12 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto">
        <AnimatedEnter className="ui-showcase-stage">
          <section className="ui-showcase-grid" aria-label="UI component showcase">
            <Fig02Feature />
            <BuiltForSpeedFeature />
          </section>
        </AnimatedEnter>
      </div>
    </main>
  );
}
