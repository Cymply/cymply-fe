import * as React from "react"

// cn 유틸리티 함수
function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(" ")
}

const badgeVariants = {
  default: "bg-gray-900 text-gray-50 hover:bg-gray-900/80",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
  destructive: "bg-red-500 text-red-50 hover:bg-red-500/80",
  outline: "border border-gray-200 text-gray-900 hover:bg-gray-100"
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }