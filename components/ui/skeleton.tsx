import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-accent/70",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_ease-in-out_infinite]",
        "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]",
        "motion-reduce:before:animate-none",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
