import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo() {
  return (
    <div className="w-full ">
      <div className="
         dark:bg-zinc-800 
        rounded-xl 
        w-[335px] 
        lg:w-full
      ">
        <Terminal className=" bg-white p-0 dark:bg-transparent">

          <TypingAnimation delay={1} className="dark:text-gray-200 text-gray-700">
            &gt; Initializing project by Muhammad Rois...
          </TypingAnimation>

          <AnimatedSpan className="text-green-500">
            ✔ Checking developer identity: Muhammad Rois found.
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            ✔ Validating frontend stack:React.js,WNext.js,WTailwindCSS.
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            ✔ Loading UI presets: ShadCN UI,MagicUI,WFramer Motion.
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            ✔ Setting up project structure for modern web development.
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            ✔ Optimizing design workflow for UI/UX by RoisDev.
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            ✔ Preparing components and utilities.
          </AnimatedSpan>

          <AnimatedSpan className="text-blue-500 flex gap-1">
            <span>ℹ Updated 1 file:</span>
            <span>- roisdev.config.ts</span>
          </AnimatedSpan>

          <TypingAnimation className="text-muted-foreground">
            Success! Your project has been initialized, Rois.
          </TypingAnimation>

          <TypingAnimation className="text-muted-foreground">
            You may now continue building something amazing.
          </TypingAnimation>

        </Terminal>
      </div>
    </div>
  );
}
