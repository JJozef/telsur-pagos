import { AlertCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DownloadFileIcon } from '@/components/ui/icons'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useStore } from '@/store/main'

const SuccessPay = () => {
  const { docToPay, rutClient, paymentStatus } = useStore()

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-2 sm:flex-row sm:justify-between sm:items-baseline'>
        <div className='text-center sm:text-left'>
          <h2 className='text-2xl font-bold text-primary/80 select-none'>
            Pago finalizado
          </h2>
          <p className='text-sm text-pretty text-muted-foreground mb-3'>
            Tu pago ha sido procesado con éxito.
          </p>
        </div>
        <Button className='gap-2' size='sm'>
          <DownloadFileIcon className='size-4 min-w-4' />
          Descargar comprobante
        </Button>
      </div>

      <Alert className='bg-yellow-100/20 border-yellow-100/30 text-yellow-600/80 mb-3'>
        <AlertCircleIcon className='size-5 min-w-5 stroke-yellow-600/80' />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>Estos datos son solo de pruebas</AlertDescription>
      </Alert>

      <pre className='text-sm text-muted-foreground bg-muted p-2 rounded-lg overflow-auto'>
        <code>
          {JSON.stringify(
            {
              userTest: {
                name: paymentStatus?.email?.split('@')[0] || 'Cliente',
                email: paymentStatus?.email || 'cliente001@gmail.com',
                rut: rutClient
              },
              paymentStatus,
              paymentData: docToPay?.documents
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
}

export { SuccessPay }
