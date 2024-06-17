import { Button } from '@/components/ui/button'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store/main'
import { UserCheck } from 'lucide-react'
import { Step, StepActions, StepMove } from '@/components/ui/stepper'
import {
  CreditCardIcon,
  CreditCardValidationIcon,
  DocumentValidationIcon
} from '@/components/ui/icons'

const ClientInfo = () => {
  const { currentStep, rutClient, docToPay } = useStore()

  return (
    <div className='w-full rounded-lg border border-border mb-3 bg-white sticky top-16 z-[49]'>
      <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between px-3 pt-3'>
        <div className='text-center sm:text-left'>
          <p className='text-sm text-muted-foreground select-none'>
            R.U.T cliente
          </p>
          <h2 className='text-2xl font-bold'>{rutClient}</h2>
        </div>
        <StepActions>
          <Step
            classNamePill='size-10'
            classNameLine='after:min-w-8'
            step={1}
            tooltipText='Verificación de cliente'
          >
            <UserCheck className='size-5 min-w-5' />
          </Step>
          <Step
            classNamePill='size-10'
            classNameLine='after:min-w-8'
            step={2}
            tooltipText='Selección de documentos'
          >
            <DocumentValidationIcon className='size-5 min-w-5' />
          </Step>
          <Step
            classNamePill='size-10'
            classNameLine='after:min-w-8'
            step={3}
            tooltipText='Pagar'
          >
            <CreditCardIcon className='size-5 min-w-5' />
          </Step>

          <Step
            classNamePill='size-10'
            step={4}
            tooltipText='Pago finalizado'
            isLast
          >
            <CreditCardValidationIcon className='size-5 min-w-5' />
          </Step>
        </StepActions>
      </div>
      <Separator className='my-3' />
      <div className='flex flex-col items-center justify-center gap-4 px-3 pb-3 sm:flex-row sm:justify-between'>
        <div className='text-center sm:text-left'>
          <p className='text-sm text-muted-foreground select-none'>
            {(currentStep === 2 || currentStep === 3) && 'Total a pagar'}
            {currentStep === 4 && 'Pago realizado'}
          </p>
          <h2 className='text-2xl font-bold'>
            $
            <NumberTicker
              value={docToPay.total}
              damping={20}
              stiffness={100}
            />
          </h2>
        </div>
        {currentStep === 2 && (
          <Button asChild disabled={docToPay.documents.length === 0}>
            <StepMove toStep={3}>Siguiente</StepMove>
          </Button>
        )}

        {currentStep === 3 && (
          <Button asChild disabled={docToPay.documents.length === 0}>
            <StepMove toStep={2}>Atrás</StepMove>
          </Button>
        )}
      </div>
    </div>
  )
}

export { ClientInfo }
