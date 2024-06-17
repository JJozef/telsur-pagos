import Image from 'next/image'
import Link from 'next/link'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XTwitterIcon,
  YoutubeIcon
} from '../ui/icons'

const Footer = () => {
  return (
    <footer className='container max-w-screen-2xl w-full py-3 text-center sm:text-left border-t border-border'>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <span className='text-sm sm:text-center text-muted-foreground'>
          <Link
            className='flex items-center justify-center gap-1.5 sm:justify-start'
            href='https://www.gtd.cl'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              src='/images/gdt.jpg'
              className='size-8 rounded-lg'
              alt='FlowBite Logo'
              width={32}
              height={32}
              priority
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap'>
              GDT©
            </span>
          </Link>
          Todos los derechos reservados.
        </span>
        <div className='flex mt-4 justify-center sm:mt-0 gap-2'>
          <Link
            className='text-muted-foreground hover:text-primary'
            href='https://www.facebook.com/telsurchile'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookIcon />
            <span className='sr-only'>Facebook page</span>
          </Link>
          <Link
            className='text-muted-foreground hover:text-primary'
            href='https://www.instagram.com/gtdchile'
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon />
            <span className='sr-only'>Instagram page</span>
          </Link>
          <Link
            className='text-muted-foreground hover:text-primary'
            href='https://twitter.com/gtdchile'
            target='_blank'
            rel='noopener noreferrer'
          >
            <XTwitterIcon />
            <span className='sr-only'>X (Twitter) page</span>
          </Link>
          <Link
            className='text-muted-foreground hover:text-primary'
            href='https://www.linkedin.com/company/telsurchile'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedInIcon />
            <span className='sr-only'>LinkedIn page</span>
          </Link>
          <Link
            className='text-muted-foreground hover:text-primary'
            href='https://www.youtube.com/@gtdvideos'
            target='_blank'
            rel='noopener noreferrer'
          >
            <YoutubeIcon />
            <span className='sr-only'>Youtube page</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
