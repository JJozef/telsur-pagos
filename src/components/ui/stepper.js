/* eslint-disable multiline-ternary */
'use client'

import { cn } from '@/lib/utils'
import { createContext, useContext, useState, forwardRef } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const StepperContext = createContext()

const useStepper = () => {
  return useContext(StepperContext)
}

// Proveedor del contexto
const StepperProvider = ({
  children,
  externalCurrentStep,
  externalSetCurrentStep
}) => {
  const [internalCurrentStep, setInternalCurrentStep] = useState(1)

  const currentStep =
    externalCurrentStep !== undefined
      ? externalCurrentStep
      : internalCurrentStep
  const setCurrentStep =
    externalSetCurrentStep !== undefined
      ? externalSetCurrentStep
      : setInternalCurrentStep

  return (
    <StepperContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepperContext.Provider>
  )
}

const Stepper = forwardRef(
  ({ children, currentStep, setCurrentStep, ...props }, ref) => {
    return (
      <StepperProvider
        externalCurrentStep={currentStep}
        externalSetCurrentStep={setCurrentStep}
      >
        <div ref={ref} {...props}>
          {children}
        </div>
      </StepperProvider>
    )
  }
)
Stepper.displayName = 'Stepper'

const StepActions = forwardRef(({ children, ...props }, ref) => {
  return (
    <ol className='flex items-center w-auto' ref={ref} {...props}>
      {children}
    </ol>
  )
})
StepActions.displayName = 'StepActions'

const Step = forwardRef(
  (
    {
      children,
      step,
      isLast = false,
      classNamePill,
      classNameLine,
      tooltipText,
      ...props
    },
    ref
  ) => {
    const { currentStep } = useStepper()

    const isActive = step <= currentStep

    return (
      <>
        {isLast ? (
          <li className='flex items-center w-full' ref={ref} {...props}>
            <Tooltip disableHoverableContent delayDuration={50}>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    'flex items-center justify-center size-9 rounded-full shrink-0',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-zinc-500',
                    classNamePill
                  )}
                >
                  {children}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText || 'No text'}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ) : (
          <li
            className={cn(
              'flex w-full items-center after:content-[""] after:w-full after:min-w-3 after:h-1 after:border-b after:border-2 after:inline-block',
              isActive ? 'after:border-primary/10' : 'after:border-muted',
              classNameLine
            )}
            ref={ref}
            {...props}
          >
            <Tooltip disableHoverableContent delayDuration={50}>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    'flex items-center justify-center size-9 rounded-full shrink-0',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-zinc-500',
                    classNamePill
                  )}
                >
                  {children}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText || 'No text'}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        )}
      </>
    )
  }
)
Step.displayName = 'Step'

const StepMove = forwardRef(
  ({ children, toStep, className, disabled, ...props }, ref) => {
    const { currentStep, setCurrentStep } = useStepper()

    const handleMove = (step) => {
      if (step && step >= 1) {
        setCurrentStep(step)
      }
    }

    return (
      <button
        className={cn(className)}
        type='button'
        onClick={() => handleMove(toStep)}
        ref={ref}
        data-state={currentStep === toStep ? 'active' : 'inactive'}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)
StepMove.displayName = 'StepMove'

const StepContent = forwardRef(
  ({ children, step = 1, className, ...props }, ref) => {
    const { currentStep } = useStepper()

    return (
      <div
        className={cn(
          className,
          step !== currentStep && 'hidden pointer-events-none'
        )}
        data-state={step === currentStep ? 'active' : 'inactive'}
        aria-hidden={step !== currentStep}
        ref={ref}
        {...props}
      >
        {currentStep === step && children}
      </div>
    )
  }
)
StepContent.displayName = 'StepContent'

export { Stepper, StepActions, Step, StepMove, StepContent }
