'use client'

import { TooltipProvider } from '@/components/ui/tooltip'

const Providers = ({ children }) => {
  return <TooltipProvider>{children}</TooltipProvider>
}

export { Providers }
