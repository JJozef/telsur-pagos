'use client'

import { Button } from '@/components/ui/button'
import {
  CallIcon,
  CustomerSupportIcon,
  WhatsAppIcon
} from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const handleReloadPage = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center justify-between gap-5'>
        <Link className='select-none' href='/' onClick={handleReloadPage}>
          <Image
            className='w-20 h-12 aspect-square no-drag select-none'
            src='https://sucursalvirtual.telsur.cl/o/telsur-theme/images/sur/logo_azul.png'
            alt='Telsur Pagos'
            width={80}
            height={48}
            priority
          />
        </Link>

        <div className='flex items-end gap-1'>
          <Tooltip disableHoverableContent delayDuration={50}>
            <TooltipTrigger asChild>
              <Button
                className='text-green-600'
                variant='ghost'
                size='icon'
                asChild
              >
                <Link
                  href='https://api.whatsapp.com/send?phone=56967617901&text=Necesito%20ayuda%20con%20mi%20cuenta%20de%20Telsur'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <WhatsAppIcon className='size-5 min-w-5' />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Asistencia por WhatsApp</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip disableHoverableContent delayDuration={50}>
            <TooltipTrigger asChild>
              <Button
                className='text-blue-700'
                variant='ghost'
                size='icon'
                asChild
              >
                <Link
                  href='https://www.telsur.cl/hogar/formulario-cotizacion?detalle=Contacto-General&origen=Boton-flotante-desktop'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <CallIcon className='size-5 min-w-5' />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Contáctanos</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip disableHoverableContent delayDuration={50}>
            <TooltipTrigger asChild>
              <Button
                className='text-pink-700'
                variant='ghost'
                size='icon'
                asChild
              >
                <Link
                  href='https://www.telsur.cl/hogar/atencion-clientes'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <CustomerSupportIcon className='size-5 min-w-5' />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atención al cliente</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}

export { Header }
