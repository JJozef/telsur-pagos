import { FormReadyToPay } from '@/components/forms/form-ready-pay'
import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const MethodPay = () => {
  return (
    <>
      <div className='text-center sm:text-left'>
        <h2 className='text-2xl font-bold text-primary/80 select-none'>
          Método de pago
        </h2>
        <p className='text-sm text-pretty text-muted-foreground mb-3'>
          Selecciona el método de pago e ingresé su correo electrónico para
          continuar.
        </p>
      </div>

      <Alert className='bg-yellow-100/20 border-yellow-100/30 text-yellow-600/80'>
        <AlertCircleIcon className='size-5 min-w-5 stroke-yellow-600/80' />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Estimado cliente, tenga en cuenta que el uso de cuotas con o sin
          interés están sujetas a las condiciones de su banco emisor.
        </AlertDescription>
      </Alert>

      <FormReadyToPay />
    </>
  )
}

export { MethodPay }
