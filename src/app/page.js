'use client'

import { useStore } from '@/store/main'
import { SectionWelcome } from '@/components/sections/welcome'
import { DocumentToPay } from '@/components/sections/document-pay'
import { MethodPay } from '@/components/sections/method-pay'
import { SuccessPay } from '@/components/sections/success-pay'
import { ClientInfo } from '@/components/sections/client-info'
import { Stepper, StepContent } from '@/components/ui/stepper'

export default function Home() {
  const { currentStep, setCurrentStep } = useStore()

  return (
    <Stepper
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      className='container max-w-screen-2xl flex flex-col grow justify-between items-center relative h-full min-h-[calc(100%-11.2rem)] sm:min-h-[calc(100%-8.4rem)]'
    >
      {currentStep >= 2 && <ClientInfo />}
      <StepContent className='size-full grow animate-slide-out-bottom' step={1}>
        <SectionWelcome />
      </StepContent>
      <StepContent className='size-full grow animate-slide-out-bottom mb-4' step={2}>
        <DocumentToPay />
      </StepContent>
      <StepContent className='size-full grow animate-slide-out-bottom mb-4' step={3}>
        <MethodPay />
      </StepContent>
      <StepContent className='size-full grow animate-slide-out-bottom mb-4' step={4}>
        <SuccessPay />
      </StepContent>
    </Stepper>
  )
}
