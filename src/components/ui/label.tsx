// @/components/ui/label.tsx (수정된 버전)
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
                 className,
                 ...props
               }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className // 커스텀 className이 나중에 와서 우선순위를 가짐
      )}
      {...props}
    />
  )
}

export { Label }