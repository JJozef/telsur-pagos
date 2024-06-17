import { FormLandingRut } from '@/components/forms/landing-form'
import { Badge } from '@/components/ui/badge'
import { CreditCardPosIcon } from '@/components/ui/icons'
import SparklesText from '@/components/ui/sparkles-text'

const SectionWelcome = () => {
  return (
    <div className='container max-w-screen-2xl flex flex-col items-center'>
      <div className='flex flex-col items-center gap-4 py-5 sm:py-16'>
        <Badge
          className='gap-2 items-center rounded-full py-2 px-3 bg-primary/10 text-primary select-none font-medium hover:scale-105 transition-transform duration-300 ease-in-out'
          variant='outline'
        >
          <CreditCardPosIcon className='size-4 min-w-4' />
          Paga de forma segura
        </Badge>

        <div className='py-2 space-y-2'>
          <SparklesText
            className='text-center text-7xl text-balance  sm:text-8xl'
            text='Telsur Pagos'
            colors={{ first: '#2563eb', second: '#375d9d' }}
          />
          <p className='text-center text-secondary-foreground text-pretty text-sm sm:text-base'>
            Paga tus cuentas con más facilidad y seguridad en un solo lugar.
          </p>
        </div>
      </div>

      <FormLandingRut />
    </div>
  )
}

export { SectionWelcome }
